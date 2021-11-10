import React, { useState } from 'react';
import { WithApollo } from '../../utils/withApollo';
import { CreatePage_Info } from './CreatePage_Info';
import { CreatePage_Media } from './CreatePage_Media';
import { CreatePage_Payment } from './CreatePage_Payment';

interface CreatePageProp {
  close_modal:any;
}

export const CreatePage: React.FC<CreatePageProp> = ({close_modal}) => {
  

// function CreatePage(close_modal:any) {   //'memory', 'condolence', 'personal_message'  TODO: the modal will stay the same but the mutation will change

  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content'); //'question','content','access'
  const [content, setcontent] = useState({title:undefined,text: undefined,dob:null,dod:null, media:[]});
 

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
      <CreatePage_Payment setModelclick={setmodalClick}                           
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
export default WithApollo({ ssr: false })(CreatePage);

