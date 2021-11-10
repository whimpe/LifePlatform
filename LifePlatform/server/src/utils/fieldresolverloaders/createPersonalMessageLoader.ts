import DataLoader from "dataloader";
import {   PersonalMessage } from "../../entities/PersonalMessage";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createPersonalMessageLoader = () => new DataLoader<string, PersonalMessage>(
    async (pmessageIds) => {
        const pmessages = await  PersonalMessage.findByIds(pmessageIds as string[]);
        const pmessageIdToPmess: Record<string,PersonalMessage> = {};
        pmessages.forEach((pm) => {
            pmessageIdToPmess[pm.id] = pm;
        })
        return pmessageIds.map((pmmessId) => pmessageIdToPmess[pmmessId]);
    }
);