import { useRouter } from "next/router";
import { useEffect } from "react";
import {  useHerdenkingspaginaQuery } from "../generated/graphql";
import { useGetStringFromUrl } from "./useGetIntFromUrl";

export const useHasAccess = () => {
    // const { data,  loading } = usePaginaNaamQuery();  
    const public_token = useGetStringFromUrl("public_token");
    const { data: paginaData , loading: paginal} = useHerdenkingspaginaQuery({
        variables:{
          paginaId: public_token
        }
      });
    // we are also using it in the navbar
    // but this is no problem as urql is gong to cache it and therefore we dont make 
    // unnecessary requests
    const router = useRouter();
    // console.log('rooter in hasAccess', router);
    useEffect(() => {
        if (!paginal && paginaData?.herdenkingspagina?.name_of_page) {  // we are not loading and we dont have a pageId
            router.back();
            
            // console.log('rooter in useEffect', router);
        }  // to make sure after logging in we go back to the create-post page and not to home page
    }, [paginal, paginaData, router]);
}