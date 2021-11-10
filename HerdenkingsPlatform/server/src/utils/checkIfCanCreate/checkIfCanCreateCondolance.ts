import { MAX_AMOUNT_OF_CONDOLANCES_BASIC, MAX_AMOUNT_OF_CONDOLANCES_FREE, PAYMENT_PLAN, PAYMENT_STATUS, STATUS } from "../../constants";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";
import { getConnection } from "typeorm";

/**
 * Before a new entity is created this function checks if the object can be added.
 * 
 * @param paginaId pageid 
 * @param objectType   type of object that will be added e.g; Condolance, condolance, new user
 * @param pagina optional, if page is already loaded van be used to reduce needed queries
 */
export const checkIfCanCreateCondolance = async (pagina: HerdenkingsPagina, statusInPayload:number  ) => {


    if(pagina.accessible === false || pagina.Payment_status === PAYMENT_STATUS.Archive){
        throw new Error("Can not access this page while in archive mode ")
    }


    //Status of user needs to be pending or higher
    if(statusInPayload >= STATUS.Pending){
        
        if(pagina.Payment_plan === PAYMENT_PLAN.Free){
            if(pagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_FREE){
                throw new Error("max_condo")
            }
    
        }
        
        if(pagina.Payment_plan === PAYMENT_PLAN.Basic){
            if(pagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_BASIC){
                throw new Error("max_condo")
            }
    
        }

        pagina.number_of_condolances = pagina.number_of_condolances +1;
        await pagina.save();


    }else{
        throw new Error("No permission to create condolance")
    }

    


}

