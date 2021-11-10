import React, { useState } from 'react'
import { BsArrowRight, BsEye } from 'react-icons/bs';
import { AMOUNT_OF_BYTES_PLAN, AMOUNT_OF_MEMORIES_PLAN, AMOUNT_OF_PEOPLE_PLAN,AMOUNT_OF_MESSAGES_PLAN, AMOUNT_OF_PERSONAL_MESSAGES_PLAN, MAX_AMOUNT_OF_CONDOLANCES_BASIC, MAX_AMOUNT_OF_CONDOLANCES_FREE, MAX_AMOUNT_OF_MEMORIES_BASIC, MAX_AMOUNT_OF_MEMORIES_FREE, MAX_AMOUNT_OF_PEOPLE_BASIC, MAX_AMOUNT_OF_PEOPLE_FREE, MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC, MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE, PAYMENT_PLAN, AMOUNT_OF_CONDOLANCES_PLAN, ACCOUNT_STATUS, AMOUNT_OF_MEDIA_PLAN } from '../../constants';
import { HerdenkingspaginaprivatetokenQuery } from '../../generated/graphql';


interface Limits_of_pageProps {
    herdenkingspagina : HerdenkingspaginaprivatetokenQuery;
    
}

export const Limits_of_page: React.FC<Limits_of_pageProps> = ({herdenkingspagina}) => {
        
  const [ViewLimits, setViewLimits] = useState(false);


    return(
        <div className="subscription_settings_container">
                      <div className="current_settings_title">HUIDIGE ABONNEMENT</div>

                      { herdenkingspagina?.herdenkingspaginaprivatetoken?.Payment_plan === PAYMENT_PLAN.Premium ?  
                      <>
                    {ViewLimits?     
                      <div className="premium_subscription_container">
                        <div className="premium_subscription_text">U heeft een premium account zonder limitaties</div>
                        <div className="premium_subscription_text"> {'Aantal herinneringen:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_memories}</b> </div>
                        <div className="premium_subscription_text"> {'Media geheugen:     '}<b>{(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_bytes/ (1024*1024*1024)).toFixed(3)}GB</b> </div>
                        <div className="premium_subscription_text"> {'Aantal persoonlijke boodschappen:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_personal_messages} </b></div>
                        <div className="premium_subscription_text"> {'Aantal berichten:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_messages}</b> </div>
                        <div className="premium_subscription_text"> {'Aantal auteurs:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people} </b></div>
                        <div className="premium_subscription_text"> {'Aantal condolaties:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_condolances}</b> </div>
                        <div className="premium_subscription_text"> {'Aantal media:     '}<b>{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_media} </b></div>
                        <div className="premium_subscription_btn"></div>        
                      </div>:
                      <div className="subscription_info_btn" onClick={(e:any)=>{setViewLimits(true)}}> Bekijk huidig abonnement <BsEye className='extend_subscription_icon'/></div>
                    }
                      </>

                      :<>
                        {ViewLimits?  
                        <>
                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Herinneringen </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_memories / AMOUNT_OF_MEMORIES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]*100 )}%`}}> </div></div>

                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_memories}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_MEMORIES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>

                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Media Geheugen </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_bytes / AMOUNT_OF_BYTES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>

                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_bytes / (1024*1024*1024)).toFixed(3)} {' GB'}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_BYTES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] / (1024*1024*1024)}{' GB'}</div>                          
                          </div>

                        </div>

                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Persoonlijke boodschappen </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_personal_messages / AMOUNT_OF_PERSONAL_MESSAGES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>

                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_personal_messages}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_PERSONAL_MESSAGES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>

                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Auteurs </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people / AMOUNT_OF_PEOPLE_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>
                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_PEOPLE_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>

                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Boodschappen </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_messages / AMOUNT_OF_MESSAGES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>
                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_PEOPLE_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>


                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Condoleances </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_condolances / AMOUNT_OF_CONDOLANCES_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>
                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_PEOPLE_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>

                        <div className="current_settings_container">
                          <div className="current_settings_subtitle">Media </div>
                          <div className="loader_settings"> <div className="loader_settings_top" style={{width:`${(herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_condolances / AMOUNT_OF_MEDIA_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan] )*100}%`}}> </div></div>
                          <div className="amount_subscription_container">
                            <div className="current_subscription_amount">{herdenkingspagina!.herdenkingspaginaprivatetoken!.number_of_people}</div>
                            <div className="max_subscription_amount">{AMOUNT_OF_MEDIA_PLAN[herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan]}</div>                          
                          </div>
                        </div>
                        </>
                        :
                        <div className="subscription_info_btn" onClick={(e:any)=>{setViewLimits(true)}}> Bekijk huidig abonnement <BsEye className='extend_subscription_icon'/></div>
                      }
                      </>
                      }
                    </div>
    )



    
    
    
}