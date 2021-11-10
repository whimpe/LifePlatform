import { useMutation } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { setAccessToken } from "../../accessToken";
import { DESIGN_TYPE, MAX_AMOUNT_OF_BYTES_FREE_GB, MAX_AMOUNT_OF_MEMORIES_FREE, MAX_AMOUNT_OF_PEOPLE_FREE, PAYMENT_PLAN, PAYMENT_PREMIUM_PLAN, Payment_Term } from '../../constants';
import {
  useAddMediaUrlMutation,
  useCreateHerdenkingspaginaMutation, useCreateLevenstijdlijnBetalingMutation, useCreateLevenstijdlijnDomicilieringMutation, useMeQuery
} from "../../generated/graphql";
import * as gtag from "../../utils/googleanalytics/gtag";
import { isServer } from "../../utils/isServer";
import { SINGLE_UPLOAD } from "../../utils/upload_functions/uploadUtils";
import { WithApollo } from "../../utils/withApollo";



const access_status =['Wie mag dit verhaal zien','Openbaar','Enkel Intieme kring','enkel mezelf en overleden']

interface CreatePage_PaymentProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
  Content:any;
  close_modal:any;
}

export const CreatePage_Payment: React.FC<CreatePage_PaymentProps> = ({ setModelclick, setContent,setmodalState,Content,close_modal }) => {
    const router = useRouter();
    const [selected_option, setselected_option] = useState('free');  //free , month, year
    const [createHerdenkingsPagina] = useCreateHerdenkingspaginaMutation();
    const [createdomiciliering,] = useCreateLevenstijdlijnDomicilieringMutation();
    const [createLevenstijdlijnbetaling,] = useCreateLevenstijdlijnBetalingMutation();
    const [addMediaUrl] = useAddMediaUrlMutation();
    let [valueControlBefore, setValueControlBefore] = useState(false);
    const [mutateUpload, { loading, error, data }] = useMutation(SINGLE_UPLOAD);
    const [file, setfile] = useState<any>(null);
    const [loading_state, setloading] = useState(false)

    const { data: Medata, loading: Meloading } = useMeQuery({skip: isServer(),});
    const close_all = () => {
      setModelclick(false);
      setloading(false);
      setmodalState(false);
      close_modal(false);
      setloading(false); 
    }

    const start_subscription = async (public_token:string,selected_option:string)=>{     
        if(selected_option==='year'){
          const pay = await createLevenstijdlijnbetaling({
            variables: { public_token: public_token, payment_plan: PAYMENT_PLAN.Premium, payment_term:Payment_Term.One_Year } })
            gtag.event({action:"start_package",category:"Subscription",label:"subscription",value:0});
            window.open(pay?.data?.createLevenstijdlijnBetaling?.pay_link!, '_blank');
            close_all()
  
        }else if(selected_option==='month'){
          try{
            const pay = await createdomiciliering({
              variables: { payment_plan:PAYMENT_PLAN.Premium, public_token: public_token, payment_term:Payment_Term.Recurring }
              })
              gtag.event({action:"start_subscription",category:"Subscription",label:"subscription",value:0});
              window.open(pay?.data?.createLevenstijdlijnDomiciliering?.pay_link!, '_blank');
          }catch(error:any){
            console.log(error.message)
            if(error.message.includes("Alleen de eigenaar kan een abonnement starten")){
              alert('Alleen de eigenaar kan deze  actie uitvoeren');
            }else if(error.message.includes("There already exist a subscription for this page")){
              alert('Er bestaat al een abonnement voor deze pagina'); 
            }else if(error.message.includes("The email address")){
              alert('U kan geen abonnement starten zolang uw email niet geverifieerd is. Ga naar wijzig account om u te verifiëren.');             
            }else{
              alert('Er is iets misgelopen probeer later opnieuw.') 
            }
          }
          close_all()
        
      }else{
        router.push(`/PLATFORM/${public_token}`);
        close_all()
      }
    }



    const create_MemoryPage = async () => {
        setloading(true);
        gtag.event({ action: 'Create Page', category: 'create page', label: 'page', value: 0, });
        if (Content.media[0].size > 100000000) { //100MB threshold      
          alert("het aantal bestanden is te groot");
          setloading(false);      
        }
        else if (Content.media.length === 0) {     
          alert("U bent vergeten een profielfoto te selcteren.");          
          setloading(false);
        }
        else if (Content.media[0].type.split("/")[0] !== "image") {
          alert("De profielfoto moet een foto zijn");    
          setloading(false);
    
        } else {
          var awsURL = null;
          const public_token = await createHerdenkingsPagina({ variables: { input: { 
            name_of_page: Content.title, 
            mediaUrl: "https://aeternageneral.s3.eu-west-2.amazonaws.com/default_images/default_profile.jpg", 
            text: `Welkom op het levensverhaal van ${Content.title}. Hier kan je altijd terecht indien je onze mooie intieme herinneringen wilt herbeleven. Deel gerust een mooie foto of verhaal dat we samen beleefd hebben zodat ze voor altijd bewaard blijven. `,            
            DoB: Content.dob, 
            control_before: valueControlBefore,
            condoleance_active: false, 
            DesignType: DESIGN_TYPE.Golden_sun },
            DoD: Content.dod, }, });

          if (public_token.errors) {
            throw new Error(public_token.errors.toString());
          }
          if ( public_token && public_token.data?.createHerdenkingspagina?.accessToken ) {
            setAccessToken(public_token.data?.createHerdenkingspagina!.accessToken);
          }
    
          const resultMutateUpload = await mutateUpload({ variables: { file: Content.media[0], folder: public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id, }, });
          awsURL = resultMutateUpload.data.singleUpload.url;
          const addmediaResponse = await addMediaUrl({ variables: { mediaUrl: awsURL, paginaId: public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id, }, });
    
          if (addmediaResponse.errors || public_token.errors) { close_all() }
          else { await start_subscription(public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id,selected_option); }
        }

        };
    
   

  

  return (
    <>        
        <div className="flashcard_container">   
                <div className="flashcard_title">Selecteer Abonnement</div>  
            

        <div className="flashcard_btn_container_pay">
              <div onClick={(e)=>{setmodalState('media')} } className="flashcard_inspiration_btn" ><BsArrowLeft className='flashcard_icon_btn' /> <p className='flashcard_text_btn'>Terugkeren</p></div>                  
              <div className="flashcard_media_btn" onClick={async (e)=>{ await create_MemoryPage(); }}>
              {loading_state ?<CircularProgress color="secondary"  />: <div className='flashcard_text_btn'>Start Levensverhaal<BsArrowRight className='flashcard_icon_btn' /></div> }</div>
        </div>
      
      <div className="subscription_page_container">
        <div className={selected_option==='free'? "subscription_gold_container" : "subscription_free_container"}>
              <div className="subscription_title">Gratis Plan</div>
              <div className="subscription_price_box">€0</div>
              <div className={selected_option==='free'?"subscription_feature_select_btn":"subscription_feature_btn"}  onClick={(e:any)=>setselected_option('free')}> {selected_option==='free'? 'Geselecteerd Plan':'gratis Levensverhaal'}</div>
              <div className="subscription_feature">Herinneringen <div className="subscription_limit_text">({MAX_AMOUNT_OF_MEMORIES_FREE})</div></div>
              <div className="subscription_feature">Media Opslag<div className="subscription_limit_text">({MAX_AMOUNT_OF_BYTES_FREE_GB}GB)</div></div>
              <div className="subscription_feature">Boodschappen<div className="subscription_limit_text">(onbeperkt)</div></div>
              <div className="subscription_feature">Aantal auteurs<div className="subscription_limit_text">({MAX_AMOUNT_OF_PEOPLE_FREE})</div></div>  

          </div>

          <div className={selected_option==='month'? "subscription_gold_container" : "subscription_free_container"}>
              <div className="subscription_title">Premium Plan</div>
              <div className="subscription_price_box">€5<div className="subscription_price_group">/maand</div></div>
              <div className= {selected_option==='month'?"subscription_feature_select_btn":"subscription_feature_btn"} onClick={(e:any)=>setselected_option('month')}> {selected_option==='month'? 'Geselecteerd Plan':'Kies maandelijks plan'}</div>            
              <div className="subscription_feature">Herinneringen <div className="subscription_limit_text">(onbeperkt)</div></div>
              <div className="subscription_feature">Media Opslag<div className="subscription_limit_text">(onbeperkt)</div></div>
              <div className="subscription_feature">Boodschappen<div className="subscription_limit_text">(onbeperkt)</div></div>
              <div className="subscription_feature">Aantal auteurs<div className="subscription_limit_text">(onbeperkt)</div></div>  

           
          </div>

          <div className={selected_option==='year'? "subscription_gold_container" : "subscription_free_container"}>
            <div className='subscription_title'>Jaarpakket</div>
            <div className="subscription_price_box"> {`€${PAYMENT_PREMIUM_PLAN[1]}`}<div className="subscription_price_group">/jaar</div></div>
              <div className={selected_option==='year'?"subscription_feature_select_btn":"subscription_feature_btn"} onClick={(e:any)=>setselected_option('year')}> {selected_option==='year'? 'Geselecteerd Plan':'Kies jaarpakket'}</div>
              <div className="subscription_feature">Herinneringen <div className="subscription_limit_text">(onbeperkt)</div> </div>
              <div className="subscription_feature">Media Opslag<div className="subscription_limit_text">(onbeperkt)</div>  </div>
              <div className="subscription_feature">Boodschappen<div className="subscription_limit_text">(onbeperkt)</div>  </div>
              <div className="subscription_feature">Aantal auteurs<div className="subscription_limit_text">(onbeperkt)</div>  </div>

          </div>
      </div>   
             
        </div>               
    </>
  );
};

export default WithApollo({ ssr: false })(CreatePage_Payment);
