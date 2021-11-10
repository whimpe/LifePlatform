import React from "react";
import {FaFolderOpen} from "react-icons/fa";
import Icon from '@material-ui/core/Icon'
import { RiCollageLine, RiGroupFill } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { FcMultipleInputs, FcTimeline } from "react-icons/fc";
import { MdContacts } from "react-icons/md";
import { Box } from "@chakra-ui/core";
import JsonData from '../../../assets/static_text.json';


interface MeetFounderProps {
  data: any;
  textleft: boolean;
}

export const MeetFounder: React.FC<MeetFounderProps> = ({data,textleft}) => {
    return (




      <div className="meet_founder_container">
      {textleft ? 
        <>
          <div className="meet_founder_text_container">
               <div className="meet_founder_title_person">{'Ontmoet '} <div className="meet_founder_name_title_person">{data.sub_title}</div></div>
           

              <div className="meet_founder_text"> {data.text}</div>
          </div>

        <div className="meet_founder_img_container">
            <div className="meet_founder_img_box">
                <img src={data.img} className='meet_founder_img' />
                <div className="meet_founder_img_box_text">{data.full_name}</div>            
            </div>
        </div>
        </>

      : 
      
      <>
      <div className="meet_founder_img_container">
        <div className="meet_founder_img_box">
            <img src={data.img} className='meet_founder_img' />
            <div className="meet_founder_img_box_text">{data.full_name}</div>            
        </div>
      </div>

      <div className="meet_founder_text_container">
            <div className="meet_founder_title_person">{'Ontmoet '} <div className="meet_founder_name_title_person">{data.sub_title}</div></div>
            <div className="meet_founder_text">{data.text}</div>
          
          
      </div>

   
    </>}
      



      </div>




    );
  }


export default MeetFounder;
