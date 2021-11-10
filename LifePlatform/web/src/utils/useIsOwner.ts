import { useRouter } from "next/router";
import { useEffect } from "react";
import {  useHerdenkingspaginaQuery, useMeQuery } from "../generated/graphql";
import { useGetStringFromUrl } from "./useGetIntFromUrl";

export const useIsOwner = () => {
    const public_token = useGetStringFromUrl("public_token");
    const { data: paginaData , loading: paginal} = useHerdenkingspaginaQuery({
        variables:{
          paginaId: public_token
        }
      });    const { data: meData,  loading: Meloading } = useMeQuery();  
    // we are also using it in the navbar
    // but this is no problem as urql is gong to cache it and therefore we dont make 
    // unnecessary requests
    const router = useRouter();
    useEffect(() => {
        if (!paginal && !Meloading && !(paginaData?.herdenkingspagina?.owner.id === meData?.me?.user?.id)) {  // we are not loading and we dont have a pageId
            router.back();
            
        }  // to make sure after logging in we go back to the create-post page and not to home page
    }, [paginal, paginaData,meData,Meloading, router]);
}