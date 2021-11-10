import React, { useState } from 'react';
import { GrAddCircle, GrClose } from "react-icons/gr";
import { CreateContent_Text } from './CreateContent_Text';
import { CreateContent_Question } from './CreateContent_Question';
import { CreateContent_Media } from './CreateContent_Media';
import {Categories} from '../../constants';
import { FaTimes } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';


interface CreateContentProps {
  type:string;
  name_of_page: string;
  modalClick:boolean;
  setmodalClick:any;
  modalState:string;
  setmodalState:any;
}

export const CreateContent: React.FC<CreateContentProps> = ({type,name_of_page,modalClick,setmodalClick,modalState,setmodalState}) => {



  // const [modalState,setmodalState] = useState('content'); //'question','content','access'
  const [content, setcontent] = useState({sender_name:'',title: null,inspiration:null,message:null,category:1,date:null,media:[],totalMB:0,accesstatus:2,ontimeline:true});
 

  let modalContent = null;
  if(modalState=='question'){
    modalContent=(
      <CreateContent_Question setModelclick={setmodalClick}                           
                          setContent = {setcontent}
                         setmodalState={setmodalState}
                       />
    )}

  if(modalState=='content'){
      modalContent=(
        <CreateContent_Text setModelclick={setmodalClick}                           
                            setContent = {setcontent}
                           setmodalState={setmodalState}
                           Content={content}
                          />

      )}    
     
  if(modalState=='media'){
          modalContent=(
          <CreateContent_Media setModelclick={setmodalClick}                           
                                setContent = {setcontent}
                               setmodalState={setmodalState}
                               Content={content}
                               on_timeline={(type==='timeline')?true:false}
                           />
    )}        



  return (
    <>
    {modalClick ? (
        <>    
          <div id="myModal" className="modal">
          <div className="modal_content_memory">
            {/* <span className="close"  onClick={() => {setmodalClick(false);}} >&times;</span> */}
            <div className="close_button" onClick={(e:any) => {setmodalClick(false)}}>
                    <IoCloseOutline className="close_button_icon"  />
            </div>
                {modalContent}   
           </div>

        </div>
        </>
      ) : null}

    </>
  )
}

export default CreateContent

