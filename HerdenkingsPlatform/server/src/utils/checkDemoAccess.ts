

/**
 * Checks if the person doing the request has permission to do so
 * Either the person is the creator and can do the action or he has to have the 
 * statusrequired to do the action
 * @param statusInPayload  status of the current user on the current page
 * @param statusRequired status required to do action (if not creator) 
 * @param creatorId  id of user who created the object
 * @param userId Id of the current user
 */
 export const checkDemoAccess = (paginaId: string) => {

    //TODO: vul aan met alle demopaginas -> jan himpens = d32b99a9-3583-4f61-a04f-dd6d5ffab20b
    if((paginaId !== "d32b99a9-3583-4f61-a04f-dd6d5ffab20b") 
         && (paginaId !== "169f485d-a542-47ac-87b1-1d9bd5be569e") 
         &&(paginaId !== "51fc5f66-87ab-41f4-b24b-6c0eb06ae33f") 
         &&(paginaId !== "6c375ba9-1188-4253-8a46-afe5825d1d8e")
         ){  //local env himpe
        throw new Error("Can not execute function for current page");
    }
   
    
    
}

