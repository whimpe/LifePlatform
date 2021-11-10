import {
    Flex,
    Spinner
  } from "@chakra-ui/core";
  import { Tooltip } from "@material-ui/core";
  import { useRouter } from "next/router";
  import React from "react";
  import { AiOutlineEye } from "react-icons/ai";
  import {
    PersonalMessage,
    useMeQuery
  } from "../../generated/graphql";
  import { convert_date_to_string, formatDate_text } from '../../utils/FormatDate';
  import { isServer } from "../../utils/isServer";
  import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
  import { WithApollo } from "../../utils/withApollo";
  import { MediaDisplay } from "../general/MediaDisplay";
  import { CircularProgress } from "@material-ui/core";
  
  interface Demo_StackPersonalMessageElementProps {
    personalmessage: PersonalMessage; //PersonalMessage
    
  }
  
  const Demo_StackPersonalMessageElement: React.FC<Demo_StackPersonalMessageElementProps> = ({
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
            <><div className='personal_message_date' >De datum wanneer het bericht mag geopened worden: {formatDate_text(pm.dateAvailable)}</div></> }
          
            <><div className='personal_message_button' onClick={(event:any) => {router.push(`/VOORBEELD/${public_token}/personal-message/${pm.id}`)}} > < AiOutlineEye className='personal_message_icon_btn' />Bekijk laatste boodschap</div> </>             
           
          
        </div>
        </>
    );
  };
  
  export default WithApollo({ ssr: false })(Demo_StackPersonalMessageElement);
  
  