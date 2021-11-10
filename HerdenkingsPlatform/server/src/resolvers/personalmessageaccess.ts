// import { Media } from "../entities/Media";
import { AccessRequest } from "../entities/AccessRequest";
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { PersonalMessage } from "../entities/PersonalMessage";
import { PersonalMessageAccess } from "../entities/PersonalMessageAccess";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { FieldError } from "./user";
import { checkPermission } from "../utils/checkPermission";
import { MediaPersonalMessage } from "../entities/Media";
import { deleteMediaFromAmazonS3Bucket } from "../utils/deleteFromAmazon";
import { STATUS } from "../constants";
import { checkDemoAccess } from "../utils/checkDemoAccess";




@ObjectType()  // objecttype is used for returns <->  inputtype is used for arguments
class PersonalMessageResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => PersonalMessageAccess, { nullable: true })
    pma?: PersonalMessageAccess;   // the ?  is for undefined
}

@Resolver(PersonalMessageAccess)
export class PersonalMessageAccessResolver {



    @FieldResolver(() => User)
    userThatHasAccess(@Root() pmaccess: PersonalMessageAccess,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(pmaccess.userThatHasAccessId);
    }
    // @FieldResolver(() => User)
    // user(@Root() pmaccess: PersonalMessageAccess,
    //     @Ctx() { userLoader }: MyContext) {
    //     return userLoader.load(request.requestorId);
    // }




    @FieldResolver(() => PersonalMessage)
    personalMessage(@Root() pmaccess: PersonalMessageAccess,
        @Ctx() { personalmessageLoader }: MyContext) {
        return personalmessageLoader.load(pmaccess.personalMessageId);
    }




    @Query(() => [PersonalMessage], { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async findAllPersonalMessagesOfCurrentUserForCurrentPage(
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PersonalMessage[] | undefined> {   //TYPE TYPESCRIPT
        // return Post.findOne(id, { relations: ["creator"] }); // hooryt bij die query in één keer doen
        
        const accessstatus = payload!.statusList[paginaId];

        if (accessstatus < STATUS.Approved) {
            throw new Error("You dont have permission to view memories")
        }
        const personalmessages = await getConnection().query(`
        
        select pm.*
        from personal_message pm
        
        where pm.id in (
            select "personalMessageId" 
            from personal_message_access pma 
            
            where pma."userThatHasAccessId" = $1
            AND pma."pageId" = $2      

        )
        

        `,
            [payload!.userId, paginaId]
        );
      
        return personalmessages;


    }

    // TODO ERROR-LAN
    @Query(() => [PersonalMessage], { nullable: true })  // type graphql    
    async personalmessages_demo(
        @Arg('paginaId') paginaId: string,        
    ): Promise<PersonalMessage[] | undefined> {   //TYPE TYPESCRIPT
       
        checkDemoAccess(paginaId);
        const personalmessages = await getConnection().query(`
        
        select pm.*
        from personal_message pm
        
        where pm.id in (
            select "personalMessageId" 
            from personal_message_access pma             
            where  pma."pageId" = $1      

        )       

        `,
            [paginaId]
        );
      
        return personalmessages;


    }



    @Query(() => [PersonalMessageAccess], { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async personalMessagesAccessForCurrentPage(
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PersonalMessageAccess[]> {   //TYPE TYPESCRIPT
        
        const accessstatus = payload!.statusList[paginaId];

        //TODO: Mogen mede-beheerder dit wel doen? (misschien enkel de beheerder aangezien dit persoonlijk is )
        if (accessstatus <= STATUS.Approved) {
            throw new Error("You dont have personal")
        }
        const personalmessages = await getConnection().query(`
        
        select pma.*
        from personal_message_access pma
        
        where pma."pageId" = $1              

        `,
            [paginaId]
        );
        
        return personalmessages;


    }


    @Query(() => [PersonalMessageAccess], { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async personalMessagesAccessForPersonalMessage(
        @Arg('paginaId') paginaId: string,
        @Arg('personalmessage_id') personalmessage_id: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PersonalMessageAccess[]> {   //TYPE TYPESCRIPT
        
        const accessstatus = payload!.statusList[paginaId];

        //TODO: Mogen mede-beheerder dit wel doen? (misschien enkel de beheerder aangezien dit persoonlijk is )
        if (accessstatus <= STATUS.Approved) {
            throw new Error("You dont have personal")
        }
        const personalmessages = await getConnection().query(`
        
        select pma.*
        from personal_message_access pma        
        where ( pma."pageId" = $1 AND pma."personalMessageId" = $2 )           
        `,
            [paginaId,personalmessage_id]
        );
        

        return personalmessages;


    }


    @Query(() => Boolean, { nullable: false })  // nodig voor navbar
    @UseMiddleware(isAuthJWT)
    async checkForPersonalMessages(
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Boolean | undefined> {   //TYPE TYPESCRIPT

        const pmess = await PersonalMessageAccess.findOne({
            where: {
                userThatHasAccessId: payload!.userId,
                pageId: paginaId,
            }
        });
        if (!pmess) {
            return false;
        }
        else {
            return true;
        }


    }




    @Query(() => [PersonalMessageAccess], { nullable: false })  // type graphql
    @UseMiddleware(isAuthJWT)
    async findAllUsersThatHaveAccesPerPersonalMessage(
        @Ctx() { payload }: MyContext,
        @Arg('personalMessageid') personalMessageid: string,
        @Arg('paginaId') paginaId: string,
    ): Promise<PersonalMessageAccess[] | undefined> {   //TYPE TYPESCRIPT
        
        const accessstatus = payload!.statusList[paginaId];

        //TODO: Mogen mede-beheerder dit wel doen? (misschien enkel de beheerder aangezien dit persoonlijk is )
        if (accessstatus <= STATUS.CoOwner) {
            throw new Error("You dont have permission to invite people to see personal messages")
        }

        return await PersonalMessageAccess.find({
            where:
            {
                personalMessageId: personalMessageid,
            }
        });

    }



    

    @Mutation(() => PersonalMessageResponse)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createPersonalMessageAccess(
        @Arg('paginaId') paginaId: string,
        @Arg('userId') userId: string,
        // @Arg('email') email: string,
        @Arg('personalMessageId') personalMessageId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PersonalMessageResponse> {   //TYPE TYPESCRIPT


        const accessstatus = payload!.statusList[paginaId];

        //TODO: Mogen mede-beheerder dit wel doen? (misschien enkel de beheerder aangezien dit persoonlijk is )
        if (accessstatus <= STATUS.CoOwner) {
            throw new Error("You dont have permission to invite people to see personal messages")
        }

        let pma;
        // const user = await User.findOne({ where: { email: email } });
        // const user = await User.findOne(userId);
        const user = await User.findOne(userId);

        if (!user) {
            return {
                errors: [
                    {
                        field: "emailinput",
                        message: "email not found ",

                    },
                ],
            };

        } else {
            try {

                //Indien er geen accessrequest is maken we automatisch een accessrequest aan zodat de ontvanger ook toegang heeft
                const existingaccessRequest = await AccessRequest.findOne({where :{
                    paginaId: paginaId,
                    requestorId: user.id
                }});

                if(existingaccessRequest){
                    if (existingaccessRequest.status < 2) {

                        const status = 2;
    
                        // verander de status van vroeger naar 2 (= toegelaten)
                        await getConnection()
                            .createQueryBuilder()
                            .update(AccessRequest)
                            .set({ status })
                            .where('id =:id',
                                { id: existingaccessRequest.id })
                            .returning("*")
                            .execute();
                    }
                }else{
                    await AccessRequest.create(
                        {
                            requesttext: "persoonlijke boodschap",
                            paginaId: paginaId,
                            requestorId: user.id, // niet payload, je wilt degene waarvan je de email hebt
                            status: 2,
                        }
                    ).save();
                }

                // de personalmessagerequest zelf aanmaken
                
                const result = await getConnection().createQueryBuilder().insert().into(PersonalMessageAccess).values(
                    {
                        userThatHasAccessId: user.id,
                        personalMessageId: personalMessageId,
                        pageId: paginaId
                    }
                ).returning("*").execute();

                pma = result.raw[0];
            } catch (err) {
                return {
                    errors: [
                        {
                            field: "emailinput",
                            message: err.message,

                        },
                    ],
                };
            }


        }
        return { pma };


    }





    @Mutation(() => Boolean)  // type graphql
    @UseMiddleware(isAuthJWT) // alleen owner mag dit kunnen aanpassen 
    async deletePersonalMessageAccess(
        @Arg('userThatHasAccessId') userThatHasAccessId: string,
        @Arg('personalMessageId') personalMessageId: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {
        // Not cascade way

        const accessstatus = payload!.statusList[paginaId];
        //TODO: Mogen mede-beheerder dit wel doen? (misschien enkel de beheerder aangezien dit persoonlijk is )
        if (accessstatus <= STATUS.CoOwner) {
            throw new Error("You dont have permission to remove the invitation")
        }

        const pmess = await PersonalMessageAccess.findOne({
            where: {
                userThatHasAccessId: userThatHasAccessId,
                personalMessageId: personalMessageId,
            }
        });
        if (!pmess) {
            return false;
        }       

       
        await PersonalMessageAccess.delete(pmess.id);


        return true;
    }


    // CRUD create read update delete


}