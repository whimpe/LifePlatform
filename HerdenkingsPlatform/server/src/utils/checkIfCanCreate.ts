
import { MAX_AMOUNT_OF_CONDOLANCES_BASIC, MAX_AMOUNT_OF_CONDOLANCES_FREE, MAX_AMOUNT_OF_MEMORIES_BASIC, MAX_AMOUNT_OF_MEMORIES_FREE, MAX_AMOUNT_OF_MESSAGES_BASIC, MAX_AMOUNT_OF_MESSAGES_FREE, MAX_AMOUNT_OF_PEOPLE_BASIC, MAX_AMOUNT_OF_PEOPLE_FREE, MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC, MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE, PAYMENT_PLAN, PAYMENT_STATUS, STATUS } from "../constants";
import { getConnection } from "typeorm";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";




/**
 * Before a new entity is created this function checks if the object can be added.
 * 
 * @param paginaId pageid 
 * @param objectType   type of object that will be added e.g; memory, condolance, new user
 * @param pagina optional, if page is already loaded van be used to reduce needed queries
 */
export const checkIfCanCreate = async (paginaId: string, objectType: string, statusInPayload:number,pagina: HerdenkingsPagina | undefined ) => {


    if(!pagina){
        pagina = await HerdenkingsPagina.findOne(paginaId);

        if(!pagina){
            throw new Error("Could not find page")
        }

    }

    if(pagina.accessible === false || pagina.Payment_status === PAYMENT_STATUS.Archive){
        throw new Error("Can not access this page while in archive mode ")
    }


    

    //---------------------------------------------------------------------------
    //Herinnering

    if(statusInPayload < STATUS.Pending){
        
        if(objectType === "herinnering" && pagina.Payment_plan <= PAYMENT_PLAN.Free){
            if(pagina.number_of_memories >= MAX_AMOUNT_OF_MEMORIES_FREE){
                throw new Error("Je hebt al het maximum aantal herinneringen, schakel over naar basic")
            }else{
                await getConnection().createQueryBuilder()
                .update(HerdenkingsPagina)
                .where({ id: paginaId })
                .set({ number_of_memories: () => "number_of_memories + 1" })
                .execute();
            }
            
    
        }
        if(objectType === "herinnering" && pagina.Payment_plan === PAYMENT_PLAN.Basic){
            if(pagina.number_of_memories >= MAX_AMOUNT_OF_MEMORIES_BASIC){
                throw new Error("Je hebt al het maximum aantal herinneringen, schakel over naar premium")
            }else{
                await getConnection().createQueryBuilder()
                .update(HerdenkingsPagina)
                .where({ id: paginaId })
                .set({ number_of_memories: () => "number_of_memories + 1" })
                .execute();
            }
            
    
        }
    }else{
        throw new Error("No permission to create memory")
    }

    




    //---------------------------------------------------------------------------
    //Condolaties
    if(objectType === "condolatie" && pagina.Payment_plan <= PAYMENT_PLAN.Free){
        if(pagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_FREE){
            throw new Error("Je hebt al het maximum aantal condolaties, schakel over naar basic")
        }else{
            await getConnection().createQueryBuilder()
        .update(HerdenkingsPagina)
        .where({ id: paginaId })
        .set({ number_of_condolances: () => "number_of_condolances + 1" })
        .execute();
        }
        
    }
    if(objectType === "condolatie" && pagina.Payment_plan === PAYMENT_PLAN.Basic){
        if(pagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_BASIC){
            throw new Error("Je hebt al het maximum aantal condolaties, schakel over naar premium")
        } else{
            await getConnection().createQueryBuilder()
        .update(HerdenkingsPagina)
        .where({ id: paginaId })
        .set({ number_of_condolances: () => "number_of_condolances + 1" })
        .execute();
        }
    }



    //---------------------------------------------------------------------------
    //mESSAGES
    if(objectType === "message" && pagina.Payment_plan <= PAYMENT_PLAN.Free){
        if(pagina.number_of_messages >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE){
            throw new Error("Je hebt al het maximum aantal persoonlijke boodschappen, schakel over naar basic")
        }else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_messages: () => "number_of_messages + 1" })
            .execute();
        }
        
    }
    if(objectType === "message" && pagina.Payment_plan === PAYMENT_PLAN.Basic){
        if(pagina.number_of_messages >= MAX_AMOUNT_OF_MESSAGES_BASIC){
            throw new Error("Je hebt al het maximum aantal persoonlijke boodschappen, schakel over naar premium")
        }else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_messages: () => "number_of_messages + 1" })
            .execute();
        }
    }




    //---------------------------------------------------------------------------
    //Persoonlijke boodschappen
    if(objectType === "persoonlijkeboodschap" && pagina.Payment_plan <= PAYMENT_PLAN.Free){
        if(pagina.number_of_personal_messages >= MAX_AMOUNT_OF_MESSAGES_FREE){
            throw new Error("Je hebt al het maximum aantal persoonlijke boodschappen, schakel over naar basic")
        }else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_personal_messages: () => "number_of_personal_messages + 1" })
            .execute();
        }
        
    }
    if(objectType === "persoonlijkeboodschap" && pagina.Payment_plan === PAYMENT_PLAN.Basic){
        if(pagina.number_of_personal_messages >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC){
            throw new Error("Je hebt al het maximum aantal persoonlijke boodschappen, schakel over naar premium")
        }else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_personal_messages: () => "number_of_personal_messages + 1" })
            .execute();
        }
    }


    //---------------------------------------------------------------------------
    //acessreqests
    if(objectType === "accessrequest" && pagina.Payment_plan <= PAYMENT_PLAN.Free){
        if(pagina.number_of_people >= MAX_AMOUNT_OF_PEOPLE_FREE){
            throw new Error("Je hebt al het maximum aantal personen op je pagina, schakel over naar basic")
        }else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_people: () => "number_of_people + 1" })
            .execute();
        }
        
    }
    if(objectType === "accessrequest" && pagina.Payment_plan === PAYMENT_PLAN.Basic){
        if(pagina.number_of_people >= MAX_AMOUNT_OF_PEOPLE_BASIC){
            throw new Error("Je hebt al het maximum aantal personen op je pagina, schakel over naar premium")
        }
        else{
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_people: () => "number_of_people + 1" })
            .execute();
        }
    }

    //TODO: media check
}

