import { useRouter } from "next/router";

import { isServer } from "./isServer";




export const useGetStringFromUrl = (field: string) => {
    const router = useRouter();
    if(field === 'public_token'){
      const StringId =
      typeof router.query.public_token === "string"  ? router.query.public_token : "foutje";
      return StringId;
    }
    if(field === 'redis_mollie_payment_id'){
      const StringId =
      typeof router.query.redis_mollie_payment_id === "string"  ? router.query.redis_mollie_payment_id : "foutje";
      return StringId;
    }
 
 
    if(field === 'memory_id'){
      const StringId =
      typeof router.query.memory_id === "string"  ? router.query.memory_id: "foutje";
      return StringId;
    }
    if(field === 'memory_edit_id'){
      const StringId =typeof router.query.memory_id === "string"  ? router.query.memory_id: "foutje";
      return StringId;
    }
    
    

    if(field === 'condolance_id'){
      const StringId =
      typeof router.query.condolance_id === "string"  ? router.query.condolance_id :"foutje";
      return StringId;
    }
    

    if(field === 'herdenkingspagina_id'){
      const StringId =
      typeof router.query.herdenkingspagina_id === "string"  ? router.query.herdenkingspagina_id : "foutje";
      return StringId;
    }

    
    if(field === 'personal_message_id'){
      const StringId =
      typeof router.query.personal_message_id === "string"  ? router.query.personal_message_id : "foutje";
      return StringId;
    }
    return "foutje";

    
    
}