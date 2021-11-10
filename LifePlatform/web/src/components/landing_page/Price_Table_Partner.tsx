import React, { useState } from 'react'
import { MAX_AMOUNT_OF_BYTES_FREE_GB, MAX_AMOUNT_OF_MEMORIES_FREE, MAX_AMOUNT_OF_MESSAGES_FREE, MAX_AMOUNT_OF_PEOPLE_FREE, PAYMENT_PREMIUM_PLAN } from '../../constants';
import {BsArrowRightShort, BsCheck, BsX} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../generated/graphql';
import LeadGenerator from './LeadGenerator';


export function Price_Table_Partner() {
    const router = useRouter()
    const [yearView, setyearView] = useState(false);
    const [open, setOpen] = useState(false);

    const { data: meData } = useMeQuery();



    
    return (
        <>
        <LeadGenerator modal_state={open} setmodal_state={setOpen}/>

        <div className="price_table_container">

          <div className="subscription_page_main_title">Onze pakketten voor uw begrafenis</div>
          <div className="subscription_page_main_subtext">Zie hieronder de begrafenis pakketten die worden aangeboden aan onze partners. </div>

{/* 
                <div className='box_link_select'>
                  <div className='subscription_page_switch_text'>Maandelijks</div>
                  <label className="subscription_price_switch">
                    <input  type="checkbox" checked={yearView} onChange={(e:any)=>setyearView(e.target.checked)} />
                    <span className="price_slider round"></span>
                  </label>
                  <div className='subscription_page_switch_text'>Jaarlijks</div>
                </div> */}
                

                <div className="subscription_page_container">
                    {/* <div className="subscription_free_container">
                        <div className="subscription_title">Gratis Levensverhaal</div>
                        <div className="subscription_price_box">€0</div>
                        <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start Gratis</button>  
                        
                        <div className="subscription_feature_box">
                        <div className="subscription_feature"> <BsX className='subscription_feature_icon' /><div className="subscription_limit_text">{MAX_AMOUNT_OF_MEMORIES_FREE}</div>Herinneringen </div>
                        <div className="subscription_feature"><BsX className='subscription_feature_icon' /><div className="subscription_limit_text">{MAX_AMOUNT_OF_BYTES_FREE_GB}GB</div>Foto's,Video's,Audio,...</div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text">onbeperkt</div>Boodschappen</div>
                        <div className="subscription_feature"><BsX className='subscription_feature_icon' /><div className="subscription_limit_text">{MAX_AMOUNT_OF_PEOPLE_FREE}</div>Auteur</div>  
                        </div>

             
                    </div> */}


                    {/* <div className="subscription_free_container">
                      <div className="subscription_title">Premium Levensverhaal</div>
                      <div className="subscription_price_box"><div className="line1">{yearView? '€100':'€10'}</div><BsArrowRightShort/> {yearView ?<> {`€${PAYMENT_PREMIUM_PLAN[1]}`} </>: <> {`€${PAYMENT_PREMIUM_PLAN[0]}`}</>} <div className="subscription_price_group">{yearView? '/jaar':'/maand'}</div> </div>
                        {/* <div className="subscription_price_subtext">*Tijdelijke korting</div>
                        <button className="subscription_feature_btn"  onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}} >Start nu</button>  
                        
                        <div className="subscription_feature_box">
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text"> onbeperkt</div>Herinneringen </div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' />Digitalisering volledige kist</div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text">onbepert</div>Boodschappen</div>
                        <div className="subscription_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_limit_text">onbeperkt</div> Auteurs </div>

                        </div>                       

                    </div> */}

                   <div className="subscription_gold_container">
                      <div className="subscription_gold_title">Generatie Levensverhaal</div>
                      <div className="subscription_price_box">€250</div>
                      <a className="subscription_feature_btn" href={'/register-partners'} >Binnenkort beschikbaar</a>  
                      <div className="subscription_feature_box">

                      <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">99 jaar</div>Bewaard </div>
                      <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">Digitalisatiedoos</div>  </div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Herinneringen </div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Media Geheugen</div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Boodschappen</div>
                        <div className="subscription_gold_feature"><BsCheck className='subscription_feature_icon' /><div className="subscription_gold_limit_text">onbeperkt</div>Aantal auteurs </div>

                      </div>  
                  
                    </div> 
                </div>   
        
        
        </div>
        </>
    )
}

export default Price_Table_Partner
