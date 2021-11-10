import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";



export const accessibleOrShareable: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    let id;
    let pagina;

    if(args.paginaId){
        id=args.paginaId;
        pagina = await HerdenkingsPagina.findOne({
            where: {
                id: id
            }
        });
    }else{
        id=args.public_or_private_token;  
        pagina = await HerdenkingsPagina.findOne({
            where: {
                id: id
            }
        });
        if(!pagina){
            pagina = await HerdenkingsPagina.findOne({
                where: {
                    private_token: id
                }
            });
            if(!pagina){
                throw new Error("page not found");
            }
        }
        
    }
  
   
    if (!pagina) {
        throw new Error("page not found");

    }

    if(pagina.accessible === false){
        throw new Error("page is not accessible, add credit or transfer back from archive storage");
    }
    if(pagina.shareable === false){
        if(pagina.ownerId !== context.payload!.userId){
            throw new Error("only owner can access page");
        }
        
    }

    return next();


  }