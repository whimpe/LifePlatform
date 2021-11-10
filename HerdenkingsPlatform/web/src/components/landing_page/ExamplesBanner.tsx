import { Fade, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import static_text from '../../../assets/static_text.json'
import { useHerdenkingspaginaQuery } from '../../generated/graphql';

interface ExamplesBannerProps {
  }
  
  export const ExamplesBanner: React.FC<ExamplesBannerProps> = ({}) => {
    const router = useRouter();
    const { data: Jandata, loading: hploading1, error: hperror1, } = useHerdenkingspaginaQuery({
      variables: { paginaId: 'd32b99a9-3583-4f61-a04f-dd6d5ffab20b', },
    });  
    const { data: Anndata, loading: hploading2, error: hperror2, } = useHerdenkingspaginaQuery({
      variables: { paginaId: '169f485d-a542-47ac-87b1-1d9bd5be569e', },
    });  
    const { data: Emmadata, loading: hploading3, error: hperror3, } = useHerdenkingspaginaQuery({
      variables: { paginaId: "51fc5f66-87ab-41f4-b24b-6c0eb06ae33f", },
    });
    if (hploading1 && hploading2 && hploading3) {
      return <div>loading...</div>;
    }
    if (hperror1 && hperror2 && hperror3) {
      // Soms hier omdat de je van niet ingelogt naar een pagina in de folder VOORBEELD gaat
      console.log("index error :");
    }
  
    return (      

       
       <>     
     <div className="example_pages_background">
          
            <div className="example_pages_title_container">
              <div className="example_pages_title">Ontdek hun levensverhalen</div>
              <div className="example_pages_subtitle">Onderstaande levensverhalen zijn fictief.<br/>Aangeleverde levensverhalen en herinneringen blijven 100% privé en kunnen enkel gedeeld en geraadpleegd worden via een persoonlijke account met toestemming. </div>
            </div>

            <div className="example_pages_card_container">
              <div className="example_pages_card" onClick={()=>{router.push('/PLATFORM/d32b99a9-3583-4f61-a04f-dd6d5ffab20b')}}>
              <img src={"https://aeternabucket1.s3.eu-west-2.amazonaws.com/d32b99a9-3583-4f61-a04f-dd6d5ffab20b/5003ff11-f75f-4384-ba37-b5514eca9832.jpeg"} className="example_pages_card_img"/>
                    <div className="example_pages_box">
                    <div className="example_pages_card_date">{'1941 - 2020 '} </div>
                    <div className="example_pages_card_name" >Jan Himpens</div>
                  <div className="example_pages_card_btn" onClick={()=>{router.push('/PLATFORM/d32b99a9-3583-4f61-a04f-dd6d5ffab20b')}}>Bekijk het Levensverhaal</div>
                </div>

                 </div>


              <div className="example_pages_card" onClick={()=>{router.push('/PLATFORM/169f485d-a542-47ac-87b1-1d9bd5be569e')}}>
              <img src={"https://aeternabucket1.s3.eu-west-2.amazonaws.com/6ca3e86b-58c3-456b-ad15-4ef6bc3db3f5/a02159f3-23c3-4810-a3c2-01aab0816816.jpeg"} className="example_pages_card_img"/>
                  
                <div className="example_pages_box">
                <div className="example_pages_card_date">1939-09-26</div>
                    <div className="example_pages_card_name" >Ann Verlinden</div>
                    <div className="example_pages_card_btn" onClick={()=>{router.push('/PLATFORM/169f485d-a542-47ac-87b1-1d9bd5be569e')}}>Bekijk het Levensverhaal</div>             
                </div>
     </div>


                <div className="example_pages_card"  onClick={()=>{router.push('/PLATFORM/51fc5f66-87ab-41f4-b24b-6c0eb06ae33f')}}>
                <img src={'https://aeternabucket1.s3.eu-west-2.amazonaws.com/51fc5f66-87ab-41f4-b24b-6c0eb06ae33f/ffd6853c-d355-40d9-986a-7a2574f95a04.png'} className="example_pages_card_img"/>
                    <div className="example_pages_box">
                    <div className="example_pages_card_date">1986-05-06 </div>
                    <div className="example_pages_card_name" >Emma De Roose</div>
                  <div className="example_pages_card_btn" onClick={()=>{router.push('/PLATFORM/51fc5f66-87ab-41f4-b24b-6c0eb06ae33f')}}>Bekijk het Levensverhaal</div>             
                    </div>
                </div>
             </div>
            </div>
      
       </> 
    )
}

export default ExamplesBanner
