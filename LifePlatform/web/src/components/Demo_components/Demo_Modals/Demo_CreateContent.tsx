import React, { useState } from 'react';
import { GrAddCircle, GrClose } from "react-icons/gr";
import { Demo_CreateContent_Media } from './Demo_CreateContent_Media';
import { Demo_CreateContent_Question } from './Demo_CreateContent_Question';
import { Demo_CreateContent_Text } from './Demo_CreateContent_Text';
import {Categories} from '../../../constants';
import { FaTimes } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';


interface Demo_CreateContentProps {
  type:string;
  name_of_page: string;
  modalClick:boolean;
  setmodalClick:any;
  modalState:string;
  setmodalState:any;
}

export const Demo_CreateContent: React.FC<Demo_CreateContentProps> = ({type,name_of_page,modalClick,setmodalClick,modalState,setmodalState}) => {



  // const [modalState,setmodalState] = useState('content'); //'question','content','access'
  const [content, setcontent] = useState({sender_name:'',title: null,inspiration:null,message:null,category:1,date:null,media:[],totalMB:0,accesstatus:2,ontimeline:true});
 

  let modalContent = null;
  if(modalState=='question'){
    modalContent=(
      <Demo_CreateContent_Question setModelclick={setmodalClick}                           
                          setContent = {setcontent}
                         setmodalState={setmodalState}
                       />
    )}

  if(modalState=='content'){
      modalContent=(
        <Demo_CreateContent_Text setModelclick={setmodalClick}                           
                            setContent = {setcontent}
                           setmodalState={setmodalState}
                           Content={content}
                           on_timeline={(type==='timeline')?true:false}/>

      )}    
         
  if(modalState=='media'){
          modalContent=(
          <Demo_CreateContent_Media setModelclick={setmodalClick}                           
                                setContent = {setcontent}
                               setmodalState={setmodalState}
                               Content={content}
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

export default Demo_CreateContent

