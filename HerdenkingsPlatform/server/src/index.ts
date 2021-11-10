import { ApolloServer, gql, makeExecutableSchema, mergeSchemas } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv-safe/config";
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { verify } from 'jsonwebtoken';
import path from 'path';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { __prod__ } from './constants';
import { AccessRequest } from "./entities/AccessRequest";
import { Comment, CommentHerinnering, CommentMedia, CommentMessage } from "./entities/Comment";
import { Condolatie } from "./entities/Condolatie";
import { HerdenkingsPagina } from './entities/HerdenkingsPagina';
import { Herinnering } from "./entities/Herinnering";
import { Media, MediaCondolatie, MediaHerinnering, MediaMessage, MediaPersonalMessage } from "./entities/Media";
import { Message } from './entities/Message';
import { PartnerData } from './entities/PartnerData';
import { PersonalMessage } from './entities/PersonalMessage';
import { PersonalMessageAccess } from './entities/PersonalMessageAccess';
import {  User } from "./entities/User";
import { AccessRequestResolver } from "./resolvers/accessrequest";
import { CommentHerinneringResolver, CommentMediaResolver, CommentResolver } from './resolvers/comment';
import { CondolatieResolver } from "./resolvers/condolatie";
import { HerdenkingsPaginaResolver } from './resolvers/herdenkingspagina';
import { HerinneringResolver } from "./resolvers/herinnering";
import { MaintenanceResolver } from './resolvers/Maintenance';
import { MediaCondolatieResolver, MediaHerinneringResolver, MediaMessageResolver, MediaPersonalMessageResolver, MediaResolver } from "./resolvers/media";
import { MessageResolver } from './resolvers/message';
import { PersonalMessageResolver } from './resolvers/personalmessage';
import { PersonalMessageAccessResolver } from './resolvers/personalmessageaccess';
import { PartnerResolver, UserResolver } from "./resolvers/user";
import { createCondolatieLoader } from './utils/fieldresolverloaders/createCondolatieLoader';
import { createHerdenkingsPaginaLoader } from './utils/fieldresolverloaders/createHerdenkingsPaginaLoader';
import { createHerinneringLoader } from './utils/fieldresolverloaders/createHerinneringLoader';
import { createMediaLoader } from './utils/fieldresolverloaders/createMediaLoader';
import { createMessageLoader } from './utils/fieldresolverloaders/createMessageLoader';
import { createPersonalMessageLoader } from './utils/fieldresolverloaders/createPersonalMessageLoader';
import { createUserLoader } from './utils/fieldresolverloaders/createUserLoader';
import { createAccessToken, createRefreshToken } from './utils/JWTAuth';
import { processMolliePayment } from './utils/paymentutils/processMolliePayment';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { AWSS3Uploader } from './utils/uploaders/s3';
var cron = require('node-cron');

require('dotenv-safe').config({allowEmptyValues:true});


const fetch = require('node-fetch')
const bodyParser = require("body-parser")




const s3Uploader = new AWSS3Uploader({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    destinationBucketName: process.env.AWS_BUCKET_NAME 
});


const typeDefs = gql`

    scalar Upload

    type UploadedFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
    }

    type Query {
    hello: String!
    }

    type Mutation {
    singleUpload(file: Upload!, folder:String!): UploadedFileResponse!
    multipleUpload (files: [Upload!]!, folder:String!): [UploadedFileResponse!]!
    }
    `

  





const main = async () => {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED='0' //DIT MOEST IK DOEN OM TOESTEMMING TE KRIJGEN OM EMAILS TE VERSTUREN

       
    // Build schemas
    const schemaUpload = makeExecutableSchema({
        typeDefs,
        resolvers: {
            Query: {
                hello: () => "Hey!"
            },
            Mutation: {
                singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
                multipleUpload: s3Uploader.multipleUploadsResolver.bind(s3Uploader)
            }
        },
    });

    const schemaNormal = await buildSchema({
        resolvers: [
             HerinneringResolver
            ,MediaResolver,MediaCondolatieResolver, MediaHerinneringResolver,MediaPersonalMessageResolver,
            CommentResolver,CommentHerinneringResolver,MediaMessageResolver,PartnerResolver, CommentMediaResolver,HerdenkingsPaginaResolver,MessageResolver,
            CondolatieResolver, UserResolver,AccessRequestResolver,PersonalMessageResolver,PersonalMessageAccessResolver,MaintenanceResolver,
            ],
        validate: false
    });


    const mergedSchema = mergeSchemas({
        schemas: [
            schemaNormal,
            schemaUpload,
        ]
    });

    // Build postgres

    const conn = await createConnection({
        type: 'postgres',       
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: __prod__ ?  false: false, // (not in production)
        // migrations: [path.join(__dirname, "./migrations/*")],
        entities: [Condolatie,Comment, User,PartnerData, CommentMedia, Media, HerdenkingsPagina,Message,MediaMessage,
            AccessRequest,PersonalMessage,PersonalMessageAccess, CommentMessage,
            MediaCondolatie,MediaHerinnering,MediaPersonalMessage, Herinnering, CommentHerinnering],
    });

    // if(__prod__){
    //     conn.runMigrations();
    // }

    // if(true){
    //     conn.runMigrations();
    // }




    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    // // tell express server that we have a proxy (nginx) so that all cookies 
    // properly work (for cookies, session,...)
    app.set("trust proxy", 1);

    

    app.use(
        // for all routes
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,

        })
    );


    app.use(
        session({
          name: "CookieConsent",
          store: new RedisStore({
            client: redis,
            disableTouch: true,
          }),
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
            httpOnly: true,
            sameSite: "lax", // csrf
            secure: __prod__, // cookie only works in https
            domain: __prod__ ? ".aeterna.be" : undefined,
          },
          saveUninitialized: false,
          secret: process.env.SESSION_SECRET,
          resave: false,
        })
      );


    app.use('/refresh_token',cookieParser());
    app.get('/', (_, res) => {
        res.send("hello");
    })
    app.post('/refresh_token', async (req, res) => {
        // console.log("headers",req.headers);
        // console.log("cookies",req.cookies);
        const token = req.cookies.jwt;
        // console.log("headers",req.headers);
        // console.log("cookies",req.cookies);
        console.log("app post  refresh/token in index");


        // console.log("token",token);


        if(!token){
            return res.send({ok: false, accessToken: ''})
        }

        let payload: any = null;
        try{
            payload = verify(token,process.env.REFRESH_TOKEN_SECRET!)
        }
        catch(err){
            console.log("error try catch post in backend : ", err)
            return res.send({ok: false, accessToken: ''})
        }

        // token is valid and we can send back an access
        const user = await User.findOne({id: payload.userId})

        
        // console.log("user found: " , user?.username);

        if(!user){
            return res.send({ok: false, accessToken: ''})
        }

        if(user.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ''})
        }
        
        // create als a new refreshtoken
        sendRefreshToken(res, createRefreshToken(user));   
        const accessToken = await createAccessToken(user)   ;
        // console.log("net voor verzenden naar front-end" ,accessToken );
        // console.log("net voor verzenden naar front-end stringify " ,JSON.stringify(accessToken) );

        return res.send({ok: true, accessToken: accessToken})
    });


    


    app.use("/mollie_hook", bodyParser.urlencoded({ extended: true   }))
    app.post("/mollie_hook", async (req, res) => {
        
        let payment_id;
        var body = req.body;
        console.log("body",body);

 
        if(body.id){
            payment_id = body.id;

            let status = await processMolliePayment(payment_id);
            console.log("status voor respond 200",status);
            if(status ==="paid"){
                res.status(200).end();
            }
            else if(status ==="expired"){
                res.status(200).end();
            }
            else if(status ==="active"){
                res.status(200).end();
            }
            else if(status ==="canceled"){
                res.status(200).end();
            }else if(status ==="failed"){
                res.status(200).end();
            }else{
                console.log(status);
            }
        }
   
       
    });

    



    app.use(
        session({           
            store: new RedisStore({
                client: redis,
                // disableTTL: true,
                disableTouch: true
            }),           
            saveUninitialized: false,
            secret: "dslkfmjdslfkjùldskfsqdf",  // want to be hidden -< environment variable
            resave: false,
        })
    );


    
    const apolloServer = new ApolloServer({
        schema: await mergedSchema,
        
        context: ({ req, res }) => ({
            req,
            res, 
            redis,           
            userLoader: createUserLoader(),            
            mediaLoader:  createMediaLoader(),
            herinneringLoader:createHerinneringLoader(),
            condolatieLoader: createCondolatieLoader(),
            herdenkingsPaginaLoader: createHerdenkingsPaginaLoader(),
            personalMessageLoader: createPersonalMessageLoader(),
            messageLoader: createMessageLoader(),
            // accessRequestLoader: createAccessRequestLoader(),

        }), 


        uploads: {
            maxFileSize: 200000000, // 10 MB,
            maxFieldSize: 200000000 ,
            maxFiles:40
            

            
        },
        
         // this object is accesible by the resolvers         
        // cors: true,
    });

    

    apolloServer.applyMiddleware({
        app,
        cors: false,
        bodyParserConfig: {
            limit: "10mb",

            }

    });

   
    

    app.listen(parseInt(process.env.PORT), () => {
        console.log("server started on localhost:4000");
    });

     
    // cron.schedule('0,20 * * * * 0-7', () => {
    //     console.log('running every day of the week');
    
    //     // const pages = HerdenkingsPagina.createQueryBuilder().getRawMany();
    //     // console.log(pages);
      
    //     //LOOP OVER ALL THE HP PAGES
    //     //check every hp valid until compare with current date
    //         //if date is smaller than 1 week AND NOTIFICATION ON 1
    //             //increase notification
    //             //send 1 week email reminder
    
    //         //if date is smaller than 1 month AND NOTIFICATION is 0
    //             //increase notification 
    //             //send 1 month reminder
    
    //         //if date is smaller than valid_until AND NOTIFICATION is 2
    //             //convert page to delete or Archive
            
    
    // });



}


main().catch(err => {
    console.error(err);
});