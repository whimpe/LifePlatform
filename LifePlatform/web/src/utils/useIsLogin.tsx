import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "./isServer";

export const useIsLogin = () => {
    
      const {data: meData, loading: meloading} = useMeQuery({
        skip: isServer(),
       
      });

      

 
    const router = useRouter();
    

      useEffect(() => {

        if (!meloading && !meData?.me) {  // we are not loading and we dont have a user
          router.replace("/login?next=" + router.asPath);
        }  // to make sure after logging in we go back to the create-post page and not to home page
        
    }, [meloading,meData]);
    

    
}