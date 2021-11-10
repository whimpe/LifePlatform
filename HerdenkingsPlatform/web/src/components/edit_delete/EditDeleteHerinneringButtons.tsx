import {
  Flex
} from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import {
  useChangeMemoryOnTimelineStateMutation, useHerdenkingspaginaQuery,
  useMeQuery
} from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import AddMedia from "../modal_components/AddMedia";





interface EditDeleteHerinneringButtonsProps {
  id: string;
  creatorId: string;
}

export const EditDeleteHerinneringButtons: React.FC<EditDeleteHerinneringButtonsProps> = ({
  id: id,
  creatorId: creatorId,
}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();

  const [changeTimelineValue] = useChangeMemoryOnTimelineStateMutation();
 

  const { data: meData, loading: meloading } = useMeQuery({ variables: { paginaId: public_token }, });
  const { data: paginaData, loading: paginal } = useHerdenkingspaginaQuery({ variables: { paginaId: public_token }, });


  const [AddMediaClick, setAddMediaClick] = useState(false);



  

  if (meloading || paginal) {
    return (<div><Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex></div>);
  }

  if (!meData?.me?.user?.id) {
    return <div>no owner id</div>;
  }
  if (!meData?.me?.status) {
    return <div>no status?</div>;
  }


 

  return (
    <>


    
    <div className="sticky_btn_container">
        <div className='sticky_droplet_btn'onClick={(e:any)=>{setAddMediaClick(true)}}>
          <HiOutlinePhotograph className='sticky_droplet_btn_icon' /> <div className="sticky_droplet_btn_text" >VOEG JOUW MEDIA TOE</div> 
        </div>
      </div>
     
      {meData?.me?.status >= 3 || meData?.me?.user.id === creatorId ?
      <div className="sticky_btn_container">
        <div className='sticky_edit_droplet_btn' onClick={(e:any)=>{router.push(`/PLATFORM/${public_token}/memory/edit/${id}`)}}>
          <AiOutlineEdit className='sticky_droplet_edit_btn_icon' /><div className="sticky_edit_droplet_btn_text" >WIJZIG HERINNERING</div> 
        </div>
      </div>
     : null}



     {AddMediaClick ? 
        <>
          <div id="myModal" className="modal">
          <div className="modal_content_memory">
            {/* <span className="close"  onClick={() => {setmodalClick(false);}} >&times;</span> */}
            <div className="close_button" onClick={(e:any) => {setAddMediaClick(false)}}>
                    <IoCloseOutline className="close_button_icon"  />
            </div>
                <AddMedia  herinnering_id={id}/>
           </div>

        </div>       
        </>       
     :null}

    </>

  );
};
