import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { STATUS } from "../types";
import { isServer } from "./isServer";

export const useIsAdmin = () => {
    
      const {data: meData, loading: meloading} = useMeQuery({
        skip: isServer(),
       
      });

 
    const router = useRouter();
    

      useEffect(() => {

        if (!meloading && !(meData?.me?.user?.id === "8a72758f-46f4-4f2f-8a78-edbf4999f391")) {  // we are not loading and we dont have a user
          router.push("/account");
        }  
    }, [meloading,meData]);
    

    
}