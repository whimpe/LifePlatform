import DataLoader from "dataloader";
import { Media } from "../../entities/Media";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createMediaLoader = () => new DataLoader<string, Media>(
    async (mediaIds) => {
        const mediameervoud = await  Media.findByIds(mediaIds as string[]);
        const mediaIdToMedia: Record<string,Media> = {};
        mediameervoud.forEach((m) => {
            mediaIdToMedia[m.id] = m;
        })
        return mediaIds.map((mediaId) => mediaIdToMedia[mediaId]);
    }
);
