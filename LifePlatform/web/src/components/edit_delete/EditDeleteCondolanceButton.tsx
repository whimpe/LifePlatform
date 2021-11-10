import { Box, Button, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import {
  useDeleteCondolatieMutation,
  useHerdenkingspaginaQuery,
  useMeQuery,
  useUpdateCondolatieMutation,
} from "../../generated/graphql";
import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { AiOutlineCheck } from "react-icons/ai";

interface EditDeleteCondolanceButtonsProps {
  id: string;
  creatorId: string;
  setEditmode:any;
  Editmode:any;
  upgrade_condolence:any;
}

export const EditDeleteCondolanceButtons: React.FC<EditDeleteCondolanceButtonsProps> = ({id,creatorId,setEditmode,Editmode,upgrade_condolence}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const [deleteCondolance,] = useDeleteCondolatieMutation();  
  const { data: meData } = useMeQuery();
  
  const { data: paginaData , loading: paginal} = useHerdenkingspaginaQuery({
    variables:{
      paginaId: public_token
    }
  });

  if(!paginaData?.herdenkingspagina?.owner?.id){
    return(<div>no owner id?</div>)
  }
  if(!meData?.me?.user?.id){
    return(<div>no user id?</div>)
  }

// delete and edit functions 
const delete_condolence = (event:any) => {

  deleteCondolance({
    variables: { id:id, paginaId: public_token },
    update: (cache) => {
      cache.evict({ id: "Condolatie:" + id });
    },
  });
  router.push(`/PLATFORM/${public_token}/condolances`)
}


const edit_condolence = (event:any) => {
  router.push(`/PLATFORM/${public_token}/condolance/edit/${id}`);
}

console.log(id)

// IS THE CREATOR
  if (meData?.me?.user.id === creatorId || paginaData?.herdenkingspagina?.owner?.id === meData?.me?.user.id) {
    return (
      <div className='edit_condo_container'>    
       {Editmode ? <button className='remove_condo_btn'   onClick={(event:any) => {upgrade_condolence(event,id)}}> <AiOutlineCheck className='edit_icon_btn' /> condolatie opslaan </button>
       : <button className='remove_condo_btn'   onClick={(event:any) => {setEditmode(true)}}> < FiEdit className='edit_icon_btn' /> Wijzigen </button>}

        <button className='remove_condo_btn'   onClick={(event:any) => {delete_condolence(event)}}> < BsTrashFill className='edit_icon_btn' /> Verwijder Condolatie</button>
     </div>
      );
  }else{
    return (<></>)
  }
  

};
