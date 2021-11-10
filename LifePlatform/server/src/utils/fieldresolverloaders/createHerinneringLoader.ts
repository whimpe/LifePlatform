import DataLoader from "dataloader";
import { Herinnering } from "../../entities/Herinnering";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createHerinneringLoader = () => new DataLoader<string, Herinnering>(
    async (herinneringIds) => {
        const herinneringen = await  Herinnering.findByIds(herinneringIds as string[]);
        const herinneringIdToHerinnering: Record<string,Herinnering> = {};
        herinneringen.forEach((h) => {
            herinneringIdToHerinnering[h.id] = h;
        })
        return herinneringIds.map((herinneringId) => herinneringIdToHerinnering[herinneringId]);
    }
);