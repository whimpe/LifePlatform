
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";
import { getConnection } from "typeorm";
import { PAYMENT_STATUS, Payment_Term } from "../../constants";
import { determineNewValidUntilDate } from "./determineNewValidUntilDate";
import { determinePaymentPrice } from "./determinePaymentPrice";
import { getMollieResponseDetails } from "./getMollieResponseDetails";


const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });



/**
 * 
 * Processes three types of mollie payments based on the paymentId
 *  1) One-time payment
 *  2) First payment of subscription
 *  3) Recurring monthly payments caused by subscription
 * 
 */
export const processMolliePayment = async (payment_id: string): Promise<String> => {


    const response = await getMollieResponseDetails(mollieClient, payment_id);
    console.log("response in fct", response);


    const hpagina = await HerdenkingsPagina.findOne(response.metadata.paginaId);
    if (!hpagina) {
        throw new Error("no valid page found");
    }

    if (response.status === "paid") {
        //Bij de eerste betaling van een subscriptie moet de subscriptie opgestart worden
        if (response.sequenceType === "first") {

            const price = await determinePaymentPrice(response.metadata.payment_plan, response.metadata.payment_term);


            try {

                const subscription = await mollieClient.customers_subscriptions.create({
                    customerId: response.customerId,
                    mandateId: response.mandateId,
                    amount: {
                        currency: 'EUR',
                        value: price,
                    },
                    interval: '1 month',
                    description: `monthly payment subscription of page with pageId: ${response.metadata.paginaId}`,
                    webhookUrl: process.env.WEBHOOK_URL_MOLLIE,
                    metadata: {
                        paginaId: response.metadata.paginaId,
                        payment_plan: response.metadata.payment_plan,
                        payment_term: Payment_Term.Recurring
                    }
                });


            } catch (error) {
                console.log("error in subs create ", error)
                throw new Error("Error when trying to create subscription")
            }


        }


        const newValidUntil = await determineNewValidUntilDate(hpagina, response.metadata.payment_term);


        const responsebuilder = await getConnection()
            .createQueryBuilder()
            .update(HerdenkingsPagina)
            .set({ ValidUntil: newValidUntil, Payment_plan: response.metadata.payment_plan, Payment_status: PAYMENT_STATUS.Valid, shareable: true })
            .where('id =:paginadId',
                { paginadId: response.metadata.paginaId })
            .returning("*")
            .execute();

        console.log("responsebuilder", responsebuilder);

    }



    return response.status;


};

