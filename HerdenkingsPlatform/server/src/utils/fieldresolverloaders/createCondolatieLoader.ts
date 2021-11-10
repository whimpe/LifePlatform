import DataLoader from "dataloader";
import { Condolatie } from "../../entities/Condolatie";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createCondolatieLoader = () => new DataLoader<string, Condolatie>(
    async (condolatieIds) => {
        const condolaties = await  Condolatie.findByIds(condolatieIds as string[]);
        const condolatieIdToCondolatie: Record<string,Condolatie> = {};
        condolaties.forEach((c) => {
            condolatieIdToCondolatie[c.id] = c;
        })
        return condolatieIds.map((condolatieId) => condolatieIdToCondolatie[condolatieId]);
    }
);