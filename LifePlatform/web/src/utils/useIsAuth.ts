import { useRouter } from "next/router";
import { useEffect } from "react";
import { EXAMPLE_IDS } from "../constants";
import { useMeQuery, useHerdenkingspaginaQuery } from "../generated/graphql";
import { STATUS } from "../types";
import { isServer } from "./isServer";
import { useGetStringFromUrl } from "./useGetIntFromUrl";



export const useIsAuth = (status_niveau: number, CheckCondolance?:boolean) => {
    const public_token = useGetStringFromUrl("public_token");

    const { data: PaginaData, loading: paginaloading } = useHerdenkingspaginaQuery({ variables:{ paginaId: public_token }, skip: isServer(), });
    const { data: meData, loading: meloading } = useMeQuery({ variables:{ paginaId: public_token, }, skip: isServer(), });
    const router = useRouter();


    useEffect(() => {

        if (!paginaloading && EXAMPLE_IDS.includes(PaginaData!.herdenkingspagina!.id)){
            // router.replace(`/PLATFORM/${public_token}/`);
            return;
        }
        
  

        
        else if (!paginaloading && PaginaData?.herdenkingspagina) {  


            // If shareable is false -> alleen de owner mag zien

            if(PaginaData!.herdenkingspagina!.shareable === false){
                if(PaginaData?.herdenkingspagina?.owner.id !== meData?.me?.user?.id)  {
                    // router.push(`/PLATFORM/${public_token}/`);
                    return;
                }
            }
            //TO DO: gives error for other pages needs check that condolence is requested
            // if condolance_active is false (not active) and the page is a condolance-related page (condolance = true) ->push back to start
            // if(PaginaData!.herdenkingspagina!.condoleance_active === false){
            //     console.log("sdfdsfdsf" ,PaginaData!.herdenkingspagina!.condoleance_active);
            //     if(CheckCondolance ===true)  {
            //         router.push(`/PLATFORM/${public_token}/`);
            //         return;
            //     }
            // }
            // 
            
        }  
     
        // Check status
        else if (!meloading && !paginaloading ) {            
            if (meData?.me?.status! < status_niveau) {
                router.replace(`/PLATFORM/${public_token}/`);
                return;
                
            }
        }

        if (!meloading && !meData?.me) {  // we are not loading and we dont have a user            
                router.replace("/login?next=" + router.asPath);                  
                return;
    
                // router.push(`/PLATFORM/${public_token}/`);
                // console.log('rooter in useEffect', router);
            }  // to make sure after logging in we go back to the create-post page and not to home page
    

        
    }, [meloading, paginaloading, PaginaData, meData, router]);
}




