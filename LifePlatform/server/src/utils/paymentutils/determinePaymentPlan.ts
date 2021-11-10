import { PAYMENT_PLAN } from "../../constants"
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";

/**
 * determines which payment plan can be used for this page
 * ->  checks certain requirements
 */
export const determinePaymentPlan = async (requested_payment_plan: PAYMENT_PLAN, public_token: string): Promise<PAYMENT_PLAN> => {


    const hpagina = await HerdenkingsPagina.findOne({
        where: {
            id: public_token
        }
    })

    if (!hpagina) {
        throw new Error("HerdenkingsPagina niet gevonden!")
    }


    if(requested_payment_plan === PAYMENT_PLAN.Free){
        throw new Error("wrong payment details: requested plan can't be free ");
    }


    //Current plan of page is Free -> can either be premium or basic
    if(hpagina.Payment_plan === PAYMENT_PLAN.Free){
        if(requested_payment_plan === PAYMENT_PLAN.Basic ){
            return(PAYMENT_PLAN.Basic)
        }else if(requested_payment_plan === PAYMENT_PLAN.Premium ){
            return(PAYMENT_PLAN.Premium)
        }else if(requested_payment_plan === PAYMENT_PLAN.Funeral ){
            return(PAYMENT_PLAN.Funeral)
        }else{
            throw new Error("wrong payment details: requested plan does not exist");
        }

    //If current plan is not free, can only (for now) renew the same type of plan
    }else if(hpagina.Payment_plan === PAYMENT_PLAN.Basic && requested_payment_plan === PAYMENT_PLAN.Basic){
        return(PAYMENT_PLAN.Basic)
    }else if(hpagina.Payment_plan === PAYMENT_PLAN.Premium  && requested_payment_plan === PAYMENT_PLAN.Premium){
        return(PAYMENT_PLAN.Premium)
    }else if(hpagina.Payment_plan === PAYMENT_PLAN.Funeral  && requested_payment_plan === PAYMENT_PLAN.Funeral){
        return(PAYMENT_PLAN.Funeral)
    }else{
        throw new Error("wrong payment details: requested plan does not match existing plan")
    }


    
}