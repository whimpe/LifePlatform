import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";

export function canInsert(object_type: string): MiddlewareFn<MyContext> {

    return async ({ context, args }, next) => {

        const pagina = await HerdenkingsPagina.findOne({
            where: {
                id: args.paginaId
            }
        });
        if (!pagina) {
            throw new Error("page not found");

        }

        if(pagina.payment_type === "premium"){

            if(new Date(pagina.ValidUntil) >= new Date()){
                return next();
            }else{
                throw new Error("NO MORE CREDIT");
            }
        }

        else if(pagina.payment_type === "basic"){

            if(new Date(pagina.ValidUntil) >= new Date()){
                return next();
            }else{
                throw new Error("NO MORE CREDIT");
            }
        }
        // (basic ook limieten?)


        else if(pagina.payment_type === "free"){

            if(object_type === "condolatie"){
                throw new Error("cant't add condolances on free account");
            }
            else if(object_type === "herinnering"){
                if(pagina.number_of_memories > 10){
                    throw new Error("cant't have more than 10 memories on free account ");
                }else if(context.payload!.statusList[args.paginaId] !== 5){
                    console.log(context.payload!.statusList[args.paginaId]);
                    throw new Error("only owner of page can add memories");
                }else{
                    return next();
                }
                
            }
            

            else if(object_type === "personal_message"){
                if(pagina.number_of_personal_messages >3 ){
                    throw new Error("cant't have more than 3 personal messages on free account");
                }else if(context.payload!.statusList[args.paginaId] > 5){
                    throw new Error("only owner of page can add memories");
                }else{
                    return next();
                }
                
            }
        }


    }
};