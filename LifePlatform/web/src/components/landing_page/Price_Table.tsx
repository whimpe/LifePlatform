import React, { useState } from 'react'
import { MAX_AMOUNT_OF_BYTES_FREE_GB, MAX_AMOUNT_OF_MEMORIES_FREE, MAX_AMOUNT_OF_MESSAGES_FREE, MAX_AMOUNT_OF_PEOPLE_FREE, PAYMENT_PREMIUM_PLAN } from '../../constants';
import {BsArrowRightShort, BsCheck, BsX} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../generated/graphql';
import LeadGenerator from './LeadGenerator';


export function Price_Table(data:any) {
    const router = useRouter()
    const [yearView, setyearView] = useState(false);
    const [open, setOpen] = useState(false);
    const [type_subscription, settype_subscription] = useState(data.data);

    const { data: meData } = useMeQuery();
   
  //   export enum PAYMENT_PLAN {
  //     Free ,
  //     Basic,
  //     Premium,
  //     Forever
  // }
  console.log('data',data)

    
    return (
        <>
        <LeadGenerator modal_state={open} setmodal_state={setOpen}/>

        <div className="price_table_container">

          <div className="subscription_page_main_title">Prijzen voor Digitaal levensverhaal</div>
          <div className="subscription_page_main_subtext">Zie hieronder de optie om een maandelijks abonnement te starten voor uw levensverhaal. Of u kan betalen voor het hele jaar met 2 maanden gratis. </div>


                <div className='box_link_select'>
                  <div className='subscription_page_switch_text'>Maandelijks</div>
                  <label className="subscription_price_switch">
                    <input  type="checkbox" checked={yearView} onChange={(e:any)=>setyearView(e.target.checked)} />
                    <span className="price_slider round"></span>
                  </label>
                  <div className='subscription_page_switch_text'>Jaarlijks</div>
                </div>
                

                <div className="subscription_page_container">
                    <div className="subscription_free_container">
                        <div className="subscription_title">Gratis Levensverhaal</div>
                        <div className="subscription_price_box">€0</div>
                        {/* {data.data===null ? <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start Gratis</button>  :
                                            <button className="subscription_feature_btn_status"></button>}      
                                                               */}
                        <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start Gratis</button>  
                        <div className="subscription_feature_box">
                        <div className="subscription_feature"> <BsX className='subscription_feature_icon' /><div className="subscription_free_limit_text">{MAX_AMOUNT_OF_MEMORIES_FREE}</div>Herinneringen </div>
                        <div className="subscription_feature"><BsX className='subscription_feature_icon' /><div className="subscription_free_limit_text">{MAX_AMOUNT_OF_BYTES_FREE_GB}GB</div>Media Geheugen</div>
                        <div className="subscription_feature"><BsX className='subscription_feature_icon' /><div className="subscription_free_limit_text">{MAX_AMOUNT_OF_PEOPLE_FREE}</div>Auteur</div>                          
                        </div>

             
                    </div>


                    <div className="subscription_free_container">
                      <div className="subscription_title">Premium Levensverhaal</div>
                      <div className="subscription_price_box"><div className="line1">{yearView? '€100':'€10'}</div><BsArrowRightShort/> {yearView ?<> {`€${PAYMENT_PREMIUM_PLAN[1]}`} </>: <> {`€${PAYMENT_PREMIUM_PLAN[0]}`}</>} <div className="subscription_price_group">{yearView? '/jaar':'/maand'}</div> </div>
                        {/* { data.data===null ? <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start Nu</button>  : 
                          data.data===2   ? <button className='subscription_feature_btn_status'>Huidig Plan</button> : null} */}
                        <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start Premium</button>  

                        <div className="subscription_feature_box">
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text"> onbeperkt</div>Herinneringen </div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text">onbeperkt </div>Media Geheugen</div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text">onbeperkt</div> Auteurs </div>

                        </div>                       

                    </div>

                   <div className="subscription_gold_container">
                      <div className="subscription_gold_title">Generatie Levensverhaal</div>
                      <div className="subscription_price_box">€199</div>                   
                      { data.data===3 ?  <div className='subscription_feature_btn_status'>Huidig Plan</div> :  <button className="subscription_feature_btn"  onClick={(e:any)=> {setOpen(true);}} >Reserveer Nu</button> }  

                      <div className="subscription_feature_box">
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">99 JAAR</div>Bewaard  </div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">5 JAAR</div>Online  </div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Herinneringen </div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Media Geheugen</div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Aantal auteurs </div>
                      </div>  
                  
                    </div> 
                </div>   
        
        
        </div>
        </>
    )
}

export default Price_Table
