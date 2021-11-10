import React,{useState} from 'react';
import { FaHandHoldingHeart } from 'react-icons/fa';
import { useRouter } from "next/router";
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { IoReaderOutline } from 'react-icons/io5';
import { AiOutlineEye } from 'react-icons/ai';
import { SiSlickpic } from 'react-icons/si';
import { BsPen } from 'react-icons/bs';
import {MdAdd} from 'react-icons/md';
import CreateContent from "../modal_components/CreateContent";

interface Accepted_blokDemoProps {
    public_token:string;
    meData:any;
}


    

export const Accepted_blokDemo: React.FC<Accepted_blokDemoProps> = ({public_token,meData}) => {
    const router = useRouter();
    const [modalClick, setmodalClick] = useState(false);
    const [modalState,setmodalState] = useState('content');


    const ClickRoute = (route_link:string)=>{ router.push(`/VOORBEELD/${public_token}/${route_link}`) }
    
    const check_allowed=()=>{
          setmodalState('content');
          setmodalClick(true);        
      }
      
      

        return (           
                <>

                <div className="main_index_btn_container">
                    

                    <div className='main_index_btn_box' onClick={(e:any)=>{ClickRoute('timeline') }} > 
                        <div className="main_index_btn_icon_box">  <AiOutlineEye className='index_icon_btn'  /></div>
                        <div className="main_index_btn_text">Bekijk verhaal</div>                                                                             
                    </div>
                    <div className='main_index_btn_box' onClick={(e:any)=>{ClickRoute('timeline') }} > 
                        <div className="main_index_btn_icon_box">  <MdAdd className='index_icon_btn'  /></div>
                        <div className="main_index_btn_text">Deel herinnering</div>                                                                             
                    </div>
                    <div className='main_index_btn_box' onClick={(e:any)=>{ClickRoute('condolances') }} > 
                        <div className="main_index_btn_icon_box">  <img src={'/img/icons/pen-tool.png'} className='index_icon_btn'  /></div>
                        <div className="main_index_btn_text">Condoleren</div>                                                                             
                    </div>
                </div> 

                <CreateContent  type={'timeline'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState} />



                </>
             
        );
}



/// OLD VERSION ///
{/* 
                 <div className="index_btn_container">
                    <div className='index_btn' onClick={(e:any)=>{ClickRoute('timeline') }} > <AiOutlineEye className='index_icon_btn'  />Bekijk levensverhaal </div>
                    <div className='index_btn' onClick={(e:any)=>{ClickRoute('memories') }}><HiOutlineViewGridAdd className='index_icon_btn' />Creëer herinnering</div>
                    <div className='index_btn' onClick={(e:any)=>{ClickRoute('messages') }} ><IoReaderOutline className='index_icon_btn' /> Laat een boodschap achter</div>
                </div>               */}