import {
  Flex
} from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useHerdenkingspaginaQuery } from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import AddMedia from "./Demo_Modals/Demo_AddMedia";
  
  
  
  
  interface Demo_EditDeleteHerinneringButtonsProps {
    // moet eigenlijk gewoon herinnering zelf zijn
    id: string;
    creatorId: string;
  }
  
  export const Demo_EditDeleteHerinneringButtons: React.FC<Demo_EditDeleteHerinneringButtonsProps> = ({
    id: id,
    creatorId: creatorId,
  }) => {
    const public_token = useGetStringFromUrl("public_token");
    
   

    const { data: paginaData, loading: paginal } = useHerdenkingspaginaQuery({
      variables: { paginaId: public_token },
    });
  
  
    const [AddMediaClick, setAddMediaClick] = useState(false);
  
  
  
    
  
    if (paginal) {
      return (<div><Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex></div>);
    }
  

  
   
  
    return (
      <>
      <div className="sticky_btn_container">
          <div className='sticky_droplet_btn'onClick={(e:any)=>{setAddMediaClick(true)}}>
            <HiOutlinePhotograph className='sticky_droplet_btn_icon' /> <div className="sticky_droplet_btn_text" >VOEG JOUW MEDIA TOE</div> 
          </div>
        </div>
       
        <div className="sticky_btn_container">
          <div className='sticky_edit_droplet_btn' onClick={(e:any)=>{alert('Dit is een voorbeeld levensverhaal, je kan geen herinneringen wijzigen')}}>
            <AiOutlineEdit className='sticky_droplet_edit_btn_icon' /><div className="sticky_edit_droplet_btn_text" >WIJZIG HERINNERING</div> 
          </div>
        </div>
  
  
  
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
  