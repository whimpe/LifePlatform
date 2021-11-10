import { Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { ACCOUNT_STATUS, STATUS } from "../constants";
import { AccessRequest } from "../entities/AccessRequest";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { isAuthJWTIndexPage } from "../middleware/isAuthJwtIndexPage";
import { MyContext } from "../types";
import { checkDemoAccess } from "../utils/checkDemoAccess";
import { checkIfCanCreateAccessRequest } from "../utils/checkIfCanCreate/checkIfCanCreateAccessRequest";
import { checkPermission } from "../utils/checkPermission";
import { AccessRequestEmail } from "../utils/email_templates/AccessRequestEmail";
import { ChangeStatusEmail } from "../utils/email_templates/ChangeStatusEmail";
import { createAccessToken, createRefreshToken } from "../utils/JWTAuth";
import { sendRefreshToken } from "../utils/sendRefreshToken";


const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

@ObjectType()  // objecttype is used for returns <->  inputtype is used for arguments
class IndexPageResponse {
    @Field(() => HerdenkingsPagina, { nullable: true })
    herdenkingspagina?: HerdenkingsPagina;

    @Field(() => Int)
    accessLevel: number;   // the ?  is for undefined

    @Field({ nullable: true })
    privaat_of_publiek?: String;   // the ?  is for undefined

    @Field({ nullable: true })
    accessToken?: String;

    // @Field(() => Error, { nullable: true })
    // error?: Error;   // the ?  is for undefined
}


@Resolver(AccessRequest)
export class AccessRequestResolver {

    @FieldResolver(() => User)
    requestor(@Root() request: AccessRequest,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(request.requestorId);
    }


    @FieldResolver(() => String)
    async pagina(
        @Root() request: AccessRequest,
    ) {
        const hpagina = await HerdenkingsPagina.findOne({
            where:
                { id: request.paginaId }
        });
        return hpagina;
    }

    @Query(() => [AccessRequest])  // ongeacht voor condolatie/herinnering
    @UseMiddleware(isAuthJWT)
    async accessRequestsByUserId(
        @Ctx() { payload }: MyContext): Promise<AccessRequest[] | undefined> {

            const requests = await getConnection().query(`
        
            select r.*
            from "access_request" r
            
            where r."requestorId" = $1        
    
            order by r."createdAt"  DESC;        
    
            `, [ payload!.userId]
            );

            return await requests;
    }



    @Query(() => [AccessRequest])
    @UseMiddleware(isAuthJWT)
    async requestsByPaginaId(
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<AccessRequest[] | undefined> {

        const accessstatus = payload!.statusList[paginaId];


        if (accessstatus < STATUS.CoOwner) {
            throw new Error("You dont have permission to view all people")
        }

        const requests = await getConnection().query(`
        
        select r.*
        from "access_request" r
        
        where r."paginaId" = $1        

        order by r."status"  DESC;        

        `, [paginaId]
        );

        return requests;
    }

    @Query(() => [AccessRequest])    
    async requestsByPaginaId_demo(
        @Arg('paginaId') paginaId: string,
        ): Promise<AccessRequest[] | undefined> {

        checkDemoAccess(paginaId);

        const requests = await getConnection().query(`
        
        select r.*
        from "access_request" r
        
        where r."paginaId" = $1        

        order by r."status"  DESC;        

        `, [paginaId]
        );

        console.log("requests",requests)

        return requests;
    }


    @Mutation(() => AccessRequest)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createAccessRequest(
        @Arg('requesttext') requesttext: string,
        @Arg('paginaId') paginaId: string,
        @Arg('requestor_username') requestor_username: string,
        @Ctx() { payload }: MyContext,
    ): Promise<AccessRequest> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({ where: { id: paginaId } });
        if (!pagina) { throw new Error("could not find page") }

        await checkIfCanCreateAccessRequest(pagina, payload!.statusList[paginaId])
        
        let owner = await User.findOne({ where: { id: pagina.ownerId } });
        if (!owner) { throw new Error("could not find user") }
        AccessRequestEmail(owner.email,requestor_username,requesttext,pagina.name_of_page,pagina.mediaUrl,paginaId)
        console.log(owner.email);
        return AccessRequest.create(
            {
                requesttext: requesttext,
                paginaId: paginaId,
                requestorId: payload!.userId,
                status: 1,
            }
        ).save();



    }


    @Mutation(() => AccessRequest)  // type graphql
    @UseMiddleware(isAuthJWT)
    async changeStatusAccessRequest(
        @Arg('id') id: string,
        @Arg('status') status: number,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<AccessRequest> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: { id: paginaId }
        });
        if (!pagina) { throw new Error("could not find page") }

        // Je moet minstens coOwner zijn in het algemeen

        const statusUserOnPage = payload!.statusList[paginaId];
        checkPermission(statusUserOnPage, STATUS.CoOwner, pagina!.ownerId, payload!.userId);

        let accessrequestToBeChanged = await AccessRequest.findOne({ where: { id: id } });

        if (!accessrequestToBeChanged) {
            throw new Error("could not find accessrequest")
        }

        
        //Je mag mensen met een gelijke of hogere status niet demoten
        if (accessrequestToBeChanged.status >= statusUserOnPage) {  //if status (tobechanged) 

            // It is Yourself
            if (accessrequestToBeChanged.requestorId === payload?.userId) {

                throw new Error("Cant promote or demote yourself");

                //TODO:Jezelf wel kunnen demoveren? -> problemen als de eigenaar zicjhzelf perongeluk zou demoveren dus beter niet

            }
            else {
                throw new Error("Cant change status of people who have a higher or equal status than yourself");
            }


        }

        if (status >= 4) {
          
            // Je moet minstens Owner zijn om iemand owner of coOwner te maken
            checkPermission(statusUserOnPage, STATUS.Owner, pagina!.ownerId, payload!.userId);
            //Als je eigenaar veradnert ->             
            // 1) verander de status in de accessrequest van vroegere owner naar coOwner
            // 2) verander de fk ownerId van pagina
            // 3) cancel lopende suvbscriptie van oude eigenaar 

            if (status === STATUS.Owner) {
               

                //Als de persoon mede beheerder wil worden moet die geverifieerd zijn

                let userWithNewStatus = await User.findOne({ where: { id: accessrequestToBeChanged.requestorId } });
                if (!userWithNewStatus) {
                    throw new Error("Kon de gebruiker niet vinden");
                }

                if (userWithNewStatus.account_status === ACCOUNT_STATUS.NOT_VERIFIED) {
                    throw new Error("De gebruiker moet geverifieerd zijn voordat die mede_beheerder of eigenaar kan worden");
                }
                console.log("**********-------------------------1--------------------************************")

                // 1)
                let accessrequestOriginalOwner = await AccessRequest.findOne({
                    where:
                    {
                        paginaId: paginaId,
                        requestorId: payload!.userId
                    }
                });

               
                if (!accessrequestOriginalOwner) {
                    throw new Error("Iets heel raars, abort");
                }
                
                // accessrequestOriginalOwner.status = STATUS.CoOwner;
                // have to put the promise in an object (await1) or otherwise it (sometimes) doe not execute
                // const await1 = await accessrequestOriginalOwner.save();

                await getConnection()
                .createQueryBuilder()
                .update(AccessRequest)
                .set({ 
                    status : STATUS.CoOwner
                })
                .where(
                    {
                        paginaId: paginaId,
                        requestorId: payload!.userId
                    })
                .execute();


                // 2)
                console.log("**********-----------------2-----------------------------************************")
                pagina.ownerId = accessrequestToBeChanged.requestorId;
                // .save() does not work if there are multiple per mutation
                // const await2 = await pagina.save();

                await getConnection()
                .createQueryBuilder()
                .update(HerdenkingsPagina)
                .set({ 
                    ownerId : accessrequestToBeChanged.requestorId
                })
                .where(
                    {
                        id: paginaId,
                       
                    })
                .execute();

              

                //3) Cancel mollie subscription (if exists)

                //Check if a subscription exists
                let oldOwner = await User.findOne({ where: { id: payload!.userId } });
                if (!oldOwner) {
                    throw new Error("Kon de gebruiker niet vinden");
                }

                //If the oldOwner has no customerId , there was no previous subscription
                console.log("**********-----------------3---------------------------************************")
                if (!oldOwner.mollieCustomerId) {

                    //No subscription 
                }else{

                    //Check if there is an active subscription for the current page
                    const subscriptions = await mollieClient.customers_subscriptions.all({ customerId: oldOwner.mollieCustomerId });
                    let mollieSubscriptionId = "noSubscriptionId";
    
    
                    await subscriptions.map(async (subscription: any) => {
                        if (subscription.metadata.paginaId === paginaId && subscription.status === "active") {
    
                            mollieSubscriptionId = subscription.id;
                        }
    
                    });

                    if(mollieSubscriptionId !== "noSubscriptionId"){
                        try {
                            await mollieClient.customers_subscriptions.cancel(mollieSubscriptionId, { customerId: oldOwner.mollieCustomerId });
                        } catch (error) {
                            console.log("**************************************************************");
                            console.log(error.message)
                            console.log("**************************************************************");
                            throw new Error("er is iets misgegaan bij het cancelen")
                        }
        
                    }
                    else{
                        // Gebruiker wel een molliecustomer maar geen huidige subscriptie voor deze pagina
                    }
                    // throw new Error("De eigenaar heeft geen geldig molliesubscriptionId");
                    
                }
              

                
            }

        }

        const arequest = await getConnection()
                .createQueryBuilder()
                .update(AccessRequest)
                .set({ 
                    status :status
                })
                .where( { id: id })
                .returning("*")
                .execute();
        
        let user = await User.findOne({ where: { id: accessrequestToBeChanged.requestorId } }); 
        if (!user) { throw new Error("could not find user") }
        ChangeStatusEmail(user.email,status,pagina.name_of_page,pagina.mediaUrl,pagina.id)

        // accessrequestToBeChanged.status = status;
        // const await3 = accessrequestToBeChanged.save();
        console.log("arequest",arequest);
        console.log("arequest",arequest.raw[0]);
        return arequest.raw[0];

    }




    /**
     * Query used to find the relevant herdenkingspage based on the url
     * when the private_token is used the user his status is automatically updated
     * 
     */
    @Query(() => IndexPageResponse)
    @UseMiddleware(isAuthJWTIndexPage)
    async indexPage(
        @Arg('public_or_private_token') public_or_private_token: string,
        @Ctx() { payload, res }: MyContext,
    ): Promise<IndexPageResponse> {

        let pagina;
        let accessLevel;
        let publiek_of_privaat;
        let accessToken;

        // check of er een pagina bestaat met publieke link
        const pagina_publiek = await HerdenkingsPagina.findOne({
            where: {
                id: public_or_private_token
            }
        });

        if (!pagina_publiek) {

            // publieke pagina
            const pagina_privaat = await HerdenkingsPagina.findOne({
                where: { private_token: public_or_private_token } });

            if (!pagina_privaat) {
                throw new Error("no such page exists");
            } else {
                pagina = pagina_privaat;
                publiek_of_privaat = "privaat";

            }

        } else {
            pagina = pagina_publiek;
            publiek_of_privaat = "publiek";
        }

        if (!payload?.userId) {
            return ({ accessLevel: 0, herdenkingspagina: pagina, privaat_of_publiek: "publiek", accessToken: undefined })
        }



        // kijk of er al request bestaat
        const bestaanderequest = await AccessRequest.findOne({
            where: { paginaId: pagina.id, requestorId: payload.userId } });
        // geen voorgaande interactie
        if (!bestaanderequest) {
            if (publiek_of_privaat === "privaat") {
                await checkIfCanCreateAccessRequest(pagina, payload!.statusList[pagina.id])
                await AccessRequest.create(
                    {
                        requesttext: "directe toegang",
                        paginaId: pagina.id,
                        requestorId: payload!.userId,
                        status: 2,
                    }
                ).save();

                accessLevel = 2;
                payload!.statusList[pagina.id] = accessLevel;
                let user = await User.findOne(payload!.userId);
                if (user) {
                    accessToken = await createAccessToken(user);
                    sendRefreshToken(res, createRefreshToken(user));
                }

                // creer jwt 

            }
            else if (publiek_of_privaat === "publiek") {
                accessLevel = 0;
                accessToken = "afwachtingvragen";

            } else {
                accessLevel = 0;
            }
            // wel vroeger eens interactie gehad 
        } else {
            if (publiek_of_privaat === "privaat") {
                if (bestaanderequest.status < 2) {

                    const status = 2;

                    // verander de status van vroeger naar 2 (= toegelaten)
                    await getConnection()
                        .createQueryBuilder()
                        .update(AccessRequest)
                        .set({ status })
                        .where('id =:id',
                            { id: bestaanderequest.id })
                        .returning("*")
                        .execute();

                    accessLevel = 2;
                    payload!.statusList[pagina.id] = accessLevel;
                    let user = await User.findOne(payload!.userId);
                    if (user) {
                        accessToken = await createAccessToken(user);
                        sendRefreshToken(res, createRefreshToken(user));
                    } else {
                        accessLevel = 0;
                    }

                } else {
                    accessLevel = bestaanderequest.status;

                }
            }
            else if (publiek_of_privaat === "publiek") {
                accessLevel = bestaanderequest.status;

            } else {
                accessLevel = 0;
            }

        }

        return ({ accessLevel: accessLevel, herdenkingspagina: pagina, privaat_of_publiek: publiek_of_privaat, accessToken: accessToken })

    }



}
