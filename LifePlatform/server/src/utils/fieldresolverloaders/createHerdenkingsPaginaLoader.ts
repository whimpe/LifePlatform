import DataLoader from "dataloader";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createHerdenkingsPaginaLoader = () => new DataLoader<string, HerdenkingsPagina>(
    async (hpIds) => {
        const hpaginas = await  HerdenkingsPagina.findByIds(hpIds as string[]);
        const hpgainiToHpaginaId: Record<string,HerdenkingsPagina> = {};
        hpaginas.forEach((h) => {
            hpgainiToHpaginaId[h.id] =h;
        })
        return hpIds.map((herdenkingspaginaId) => hpgainiToHpaginaId[herdenkingspaginaId]);
    }
);