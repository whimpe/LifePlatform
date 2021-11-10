import { useRouter } from "next/router";
import { useEffect } from "react";
import { PARTNER_TYPE } from "../constants";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const useIsPartner = () => {
    
      const {data: meData, loading: meloading} = useMeQuery({
        skip: isServer(),
       
      });
 
    const router = useRouter();
    

      useEffect(() => {

        if (!meloading && !(meData?.me?.partner_type === PARTNER_TYPE.FUNERAL_UNDERTAKER)) {  // we are not loading and we dont have a user
          router.push("/account");
        }  // to make sure after logging in we go back to the create-post page and not to home page
        
    }, [meloading,meData]);
    

    
}