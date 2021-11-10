import { useRouter } from "next/router";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import {
  PersonalMessage
} from "../../generated/graphql";
import { convert_date_to_string } from '../../utils/FormatDate';
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";
  
  interface StackPersonalMessage_DEMO_ElementProps {
    personalmessage: PersonalMessage; //PersonalMessage
    
  }
  
  const StackPersonalMessage_DEMO_Element: React.FC<StackPersonalMessage_DEMO_ElementProps> = ({
    personalmessage: pm,
   
  }) => {
  
    const public_token = useGetStringFromUrl("public_token");
    const router = useRouter();

 
  
    return (
      <>
      
        <div key={pm.id} className='stackgrid_personal_message_box' >   
        {!pm.media[0] ? null : (
            <MediaDisplay awsUrl={pm.media[pm.media.length-1].urlFile} width={'100%'} type={pm.media[pm.media.length-1].mediaType}  />
        )}   
      
          <div className='stackgrid_personal_message_title'> {pm.title} </div>          
            {!pm.dateAvailable ? null: 
            
            <><div className='personal_message_date' >De datum wanneer het bericht mag geopened worden: {convert_date_to_string(pm.dateAvailable)}</div></> }
          
            <><div className='personal_message_button' onClick={(event:any) => {router.push(`/VOORBEELD/${public_token}/personal-message/${pm.id}`)}} > < AiOutlineEye className='personal_message_icon_btn' />Bekijk laatste boodschap</div> </>             
           
          
        </div>
        </>
    );
  };
  
  export default WithApollo({ ssr: false })(StackPersonalMessage_DEMO_Element);
  
  