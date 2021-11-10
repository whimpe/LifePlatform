import { MAX_AMOUNT_OF_BYTES_BASIC, MAX_AMOUNT_OF_BYTES_FREE, MAX_AMOUNT_OF_MEDIA_BASIC, MAX_AMOUNT_OF_MEDIA_FREE, PAYMENT_PLAN, PAYMENT_STATUS, STATUS } from "../../constants";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";

/**
 * Before a new entity is created this function checks if the object can be added.
 * 
 * @param paginaId pageid 
 * @param objectType   type of object that will be added e.g; AccessRequest,  
 * @param pagina optional, if page is already loaded van be used to reduce needed queries
 */
export const checkIfCanCreateMedia = async (pagina: HerdenkingsPagina, statusInPayload: number, objectSize: number) => {


    if (pagina.accessible === false || pagina.Payment_status === PAYMENT_STATUS.Archive) {
        throw new Error("Can not access this page while in archive mode ")
    }
   console.log("objectSize :",objectSize);

    //Status of user needs to be pending or higher
    //TODO: bij aantal mb kan je er over gaan als het laatste object toevallig heel grooyt is (=/= discreet <-> aantal media, etc..)
    if (statusInPayload >= STATUS.Pending) {

        if (pagina.Payment_plan === PAYMENT_PLAN.Free) {
            if ( pagina.number_of_bytes >= MAX_AMOUNT_OF_BYTES_FREE) {    //
                throw new Error("max_media")
            } 

        }
        if (pagina.Payment_plan === PAYMENT_PLAN.Basic) {
            if ( pagina.number_of_bytes >= MAX_AMOUNT_OF_BYTES_BASIC ) {    //pagina.number_of_media >= MAX_AMOUNT_OF_MEDIA_BASIC || 
                throw new Error("max_media")
            } 



        }

        pagina.number_of_media = pagina.number_of_media + 1;
        pagina.number_of_bytes = pagina.number_of_bytes + objectSize;
        await pagina.save();




    }





}
