import { MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC, MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE, PAYMENT_PLAN, PAYMENT_STATUS, STATUS } from "../../constants";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";

/**
 * Before a new entity is created this function checks if the object can be added.
 * 
 * @param paginaId pageid 
 * @param objectType   type of object that will be added e.g; memory, condolance, new user
 * @param pagina optional, if page is already loaded van be used to reduce needed queries
 */
export const checkIfCanCreatePersonalMessage = async (pagina: HerdenkingsPagina, statusInPayload:number  ) => {


    if(pagina.accessible === false || pagina.Payment_status === PAYMENT_STATUS.Archive){
        throw new Error("Can not access this page while in archive mode ")
    }

    //Status of user needs to be pending or higher
    if(statusInPayload >= STATUS.CoOwner){
        
        if(pagina.Payment_plan === PAYMENT_PLAN.Free){
            if(pagina.number_of_personal_messages >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE){
                throw new Error("max_personal_messages")
            }
    
        }
        if(pagina.Payment_plan === PAYMENT_PLAN.Basic){
            if(pagina.number_of_personal_messages >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC){
                throw new Error("max_personal_messages")
            }
    
        }

        pagina.number_of_personal_messages = pagina.number_of_personal_messages +1;
        await pagina.save();

    }else{
        throw new Error("No permission to create personal Message")
    }

    


}

