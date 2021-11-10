import { MAX_AMOUNT_OF_PEOPLE_BASIC, MAX_AMOUNT_OF_PEOPLE_FREE, PAYMENT_PLAN, PAYMENT_STATUS, STATUS } from "../../constants";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";

/**
 * Before a new entity is created this function checks if the object can be added.
 * 
 * @param paginaId pageid 
 * @param objectType   type of object that will be added e.g; AccessRequest,  
 * @param pagina optional, if page is already loaded van be used to reduce needed queries
 */
export const checkIfCanCreateAccessRequest = async (pagina: HerdenkingsPagina, statusInPayload:number  ) => {


    if(pagina.accessible === false || pagina.Payment_status === PAYMENT_STATUS.Archive){
        throw new Error("Can not access this page while in archive mode ")
    }


        
        if(pagina.Payment_plan === PAYMENT_PLAN.Free){
            if(pagina.number_of_people >= MAX_AMOUNT_OF_PEOPLE_FREE){
                throw new Error("Je hebt al het maximum aantal mensen op je pagina, schakel over naar basic")
            }
            
    
        }
        if(pagina.Payment_plan === PAYMENT_PLAN.Basic){
            if(pagina.number_of_people >= MAX_AMOUNT_OF_PEOPLE_BASIC){
                throw new Error("Je hebt al het maximum aantal mensen op je pagina, schakel over naar premium")
            }
    
        }

        pagina.number_of_people = pagina.number_of_people +1;
        await pagina.save();
   

    


}

