import React from "react";
import {FaFolderOpen} from "react-icons/fa";
import Icon from '@material-ui/core/Icon'
import { RiCollageLine, RiGroupFill } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { FcMultipleInputs, FcTimeline } from "react-icons/fc";
import { MdContacts } from "react-icons/md";
import { Box } from "@chakra-ui/core";
import JsonData from '../../../assets/static_text.json';
import { MediaDisplay } from "../general/MediaDisplay";
import { useRouter } from "next/router";


interface FeaturesProps {
  data: any;
  textleft: boolean;
}

export const Features: React.FC<FeaturesProps> = ({data,textleft}) => {
  const router = useRouter();
  
  
    return (
      <div className="feature_container">
      {textleft ? 
        <>
          <div className="feature_text_container">
        
              <div className="feature_title_container">
              <div className="feature_title">{data.main_title}</div>
              <div className="feature_subtitle">{data.sub_title}</div>

              <div className="feature_text"> {data.text}</div>
              {data.button ? <div className="feature_btn" onClick={()=>router.push(`${data.button_link}`)} >{data.button}</div> :null}
              </div>

          </div>

          <div className="feature_img_container">
              {data.type==='img' ? 
              <img src={data.img} className='feature_img' />
              :
                <video autoPlay muted loop id="feature_video">
                     <source src={data.img} type="video/mp4" />
                   Your browser does not support HTML5 video.
                </video>  
              }          
          </div>
        </>

      : 
      
      <>

      <div className="feature_img_container">
            {data.type==='img' ? 
              <img src={data.img} className='feature_img' />
            :
            <video autoPlay muted loop id="feature_video">
            <source src={data.img} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>   
            }
      </div>

      <div className="feature_text_container">
     
          
          <div className="feature_title_container">
            <div className="feature_title">{data.main_title}</div>
            <div className="feature_subtitle">{data.sub_title}</div>
            <div className="feature_text">{data.text}</div>
            {data.button ? <div className="feature_btn" onClick={()=>router.push(`${data.button_link}`)}>{data.button}</div> :null}
          </div>
 
          
          
      </div>

   
    </>}
      



      </div>




    );
  }


export default Features;
