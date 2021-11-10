// import { Media } from "../entities/Media";

import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { MaintenanceMiddleWare } from "../middleware/MaintenanceMiddleWare";
import { Condolatie } from "../entities/Condolatie";
import { Herinnering } from "../entities/Herinnering";

import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { Message } from "../entities/Message";
import { AccessRequest } from "../entities/AccessRequest";
import { Comment } from "../entities/Comment";
import { Media, MediaCondolatie, MediaHerinnering, MediaPersonalMessage } from "../entities/Media";
import { PersonalMessage } from "../entities/PersonalMessage";
import { PersonalMessageAccess } from "../entities/PersonalMessageAccess";

import AWS from "aws-sdk";
import { HerdenkingsPaginaResolver } from "./herdenkingspagina";



@Resolver()
export class MaintenanceResolver {





    //TODO: For all existing pages het 

    /**
     * Function to add all the object size of the existing media and to update the current page
     * 
     */
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async addObjectSizeToMediaAllPages(

    ): Promise<Boolean> {   //TYPE TYPESCRIPT

        const paginas = await HerdenkingsPagina.query(`
        SELECT *
        FROM "herdenkings_pagina"                              
        
        
        `)


        AWS.config = new AWS.Config();
        AWS.config.update({
            region: "eu-west-2", //config.region ||
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

        });
        var s3 = new AWS.S3();
        //  

        // console.log("s3", s3);


        const pagepromises = await paginas.map(async (pagina: HerdenkingsPagina) => {


            var params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: pagina.id
            };

            let sizeFolder = 0;


            const addSizeObject = async (sizeObject: number) => {
                sizeFolder = sizeFolder + sizeObject;
            }

            const data = await s3.listObjects(params).promise();

            //@ts-ignore
            for (let index = 1; index < data['Contents'].length; index++) {

                //@ts-ignore
                let object = data['Contents'][index];
                // console.log("object.Key :",object.Key);

                let aws_url = "https://" + process.env.AWS_BUCKET_NAME + "." + s3.endpoint.hostname + "/" + object.Key

                // console.log("aws_url:",aws_url);

                // console.log("object.Size:",object.Size);


                const media = await Media.findOne({ where: { urlFile: aws_url } });

                // console.log("media :",media)

                if (!media) {
                    //Zoek url van foto

                    if (pagina.mediaUrl == null) {
                        console.log("heeft geen hoofdfoto???")
                    } else {
                        if (pagina.mediaUrl === aws_url) {
                            console.log("media hoofdfoto")
                        } else {

                            console.log("Pagina zonder media")
                            // throw new Error("not found wat nu nou")
                        }

                    }





                } else {

                    if (object.Size) {
                        media.objectSize = object.Size;

                    } else {
                        media.objectSize = 0;
                    }

                    await media.save();

                }


                // console.log("object.key : ",object.key)
                //@ts-ignore
                await addSizeObject(object.Size);

            }

            console.log("sizeFolder : ", sizeFolder);

            await HerdenkingsPagina.update({ id: pagina.id }, { number_of_bytes: sizeFolder })

            //     await getConnection().createQueryBuilder()
            // .update(HerdenkingsPagina)
            // .where({ id: paginaId })
            // .set({ number_of_condolances: () => "number_of_condolances - 1" })
            // .execute()

            //     await (pagina as HerdenkingsPagina).save();





        })

        await Promise.all(pagepromises);







        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        // console.log("s3: ", s3);




        return true;

    }

    //TODO: @Arg met id's
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async addObjectSizeToMedia(
        @Arg('pageId') pageId: string,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT


        AWS.config = new AWS.Config();
        AWS.config.update({
            region: "eu-west-2", //config.region ||
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

        });
        var s3 = new AWS.S3();
        //  

        console.log("s3", s3);

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: pageId
        };

        let sizeFolder = 0;


        const addSizeObject = async (sizeObject: number) => {
            sizeFolder = sizeFolder + sizeObject;
        }

        const data = await s3.listObjects(params).promise();

        //@ts-ignore
        for (let index = 1; index < data['Contents'].length; index++) {

            //@ts-ignore
            let object = data['Contents'][index];
            // console.log("object.Key :",object.Key);

            let aws_url = "https://" + process.env.AWS_BUCKET_NAME + "." + s3.endpoint.hostname + "/" + object.Key

            console.log("aws_url:", aws_url);

            console.log("object.Size:", object.Size);


            const media = await Media.findOne({ where: { urlFile: aws_url } });

            // console.log("media :",media)

            if (!media) {
                // throw new Error("not found wat nu nou")
            } else {

                if (object.Size) {
                    media.objectSize = object.Size;

                } else {
                    media.objectSize = 0;
                }

                media.save();

            }


            // console.log("object.key : ",object.key)
            //@ts-ignore
            await addSizeObject(object.Size);

        }



        console.log("sizeFolder : ", sizeFolder);

        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        // console.log("s3: ", s3);




        return true;

    }





    //TODO: @Arg met id's
    @Mutation(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async deleteObsoleteUser(
        @Arg('userId') userId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT


        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        console.log("userId: ", userId);



        //Eerst verwijder alle bestaande objecten 
        //TODO: verwijder pagina? -->voorlopig niet

        await AccessRequest.delete({ requestorId: userId })

        await PersonalMessageAccess.delete({ userThatHasAccessId: userId })

        await Comment.delete({ creatorId: userId });

        await Media.delete({ creatorId: userId })

        await Herinnering.delete({ creatorId: userId });

        await Condolatie.delete({ creatorId: userId });

        // await PersonalMessage.delete({ : userId });


        //

        await User.delete({ id: userId });


        return true;

    }

    //TODO: @Arg met id's
    @Mutation(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async deleteObsoletePage(
        @Arg('paginaId') paginaId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT


        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        console.log("paginaId: ", paginaId);



        //Eerst verwijder alle bestaande objecten 
        //TODO: verwijder pagina? -->voorlopig niet

        await AccessRequest.delete({ paginaId: paginaId });

        await PersonalMessageAccess.delete({ pageId: paginaId });

        const herrs = await Herinnering.find({ paginaId: paginaId });

        herrs.map(async (herrinering) => {
            console.log("delete herrinering");
            await MediaHerinnering.delete({ herinneringId: herrinering.id })

        }
        )

        const condos = await Condolatie.find({ paginaId: paginaId });

        condos.map(async (condo) => {
            console.log("delete condo");
            await MediaCondolatie.delete({ condolatieId: condo.id })

        }
        )

        const personalm = await PersonalMessage.find({ paginaId: paginaId });

        personalm.map(async (pm) => {
            console.log("delete pm");
            await MediaPersonalMessage.delete({ persoonlijkeboodschapId: pm.id })

        }
        )

        await Herinnering.delete({ paginaId: paginaId });

        await PersonalMessage.delete({ paginaId: paginaId });

        await Condolatie.delete({ paginaId: paginaId });


        await HerdenkingsPagina.delete({ id: paginaId })

        return true;

    }

    //TODO: @Arg met id's
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async checkAllObjectsByUser(
        @Arg('userId') userId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT

        const user = await User.findOne(userId);

        const condos = await Condolatie.find({ where: { creatorId: userId } });

        const messages = await Message.find({ where: { creatorId: userId } });

        const comments = await Comment.find({ where: { creatorId: userId } })

        const media = await Media.find({ where: { creatorId: userId } })

        const arequests = await AccessRequest.find({ where: { requestorId: userId } })



        const persoonlijkberichtenAccess = await PersonalMessageAccess.find({ where: { userThatHasAccessId: userId } })

        const herr = await Herinnering.find({ where: { creatorId: userId } })

        const paginas = await HerdenkingsPagina.find({ where: { ownerId: userId } })

        console.log("paginas", paginas)



        console.log("user: ", user);

        console.log("condos: ", condos);

        console.log("messages: ", messages);

        console.log("arequests: ", arequests);

        console.log("persoonlijkberichtenAccess: ", persoonlijkberichtenAccess);

        console.log("media: ", media);

        console.log("comments: ", comments);

        console.log("herr: ", herr);

        console.log("paginas: ", paginas);





        console.log("user: ", user);

        console.log("condos: ", condos.length);

        console.log("persoonlijkberichtenAccess: ", persoonlijkberichtenAccess.length);


        console.log("messages: ", messages.length);

        console.log("comments: ", comments.length);

        console.log("media: ", media.length);

        console.log("arequests: ", arequests.length);

        console.log("herr: ", herr.length);

        console.log("paginas: ", paginas.length);


        return true;

    }





    @Query(() => [String])  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async findAllUsersWithoutObjects(
        // @Arg('userId') userId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<string[]> {   //TYPE TYPESCRIPT

        const users = await User.query(`
                                        SELECT *
                                        FROM "user"
                                        
                                        
                                        
                                        `)

        // const condos = await Condolatie.find({where:{creatorId : userId}});

        // const messages = await Message.find({where:{creatorId : userId}})

        // const arequests = await AccessRequest.find({where:{requestorId : userId}})

        // const herr = await Herinnering.find({where:{creatorId : userId}})

        // const paginas = await HerdenkingsPagina.find({where:{ownerId : userId}})

        // console.log("users", users);




        const AddToList = async (user: User) => {


            const condos = await Condolatie.count({ where: { creatorId: user.id } });

            // const messages = await Message.count({ where: { creatorId: user.id } })

            const arequests = await AccessRequest.count({ where: { requestorId: user.id } })

            const comments = await Comment.count({ where: { creatorId: user.id } })

            const media = await Media.count({ where: { creatorId: user.id } })


            const herr = await Herinnering.count({ where: { creatorId: user.id } })

            const paginas = await HerdenkingsPagina.count({ where: { ownerId: user.id } })

            if (condos === 0 && comments === 0 && media === 0 && arequests === 0 && herr === 0 && paginas === 0) { //messages === 0 &&
                // console.log(user.id)

                return true;


            } else {
                return false;
            }

        }


        let lijstje: string[] = [];

        const promiseArray = users.map(async (user: User) => {


            const voegtoe = await AddToList(user);
            if (voegtoe) {
                lijstje.push(user.email.toString() + " : " + user.id.toString())
                // lijstje.push(u)
            }


        })

        const sdfsdf = await Promise.all(promiseArray);

        console.log("sdfsdf :", sdfsdf);

        console.log("lijstje :", lijstje);
        console.log("aantal te verwijderen :", lijstje.length);
        return lijstje;

    }



    //TODO: @Arg met id's
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async checkAllObjectsForPage(
        @Arg('paginaId') paginaId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT

        const condos = await Condolatie.find({ where: { paginaId: paginaId } });

        const messages = await Message.find({ where: { paginaId: paginaId } })

        const arequests = await AccessRequest.find({ where: { paginaId: paginaId } })

        const persoonlijkberichten = await PersonalMessage.find({ where: { paginaId: paginaId } })

        const persoonlijkberichtenAccess = await PersonalMessageAccess.find({ where: { pageId: paginaId } })


        const herr = await Herinnering.find({ where: { paginaId: paginaId } })





        console.log("condos: ", condos);

        console.log("messages: ", messages);

        console.log("arequests: ", arequests);

        console.log("persoonlijkberichten: ", persoonlijkberichten);

        console.log("persoonlijkberichtenAccess: ", persoonlijkberichtenAccess);


        console.log("herr: ", herr);









        console.log("condos: ", condos.length);

        console.log("messages: ", messages.length);

        console.log("persoonlijkberichten: ", persoonlijkberichten.length);

        console.log("persoonlijkberichtenAccess: ", persoonlijkberichtenAccess.length);

        console.log("arequests: ", arequests.length);

        console.log("herr: ", herr.length);



        return true;

    }


    //TODO: @Arg met id's
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async findEmailsOfAllOwnersOfPages(
    ): Promise<Boolean> {

        const ownerIds = await HerdenkingsPagina.query(`
                                        SELECT "ownerId"
                                        FROM "herdenkings_pagina"                              
                                        
                                        
                                        `)
        
        for (let index = 0; index < ownerIds.length; index++) {

            const user = await User.findOne({ where: { id : ownerIds[index].ownerId } }); 

           console.log("index " , index );

           console.log(user!.email.toString())

        }

      


        return true;

    }






    @Query(() => [String])  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async findAllPagesWithoutObjects(
        // @Arg('userId') userId: string,
        // @Arg('limit', () => Int) limit: number,
        // @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        // @Ctx() { payload }: MyContext,
    ): Promise<string[]> {   //TYPE TYPESCRIPT

        const paginas = await HerdenkingsPagina.query(`
                                        SELECT *
                                        FROM "herdenkings_pagina"                              
                                        
                                        
                                        `)


        // console.log("paginas", paginas)


        const AddToList = async (pagina: HerdenkingsPagina) => {


            const condos = await Condolatie.count({ where: { paginaId: pagina.id } });

            // const messages = await Message.count({ where: { paginaId: pagina.id } })

            const arequests = await AccessRequest.count({ where: { paginaId: pagina.id } })

            const persoonlijkberichten = await PersonalMessage.count({ where: { paginaId: pagina.id } })

            const persoonlijkberichtenAccess = await PersonalMessageAccess.count({ where: { pageId: pagina.id } })


            const herr = await Herinnering.count({ where: { paginaId: pagina.id } })


            if (condos === 0 && persoonlijkberichten === 0 && persoonlijkberichtenAccess === 0 && arequests === 0 && herr === 0) { // && messages === 0
                // console.log(user.id)

                return true;


            } else {
                return false;
            }

        }


        let lijstje: string[] = [];

        const promiseArray = paginas.map(async (pagina: HerdenkingsPagina) => {


            const voegtoe = await AddToList(pagina);
            if (voegtoe) {
                // lijstje.push(pagina.name_of_page)
                lijstje.push(pagina.id)
            }


        })

        const sdfsdf = await Promise.all(promiseArray);

        console.log("sdfsdf :", sdfsdf);

        console.log("lijstje :", lijstje);
        console.log("aantal te verwijderen :", lijstje.length);
        return lijstje;

    }



    //TODO: @Arg met id's
    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async checkMegabytePerPage(
        @Arg('pageId') pageId: string,
    ): Promise<Boolean> {   //TYPE TYPESCRIPT


        AWS.config = new AWS.Config();
        AWS.config.update({
            region: "eu-west-2", //config.region ||
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

        });
        var s3 = new AWS.S3();
        //  

        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: pageId


        };

        let sizeFolder = 0;


        const addSizeObject = async (sizeObject: number) => {
            sizeFolder = sizeFolder + sizeObject;
        }

        const data = await s3.listObjects(params).promise();

        //@ts-ignore
        for (let index = 1; index < data['Contents'].length; index++) {

            //@ts-ignore
            let object = data['Contents'][index];
            // console.log("object.key : ",object.key)
            //@ts-ignore
            await addSizeObject(object.Size);

        }



        console.log("sizeFolder : ", sizeFolder);

        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        // console.log("s3: ", s3);




        return true;

    }

    @Query(() => Boolean)  // type graphql
    @UseMiddleware(MaintenanceMiddleWare)
    async checkMegabyteForAllPages(

    ): Promise<Boolean> {   //TYPE TYPESCRIPT

        //Does not work anymore!


        AWS.config = new AWS.Config();
        AWS.config.update({
            region: "eu-west-2", //config.region ||
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

        });
        var s3 = new AWS.S3();
        //  

        const paginas = await HerdenkingsPagina.query(`
                                         SELECT *
                                         FROM "herdenkings_pagina"                              
                                         
                                         
                                         `)

        paginas.map(async (pagina: HerdenkingsPagina) => {


            var params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Prefix: pagina.id

            };

            let sizeFolder = 0;
            const addSizeObject = async (sizeObject: number) => {
                sizeFolder = sizeFolder + sizeObject;
            }



            const data = await s3.listObjects(params).promise();

            //@ts-ignore
            for (let index = 1; index < data['Contents'].length; index++) {

                //@ts-ignore
                let object = data['Contents'][index];
                // console.log("object.key : ",object.key)
                //@ts-ignore
                await addSizeObject(object.Size);

            }


            console.log("NAME OF PAGE : ", pagina.name_of_page);
            console.log("sizeFolder : ", sizeFolder, "MB");
            console.log("sizeFolder : ", sizeFolder / (1000 * 1000), "MB");


        })




        //TODO: Stel dat iemand wil verwijderen, verander email in random string en verander naam in verwijderde gebruiker? 
        //Op die manier kunnen alle objecten  (behalve accessrequest ) blijven bestaan zodat er geen content verwijderd word


        // console.log("s3: ", s3);




        return true;

    }







}