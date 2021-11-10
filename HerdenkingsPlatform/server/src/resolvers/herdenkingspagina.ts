// import { Media } from "../entities/Media";
import { ACCOUNT_STATUS, DESIGN_TYPE, PARTNER_TYPE, PAYMENT_PLAN, PAYMENT_STATUS, Payment_Term, STATUS } from "../constants";
import { MyContext } from "../types";
import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { AccessRequest } from "../entities/AccessRequest";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import argon2 from "argon2";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { checkPermission } from "../utils/checkPermission";
import { createAccessToken, createRefreshToken } from "../utils/JWTAuth";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { FieldError, UsernamePasswordInput } from "./user";
import "reflect-metadata";
import "dotenv-safe/config";
import { determinePaymentPlan } from "../utils/paymentutils/determinePaymentPlan";
import { determinePaymentPrice } from "../utils/paymentutils/determinePaymentPrice";
import { getMollieCustomerId } from "../utils/paymentutils/getMollieCustomerId";
import { inviteEmail } from "../utils/email_templates/inviteEmail";
import { PartnerToCustomerEmail } from "../utils/email_templates/PartnerToCustomerEmail";


// import express from 'express';
// const bodyParser = require("body-parser")
// const app = express();
const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
//'live_uHEwAmrFFp6grFd2UKBq8jwg9Drv4t
// 'test_6sydGNE55KufrebD2Rmjzc8AcFrnDB'



@InputType()
class HerdenkingsPaginaInput {

    @Field()
    name_of_page: string

    @Field()
    mediaUrl?: string

    @Field()
    text?: string;

    @Field()
    DoB?: Date;


    @Field()
    control_before!: boolean;

    @Field()
    condoleance_active!: boolean;

    @Field()
    DesignType!: DESIGN_TYPE;



}

@ObjectType()
export class HerdenkingsPaginaResponse {
    @Field({ nullable: true })
    accessToken?: string;

    @Field(() => HerdenkingsPagina, { nullable: true })
    herdenkingspagina?: HerdenkingsPagina;

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

}

@ObjectType()
export class SubscriptionInfo {
    @Field({ nullable: true })
    mollieSubscriptionId?: string;

    @Field({ nullable: true })
    nextPaymentDate?: string;

    @Field({ nullable: true })
    startDate?: string;

    @Field({ nullable: true })
    status?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    interval?: string;

    @Field({ nullable: true })
    payment_plan?: string;



}

//TODO: Andere voor subscription?
@ObjectType()
export class paymentResponse {
    @Field()
    pay_id: string;

    @Field()
    pay_link: string;

}

@ObjectType()
export class CheckpaymentResponse {
    @Field()
    status: string;

    @Field()
    aantal_dagen: string;

}



@Resolver(HerdenkingsPagina)
export class HerdenkingsPaginaResolver {

    // n+1 problem

    // Dataloader batches all the queries into a single function call!
    @FieldResolver(() => User)
    owner(
        @Root() pagina: HerdenkingsPagina,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(pagina.ownerId);
    }


    @Query(() => HerdenkingsPagina, { nullable: true })  // type graphql
    // @UseMiddleware(isAuthJWT)
    // @UseMiddleware(isAuthJWT)
    async herdenkingspagina(
        @Arg('paginaId') paginaId: string): Promise<HerdenkingsPagina | undefined> {   //hier staat private link NIET in

        return await HerdenkingsPagina.findOne(paginaId);
    }


    @Query(() => HerdenkingsPagina, { nullable: true })  // gebruiken zodat mensen niet zomaar aan de private link kunnen 
    @UseMiddleware(isAuthJWT)
    async herdenkingspaginaprivatetoken(
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<HerdenkingsPagina | undefined> {   //TYPE TYPESCRIPT

        const pagina = await HerdenkingsPagina.findOne(paginaId);

        if (!pagina) {
            throw new Error("could not find page")
        }

        checkPermission(payload!.statusList[paginaId], STATUS.CoOwner, pagina.ownerId, payload!.userId);


        return pagina;

    }


    @Query(() => [HerdenkingsPagina], { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    herdenkingspaginaByOwnerId(
        @Ctx() { payload }: MyContext,
    ): Promise<HerdenkingsPagina[] | undefined> {   //TYPE TYPESCRIPT

        return HerdenkingsPagina.find({ where: { ownerId: payload!.userId } });

    }



    @Mutation(() => HerdenkingsPaginaResponse)  // type graphql
    @UseMiddleware(isAuthJWT)
    // has paid en mollie erinsteken
    async createHerdenkingspagina(
        @Arg('input') input: HerdenkingsPaginaInput,
        @Ctx() { res, payload }: MyContext,
        @Arg('DoD', { nullable: true }) DoD?: Date,
    ): Promise<HerdenkingsPaginaResponse> {   //TYPE TYPESCRIPT

        //Check if valid user and if email is verified
        const user = await User.findOne(payload!.userId);

        if (!user) {
            return {
                errors: [{
                    field: "user",
                    message: "strange error"
                }]
            };
        }

        if (user.account_status === ACCOUNT_STATUS.NOT_VERIFIED) {
            throw new Error("Not verified");
        }




        const today = new Date();

        console.log("datm van vandaag:  ", today)

        const pagina = await HerdenkingsPagina.create({
            ...input, // media zit hier al in
            ownerId: payload!.userId,
            DoD: DoD,
            Payment_status: PAYMENT_STATUS.Valid,
            Payment_plan: PAYMENT_PLAN.Free,
            shareable: true,
            ValidUntil: today,


            // secondownerId
        }).save();

        await AccessRequest.create(
            {
                requesttext: "Oprichter Levensverhaal",
                paginaId: pagina.id,
                requestorId: payload!.userId,
                status: 5, /// OWNER STATUS
            }
        ).save();

        // creer jwt 
        const accessToken = await createAccessToken(user);

        // creer refresh token? -> store in cookie?
        // name cookie, value of token and
        sendRefreshToken(res, createRefreshToken(user));


        return { herdenkingspagina: pagina, accessToken };
    }


    /*
    * Functie om een herdenkingspagin aan te maken door een partner
    * 
    *   @info_administrator nodig om een nieuwe gebruiker aan te maken die beheerder zal zijn (niet de partner)
    */
    @Mutation(() => HerdenkingsPaginaResponse)
    @UseMiddleware(isAuthJWT)
    async createPartnerHerdenkingspagina(
        @Arg('input') input: HerdenkingsPaginaInput,
        @Arg('partner_name') partner_name: String,
        @Arg('partner_email') partner_email: String,
        @Arg('partner_type') partner_type: PARTNER_TYPE,
        @Ctx() { res, payload,redis }: MyContext,
        @Arg('DoD', { nullable: true }) DoD?: Date,
        @Arg('info_administrator', { nullable: true }) info_administrator?: UsernamePasswordInput,
    ): Promise<HerdenkingsPaginaResponse> {

        //Check if valid partner and if email is verified
        const user = await User.findOne(payload!.userId);
        if (!user) { return { errors: [{ field: "user", message: "strange error" }] }; }

        if (user.account_status !== ACCOUNT_STATUS.VERIFIED_PARTNER) {
            throw new Error("Not a verified partner");
        }

        const today = new Date();
        let validUntil;
        let payment_plan;
        let ownerId;
        let statusPartner;
        let administrator;
        let new_user=false;
        const token = v4();
        

        if (partner_type === PARTNER_TYPE.FUNERAL_UNDERTAKER) {
            validUntil = new Date(today.setMonth(today.getMonth() + (12 * 5)));    
            payment_plan = PAYMENT_PLAN.Funeral
        } else {
            throw new Error("Partner Type Error: no correct partner type")
        }

        if (!info_administrator) {        // funeralundertaker becomes the owner of page --> due to no customer information
            ownerId = payload!.userId;
            statusPartner =STATUS.Partner;        
        } 
        
        else {                          //partner had customer information
            administrator = await User.findOne({ where: { email: info_administrator.email.toLocaleLowerCase() } });
            statusPartner =STATUS.Partner;          // De partner co-owner
            
            if (!administrator) { //administrator bestaat niet dus maak nieuwe gebruiker aan en stuur mail naar persoon om wachtwoord te veranderen
                const hashedPassword = await argon2.hash(token.substring(0,6));  // hash the password
                try {
                    const result = await getConnection().createQueryBuilder().insert().into(User).values(
                        {
                            username: info_administrator.username,
                            password: hashedPassword,
                            email: info_administrator.email.toLocaleLowerCase()    //emails are case INsensitive
                        }
                    ).returning("*").execute();
                    new_user=true;
                    administrator = result.raw[0];
                    console.log("user id bij aanmaken", administrator.id)
                    ownerId=administrator.id;
                
                }catch(error:any){
                    throw new Error("Er liep iets mis bij het creeren van de gebruiker")
                }

            } else {

                ownerId = administrator.id;
            }

 
        }


        console.log("datum van vandaag:  ", today)

        const pagina = await HerdenkingsPagina.create({
            ...input, // media zit hier al in
            ownerId: payload!.userId,
            DoD: DoD,
            Payment_status: PAYMENT_STATUS.Valid,
            Payment_plan: payment_plan,
            shareable: true,
            ValidUntil: validUntil,


            // secondownerId
        }).save();


        if (partner_type === PARTNER_TYPE.FUNERAL_UNDERTAKER) {     // TODO: uitbreiden als er andere partners op het platform komen
            await AccessRequest.create(
                {
                    requesttext: "Begrafenisondernemer",
                    paginaId: pagina.id,
                    requestorId: payload!.userId,
                    status: statusPartner, /// OWNER STATUS
                }
            ).save();

        }

        if (!info_administrator) {
           
                
        }else{
            await AccessRequest.create(
                {
                    requesttext: "Eigenaar",
                    paginaId: pagina.id,
                    requestorId: administrator.id,
                    status: STATUS.Owner, /// OWNER STATUS
                }
            ).save();
            await redis.set(token, user.id, 'ex', 1000 * 60 * 60 * 24 * 14 ); // 14 days
            await PartnerToCustomerEmail(info_administrator.email,info_administrator.username,true, input.name_of_page,pagina.id, partner_name,token)
            

        }
        if(new_user && info_administrator){
            await redis.set(token, user.id, 'ex', 1000 * 60 * 60 * 24 * 14 ); // 14 days
            const result= await PartnerToCustomerEmail(info_administrator.email,info_administrator.username,false, input.name_of_page,pagina.id ,partner_name,token)                
        }
        

        // creer jwt 
        const accessToken = await createAccessToken(user);

        // creer refresh token? -> store in cookie?
        // name cookie, value of token and
        sendRefreshToken(res, createRefreshToken(user));


        return { herdenkingspagina: pagina, accessToken };
    }






    @Mutation(() => paymentResponse)  // type graphql
    @UseMiddleware(isAuthJWT)
    // has paid en mollie erinsteken
    async createLevenstijdlijnBetaling(
        @Arg("public_token") public_token: string,
        @Arg("payment_term") payment_term: Payment_Term,
        @Arg("payment_plan") payment_plan: PAYMENT_PLAN,
        @Ctx() { redis, payload }: MyContext,
    ): Promise<paymentResponse> {   //TYPE TYPESCRIPT

        //TODO: later eventueel coowner versoepelen    
        if (payload!.statusList[public_token] < STATUS.CoOwner) {
            throw new Error("Alleen beheerders kunnen betalen");
        }


        const token = v4();
        if (payment_term === Payment_Term.Recurring) {
            throw new Error("Wrong payment details: term can't be recurring");
        }

        const user = await User.findOne(payload!.userId);
        if (!user) {
            throw new Error("could not find user");
        }
        const description: string[] = ['Maandelijkse Subscriptie', 'Premium Jaarpakket ', 'Premium 5-Jaarpakket', 'Premium 10-Jaarpakket', 'Premium Levenslang'];

        const paymentplan = await determinePaymentPlan(payment_plan, public_token);

        const price = await determinePaymentPrice(payment_plan, payment_term);

        const pay = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: price, // We enforce the correct number of decimals through strings
            },
            description: `${description[payment_term]} - ${user.username} `,  // ${user?.email} -  ${PAYMENT_PLAN[paymentplan]} - ${Payment_Term[payment_term]}
            redirectUrl: ` ${process.env.CORS_ORIGIN}/PLATFORM/${public_token}/payed-confirmation`,
            webhookUrl: process.env.WEBHOOK_URL_MOLLIE,
            metadata: {
                // order_id: `${order_id}`,
                paginaId: public_token,
                payment_plan: paymentplan,
                payment_term: payment_term,   //YEARS

            },

        });

        await redis.set(
            token,
            pay.id,
            "ex",
            1000 * 60 * 60 * 24 * 3
        );



        return { pay_id: pay.id, pay_link: pay._links.checkout.href };

    }
    

    @Mutation(() => paymentResponse)  // type graphql
    @UseMiddleware(isAuthJWT)
    // has paid en mollie erinsteken
    async createLevenstijdlijnDomiciliering(
        @Arg("public_token") public_token: string,
        @Arg("payment_term") payment_term: Payment_Term,
        @Arg("payment_plan") payment_plan: PAYMENT_PLAN,
        // // @Arg('DoD', { nullable: true }) DoD?: Date,
        // @Arg("package_nbr") package_nbr: Payment_Package_options,
        @Ctx() { payload }: MyContext,
    ): Promise<paymentResponse> {

        if(payload!.statusList[public_token] < STATUS.Owner){ throw new Error("Alleen de eigenaar kan een subscriptie starten"); }
        if (payment_term !== Payment_Term.Recurring) { throw new Error("Wrong payment details: term must be be recurring"); }
        const user = await User.findOne(payload!.userId);
        if (!user) {
            throw new Error("could not find user");
        }



        const MollieCustomerId = await getMollieCustomerId(mollieClient, payload!.userId);
        const subscriptions = await mollieClient.customers_subscriptions.all({ customerId: MollieCustomerId });
        await subscriptions.map((subscription: any) => {
            if (subscription.metadata.paginaId === public_token && subscription.status === "active") {
                throw new Error("There already exist a subscription for this page")
            }
        });


        console.log("subscriptions :", subscriptions)

        const paymentplan = await determinePaymentPlan(payment_plan, public_token);

        const price = await determinePaymentPrice(payment_plan, payment_term);


        const payment_first = await mollieClient.payments.create({
            amount: {
                currency: 'EUR',
                value: price, // We enforce the correct number of decimals through strings
            },
            description: `Start Premium Subscriptie - ${user.username}`, //First payment of recurring plan by ${user.email} of price ${price} EUR for plan: ${PAYMENT_PLAN[paymentplan]}
            customerId: MollieCustomerId,
            //TODO: deftige redirect url maken
            redirectUrl: ` ${process.env.CORS_ORIGIN}/PLATFORM/${public_token}/payed-confirmation`,
            webhookUrl: process.env.WEBHOOK_URL_MOLLIE,
            sequenceType: "first",
            metadata: {

                paginaId: public_token,
                payment_plan: paymentplan,
                payment_term: payment_term,

                //TODO: dit fixen dat je deftig je keuze ingeeft                 
            },

        });

        console.log("payment_first     : ", payment_first);





        return { pay_id: payment_first.id, pay_link: payment_first._links.checkout.href };



    }

    @Query(() => SubscriptionInfo)  // type graphql
    @UseMiddleware(isAuthJWT)
    async getMollieSubscriptionForPage(
        @Arg("public_token") public_token: string,
        @Ctx() { payload }: MyContext,
    ): Promise<SubscriptionInfo> {

        let mollieSubscriptionId;
        let nextPaymentDate;
        let startDate;
        let status;
        let description;
        let interval;
        let payment_plan;

        if (payload!.statusList[public_token] < STATUS.CoOwner) {
            throw new Error("Alleen beheerders kunnen betalingsgegevens zien");
        }

        const user = await User.findOne({
            where: {
                id: payload!.userId
            }
        })

        if (!user) {
            throw new Error("Can not find user");
        }

        //TODO: logischer naar frontend -> geen mollieCustomerId

        const subscriptions = await mollieClient.customers_subscriptions.all({ customerId: user.mollieCustomerId });

        await subscriptions.map(async (subscription: any) => {
            if (subscription.metadata.paginaId === public_token && subscription.status === "active") {

                mollieSubscriptionId = subscription.id,
                    nextPaymentDate = subscription.nextPaymentDate;
                startDate = subscription.startDate;
                status = subscription.status;
                description = subscription.description;
                interval = subscription.interval;
                payment_plan = subscription.payment_plan;

            }

        });

        return {
            mollieSubscriptionId: mollieSubscriptionId,
            nextPaymentDate: nextPaymentDate,
            startDate: startDate,
            status: status,
            description: description,
            interval: interval,
            payment_plan: payment_plan,
        }



    }


    @Mutation(() => String)  // type graphql
    @UseMiddleware(isAuthJWT)
    async cancelMollieSubscription(
        @Arg("public_token") public_token: string,
        @Arg("MollieSubscriptionId") MollieSubscriptionId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<String> {

        if (payload!.statusList[public_token] < STATUS.CoOwner) {
            throw new Error("Alleen beheerders kunnen betalingsgegevens zien");
        }


        //TODO: user al meegeven in forntend
        const user = await User.findOne({
            where: {
                id: payload!.userId
            }
        })

        if (!user) {
            throw new Error("Can not find user");
        }
        if (!user.mollieCustomerId) {
            throw new Error("Kan geen mollie subscriptieId vinden");
        }

        await mollieClient.customers_subscriptions.cancel(MollieSubscriptionId, { customerId: user.mollieCustomerId });
        return "subscription is canceled";

    }



    @Query(() => String)  // type graphql
    @UseMiddleware(isAuthJWT)
    async getMollieSubscriptions(
        @Arg("public_token") public_token: string,
        @Ctx() { payload }: MyContext,) {


        if (payload!.statusList[public_token] < STATUS.CoOwner) {
            throw new Error("Alleen beheerders kunnen betalingsgegevens zien");
        }

        console.log("consumerid : ", payload?.userId)


        const user = await User.findOne({
            where: {
                id: payload!.userId
            }
        })

        if (!user) {
            throw new Error("could not find user")
        }

        // const customerPayments = await mollieClient.customers_payments.list({ customerId: user.mollieCustomerId });

        // console.log("customerPayments :", customerPayments)

        // const subscriptions = await mollieClient.customers_subscriptions.all({ customerId: user.mollieCustomerId });

        // console.log("subscriptions :", subscriptions)

        // const mandates = await mollieClient.customers_mandates.page({  customerId: user.mollieCustomerId });

        // console.log("mandates :", mandates)

    }



    @Query(() => CheckpaymentResponse)  // type graphql
    @UseMiddleware(isAuthJWT)
    // has paid en mollie erinsteken
    async checkBetaling(
        @Arg('redis_payment_mollie_id') redis_payment_mollie_id: string,
        @Ctx() { redis }: MyContext,
    ): Promise<CheckpaymentResponse> {   //TYPE TYPESCRIPT              

        let antw = { status: 'some error', aantal_dagen: '0' };

        let mollie_payment_id;
        try {
            mollie_payment_id = await redis.get(redis_payment_mollie_id);

        }
        catch (e) {
            throw new Error('key was deleted');
        }
        await redis.del(redis_payment_mollie_id)

        const response = await mollieClient.payments.get(mollie_payment_id);

        if (response.status === 'paid') {
            console.log('start betaling');
            antw = { status: response.status, aantal_dagen: response.metadata.aantal_dagen };
        } else if (response.status !== 'paid') {

            antw = { status: response.status, aantal_dagen: response.metadata.aantal_dagen };
        } else {
            antw = { status: 'not paid', aantal_dagen: '0' };
        }

        return antw;
    }


    @Mutation(() => HerdenkingsPagina, { nullable: true })
    @UseMiddleware(isAuthJWT)          // gemaakt omdat kip of ei probleem met folders in S3 bucket
    async addMediaUrl(
        @Arg("paginaId") paginaId: string,
        @Arg("mediaUrl") mediaUrl: string,
        @Ctx() { payload }: MyContext,
    ): Promise<HerdenkingsPagina | null> {

        if (payload!.statusList[paginaId] < STATUS.CoOwner ) {      //TODO: Probleem met begrafenisondernemers, normaal mag enkel beheerder deze functie gebruiken maar als partner aanmaakt moet ook hij dit kunnen
            throw new Error("Alleen beheerders kunnen dit toevoegen zien");
        }

        const result = await getConnection()
            .createQueryBuilder()
            .update(HerdenkingsPagina)
            .set({ mediaUrl })
            .where('id = :id ', {
                id: paginaId,
            })
            .returning("*")
            .execute();

        return result.raw[0];
    }


    @Mutation(() => HerdenkingsPagina, { nullable: true })
    @UseMiddleware(isAuthJWT)
    async updateHerdenkingsPagina(
        @Arg("paginaId") paginaId: string,
        @Arg("name_of_page") name_of_page: string,
        @Arg("mediaUrl") mediaUrl: string,
        @Arg("text") text: string,
        @Arg("DesignType") DesignType: DESIGN_TYPE,
        @Arg("condoleance_active") condoleance_active: boolean,
        @Arg("control_before") control_before: boolean,
        @Arg("DoB") DoB: Date,
        @Ctx() { payload }: MyContext,
        @Arg("DoD", { nullable: true }) DoD?: Date,
    ): Promise<HerdenkingsPagina | null> {

        if (payload!.statusList[paginaId] < STATUS.CoOwner) {
            throw new Error("Alleen beheerders kunnen pagina aanpassen");
        }


        const result = await getConnection()
            .createQueryBuilder()
            .update(HerdenkingsPagina)
            .set({ mediaUrl, name_of_page, text, condoleance_active, DoD, DoB, control_before, DesignType })
            .where('id = :id ', {
                id: paginaId,
            })
            .returning("*")
            .execute();

        return result.raw[0];
    }


    @Mutation(() => Boolean)
    @UseMiddleware(isAuthJWT)
    async Invite_people(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("public_token") public_token: string,
    ): Promise<Boolean> {
        const pagina = await HerdenkingsPagina.findOne(public_token);
        if (!pagina) {
            return false;
        } else {
            await inviteEmail(email, username, pagina.name_of_page, pagina?.mediaUrl, pagina?.private_token);
            return true;
        }
    }



}











