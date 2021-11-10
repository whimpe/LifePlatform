import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { WithApollo } from '../../utils/withApollo';
import { CreatePage_Info } from './CreatePage_Info';
import { CreatePage_Media } from './CreatePage_Media';
import { CreatePartnerPage_Payment } from './CreatePartnerPage_Payment';

interface CreatePagePartnerProp {
  close_modal:any;
}

export const CreatePagePartner: React.FC<CreatePagePartnerProp> = ({close_modal}) => {
  

// function CreatePage(close_modal:any) {   //'memory', 'condolence', 'personal_message'  TODO: the modal will stay the same but the mutation will change

  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content'); //'question','content','access'
  const [content, setcontent] = useState({title:undefined,text: undefined,inspiration:null,dob:null,dod:null, media:[]});
 

  let modalContent = null;
 

  if(modalState=='content'){
      modalContent=(
        <CreatePage_Info setModelclick={setmodalClick}                           
                            setContent = {setcontent}
                           setmodalState={setmodalState}
                           Content={content}/>

      )}    
      
  if(modalState=='media'){
          modalContent=(
          <CreatePage_Media setModelclick={setmodalClick}                           
                                setContent = {setcontent}
                               setmodalState={setmodalState}
                               Content={content}/>
    )}        
    if(modalState=='payment'){
      modalContent=(
      <CreatePartnerPage_Payment setModelclick={setmodalClick}                           
                            setContent = {setcontent}
                           setmodalState={setmodalState}
                           close_modal={close_modal}
                           Content={content}/>
)} 



  return (
    <>
      {modalContent}           
    </>
  )
}
export default WithApollo({ ssr: false })(CreatePagePartner);

