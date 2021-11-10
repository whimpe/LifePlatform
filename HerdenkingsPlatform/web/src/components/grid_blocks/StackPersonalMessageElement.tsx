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
import { convert_date_to_string } from '../../utils/FormatDate';
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";
import { CircularProgress } from "@material-ui/core";

interface StackPersonalMessageElementProps {
  personalmessage: PersonalMessage; //PersonalMessage
  
}

const StackPersonalMessageElement: React.FC<StackPersonalMessageElementProps> = ({
  personalmessage: pm,
 
}) => {

  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const { data: meData, loading: meloading } = useMeQuery({
    variables:{
      paginaId: public_token
    },
    skip: isServer(),    
  });

  if (meloading) {
    return  (<div><Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex></div>);
  }

  if (!meData?.me?.status) {
    return <div>no data found</div>;
  }


  var can_see = (new Date(pm?.dateAvailable as string) <= new Date())

  return (
    <>
    
      <div key={pm.id} className='stackgrid_personal_message_box' >   
      {!pm.media[0] ? null : (
          <MediaDisplay awsUrl={pm.media[pm.media.length-1].urlFile} width={'100%'} type={pm.media[pm.media.length-1].mediaType}  />
      )}   
    
        <div className='stackgrid_personal_message_title'> {pm.title} </div>          
          {!pm.dateAvailable ? null: 
          
          <><div className='personal_message_date' >De datum wanneer het bericht mag geopened worden: {convert_date_to_string(pm.dateAvailable)}</div></> }
        
          {can_see ? 
          <><div className='personal_message_button' onClick={(event:any) => {router.push(`/PLATFORM/${public_token}/personal-message/${pm.id}`)}} > < AiOutlineEye className='personal_message_icon_btn' />Bekijk laatste boodschap</div> </>             
          :
          <><Tooltip title={`De boodschap kan pas gelezen worden vanaf ${convert_date_to_string(pm.dateAvailable)}`} placement="top"> 
          <div className='personal_message_button_noview' > < AiOutlineEye className='personal_message_icon_btn' />Bekijk laatste boodschap</div> 
          </Tooltip></>}
        
      </div>
      </>
  );
};

export default WithApollo({ ssr: false })(StackPersonalMessageElement);

