import {
  Flex,
  Spinner
} from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  PersonalMessage,
  PersonalMessageAccess,
  useCreatePersonalMessageAccessMutation,
  useDeletePersonalMessageAccessMutation,
  useMeQuery
} from "../../generated/graphql";
import { convert_date_to_string, formatDate, formatDate_text } from '../../utils/FormatDate';
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";



interface StackPersonalMessageElementOwnerProps {
  personalmessage: PersonalMessage; //PersonalMessage
  personalmessageaccess: PersonalMessageAccess[]; //PersonalMessageAccess
}

const StackPersonalMessageElementOwner: React.FC<StackPersonalMessageElementOwnerProps> = ({
  personalmessage: pm,
  personalmessageaccess: personalmessages,
}) => {

  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();


  const { data: meData, loading: meloading } = useMeQuery({
    variables:{
        paginaId: public_token
    },
    skip: isServer(),
});

  
  const [allowAcces] = useCreatePersonalMessageAccessMutation();
  const [denyAccess] = useDeletePersonalMessageAccessMutation();


  if (meloading) {
    return(<Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex> )
  };

  if (!meData?.me?.status) {
    return <div>no data found</div>;
  }


  return (
  <>
    <div key={pm.id} className='stackgrid_personal_message_box' >   
      {!pm.media[0] ? null : (
          <MediaDisplay awsUrl={pm.media[pm.media.length-1].urlFile}  type={pm.media[pm.media.length-1].mediaType} designclass={'mediaview_personal_message'} />
      )}   
    
        <div className='stackgrid_personal_message_title'> {pm.title} </div>   
        {!pm.dateAvailable ? null: <><div className='personal_message_date' >Laatste boodschap wordt verstuurd op {formatDate_text(pm.dateAvailable)}</div></> }
               {(meData?.me?.status) > 3 ? 
          <>
          <div className='personal_message_button' onClick={(event:any) => {router.push(`/PLATFORM/${public_token}/personal-message/edit/${pm.id}`)}} > <FiEdit className='personal_message_icon_btn' />Wijzig laatste boodschap</div> 
          <div className='personal_message_button' onClick={(event:any) => {router.push(`/PLATFORM/${public_token}/personal-message/${pm.id}`)}} > <AiOutlineEye  className='personal_message_icon_btn' />Bekijk laatste boodschap</div> 
          </>   
        :null}
    </div>
  </>
  );
};

export default WithApollo({ ssr: false })(StackPersonalMessageElementOwner);





