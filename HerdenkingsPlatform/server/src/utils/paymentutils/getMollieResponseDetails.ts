


export const getMollieResponseDetails = async (mollieClient:any,payment_id: string) : Promise<any> => {


    let response = await mollieClient.payments.get(payment_id);


    //Het is waarschijnlijk een maandelijkse betaling dus beter die data ophalen en de subscriptie retourneren ipv de payment
    if(!response.metadata){

        //
        if(!response.subscriptionId || !response.customerId ){
            throw new Error("Can't get payment details")
        }

        const subscription = await mollieClient.customers_subscriptions.get(response.subscriptionId, { customerId: response.customerId }); 

        if(!subscription.metadata){
            throw new Error("Can't get payment details")
        }else{
            response = subscription;
        }

    }
      
    return response;


        

}