import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight, BsCheck, BsPersonFill } from 'react-icons/bs';
import { IoIosImages } from 'react-icons/io';
import { WithApollo } from '../../utils/withApollo';

interface Price_TableDigitizeProps{
    selected_option:string;
    setselected_option:any;
}
export const Price_TableDigitize: React.FC<Price_TableDigitizeProps> = ({selected_option,setselected_option}) => {
    const router = useRouter();

    return (
        <>
        <div className="Price_Table_Digitize_container">
            
        <div className="contact_general_title">Kies het starters pakket:</div>
           

      <div className="subscription_page_container">
        <div className={selected_option==='basis'? "subscription_gold_container" : "subscription_free_container"}>
              
      
           <div className="subscription_title">Basis Pakket</div>
            <div className="subscription_price_box">€99</div>
            <div className="subscription_price_subtext"></div>
            
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Foto's</div>
                    <div className="subscription_feature_amount">0-99</div>
                </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Video of Audio</div>
                    <div className="subscription_feature_amount"><AiOutlineClose /></div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Brieven, Affiches of andere</div>
                    <div className="subscription_feature_amount">0-20 </div>
            </div>   
          
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Digitaal levensverhaal</div>
                    <div className="subscription_feature_amount">1/2 jaar</div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >USB stick</div>
                    <div className="subscription_feature_amount">1</div>
            </div> 

            <a className={selected_option==='basis'?"subscription_feature_select_btn":"subscription_feature_btn"} href='#anchor_digitize_container' onClick={(e:any)=>setselected_option('basis')}> {selected_option==='basis'? 'Geselecteerd Plan':'Selecteer basis'}</a>
              {/* {herdenkingspagina?.herdenkingspaginaprivatetoken?.Payment_plan ===0 ? <div className="subscription_free_btn"> Huidig Abbonnement</div>:null} */}

          </div>

       {/*    <div className={selected_option==='premium'? "subscription_gold_container" : "subscription_free_container"}>
              <div className="subscription_title">Premium Pakket</div>
              <div className="subscription_price_box">€199</div>
              <div className="subscription_price_subtext"></div>
              <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Foto's</div>
                    <div className="subscription_feature_amount">99-250</div>
                </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Video of Audio</div>
                    <div className="subscription_feature_amount">1-4 uur</div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Brieven, Affiches of andere</div>
                    <div className="subscription_feature_amount"> 20-50 </div>
            </div>   
          
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Digitaal levensverhaal</div>
                    <div className="subscription_feature_amount">1 jaar</div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >USB stick</div>
                    <div className="subscription_feature_amount">1</div>
            </div>   
              <a className= {selected_option==='premium'?"subscription_feature_select_btn":"subscription_feature_btn"} href='#anchor_digitize_container' onClick={(e:any)=>setselected_option('premium')}> {selected_option==='premium'? 'Geselecteerd pakket':'Selecteer Premium'}</a>

           
          </div>*/}

          {/* <div className={selected_option==='op maat'? "subscription_gold_container" : "subscription_free_container"}>
            <div className='subscription_title'>Op maat Pakket</div>
            <div className="subscription_price_box"><IoIosImages className="subscription_price_box_icon" /></div>
              <div className="subscription_price_subtext">*De prijs afhankelijk van hoeveelheid media</div>
              <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Foto's</div>
                    <div className="subscription_feature_amount"><BsCheck /></div>
                </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Video of Audio</div>
                    <div className="subscription_feature_amount"><BsCheck /></div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Brieven, Affiches of andere</div>
                    <div className="subscription_feature_amount"> <BsCheck /></div>
            </div>   
          
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >Digitaal levensverhaal</div>
                    <div className="subscription_feature_amount">1 jaar</div>
            </div>   
            <div className="subscription_feature_box">
                    <div className="subscription_feature_name" >USB stick</div>
                    <div className="subscription_feature_amount">1</div>
            </div>             
              <a className={selected_option==='op maat'?"subscription_feature_select_btn":"subscription_feature_btn"}  href='#anchor_digitize_container' onClick={(e:any)=>setselected_option('op maat')}> {selected_option==='op maat'? 'Geselecteerd pakket':'Selecteer Op maat'}</a>

           
          </div> */}

      </div>   


      </div>

               
        </>
    )
}
export default WithApollo({ssr: false})(Price_TableDigitize);
