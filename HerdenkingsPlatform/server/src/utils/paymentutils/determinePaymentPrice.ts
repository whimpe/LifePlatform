import { PAYMENT_BASIC_PLAN, PAYMENT_FUNERAL_PLAN, PAYMENT_PLAN, PAYMENT_PREMIUM_PLAN, Payment_Term } from "../../constants"


/**
 * calculates the price for payment
 * ->  checks certain requirements
 */
export const determinePaymentPrice = async (paymentplan: PAYMENT_PLAN, payment_term: Payment_Term): Promise<String> => {

    let price;
    let today = new Date();
    let last_early_bird_discount_date = new Date(2021,7,14);

    
    if(paymentplan === PAYMENT_PLAN.Basic){
        price = PAYMENT_BASIC_PLAN[payment_term].toFixed(2).toString();
        return price;
    }

    else if(paymentplan === PAYMENT_PLAN.Premium){
        price = PAYMENT_PREMIUM_PLAN[payment_term]
        

        //TODO: delete if not relevant (= no more early bird promotions)
        //Zolang het geen datum is doe prijs gedeeld door 2
        // ->  
        if(today < last_early_bird_discount_date){
            price = price/2;
        }

        price = price.toFixed(2).toString();

        return price;
    }

    else if(paymentplan === PAYMENT_PLAN.Funeral){
        price = PAYMENT_FUNERAL_PLAN[payment_term]
        

        //TODO: delete if not relevant (= no more early bird promotions)
        //Zolang het geen datum is doe prijs gedeeld door 2
        // ->  
        if(today < last_early_bird_discount_date){
            price = price/2;
        }

        price = price.toFixed(2).toString();

        return price;
    }
    else{
        throw new Error("Wrong payment details: price")
    }
    




    
}