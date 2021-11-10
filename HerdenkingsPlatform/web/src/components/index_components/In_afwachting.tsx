import { useRouter } from "next/router";
import React, { useState } from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { IoReaderOutline } from 'react-icons/io5';
import { CreateCondolance } from '../../pages/PLATFORM/[public_token]/create-condolance';
import { CreateMessage_Modal } from '../modal_components/CreateMessage';
import CreateContent from '../modal_components/CreateContent';


interface In_afwachtingProps {
    public_token:string;
    condolance_active: boolean;
    name_of_page:string;
    has_passed_away:boolean

}

export const In_afwachting: React.FC<In_afwachtingProps> = ({public_token,condolance_active,name_of_page,has_passed_away}) => {
    const router = useRouter();
    const [modalClick, setmodalClick] = useState(false);
    const [condolenceClick, setcondolenceClick] = useState(false);
    const [messageClick, setmessageClick] = useState(false);
    const [ContentType, setContentType] = useState(2);
    const [modalState,setmodalState] = useState('content');
  
    
        return (           
                <>
                  <div >                   
                    <div className="index_btn_container">
                      <div className='index_btn' onClick={(e:any)=>{setmodalClick(true)}} > <HiOutlineViewGridAdd className='index_icon_btn'  />Creëer herinnering </div>
                      <div className='index_btn' onClick={(e:any)=>{setcondolenceClick(true)}}><FaHandHoldingHeart className='index_icon_btn' />Laat een condolatie achter</div>
                      <div className='index_btn' onClick={(e:any)=>{setmessageClick(true)}} ><IoReaderOutline className='index_icon_btn' /> Laat een boodschap achter</div>
                  </div>


                  <div className='no_account_title'>Aanvraag ingediend! </div>
                    <div  className='no_account_text'>
                        U ontvangt een email wanneer de beheerder u geaccepteerd heeft, u kan nu al herinneringen en berichten toevoegen. U kan alles bekijken na acceptatie.
                    </div>                                           
                  </div>     

                  <CreateContent  type={'memories'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState} />



                   {condolenceClick ? 
                      <>
                      <div className="message_creator_container">
                        <div className="share_message_text_area" ><GrClose className='droplet_message_btn_icon'  onClick={(e:any)=>{setcondolenceClick(false)}}/> </div>
                        <div className="droplet_message_text">VERBERGEN</div>
                        <CreateCondolance setclick={setcondolenceClick} />
                      </div>
                      </>
                      :null}

                    {messageClick ? 
                      <>
                      <div className="message_creator_container_big">
                        <div className="droplet_message_btn_icon_container" ><GrClose className='droplet_message_btn_icon'  onClick={(e:any)=>{setmessageClick(false)}}/> </div>
                        <div className="droplet_message_text">VERBERGEN</div>
                        <CreateMessage_Modal setclick={setmessageClick} Type={ContentType} setType={setContentType} name_of_page={name_of_page} has_passed_away={has_passed_away}/>
                      </div>
                      </>
                      :null}




                </>
             
        );
}