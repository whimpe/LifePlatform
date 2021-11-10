

/**
 * Checks if the person doing the request has permission to do so
 * Either the person is the creator and can do the action or he has to have the 
 * statusrequired to do the action
 * @param statusInPayload  status of the current user on the current page
 * @param statusRequired status required to do action (if not creator) 
 * @param creatorId  id of user who created the object
 * @param userId Id of the current user
 */
export const checkPermission = (statusInPayload:number | undefined,status: number, creatorId:string, userId: string ) => {

    


    if (!statusInPayload) {
        throw new Error('You have no access to this page');
    }


    //TODO check if permission works
    if(creatorId !== userId){



        if (statusInPayload < status) {
            switch(status){
                case 2:
                    throw new Error("not approved");
                case 3:
                    throw new Error("not part of intimate circle");
                case 4:
                    throw new Error("no administrator rights");
                case 5:
                    throw new Error("not owner of page");
            }
            
        }
    }
    //else => creator id = userId dan mag je doen wat je wil in principe
    
    
}

