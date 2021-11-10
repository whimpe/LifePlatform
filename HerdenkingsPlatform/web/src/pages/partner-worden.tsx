import React from 'react';
import JsonData from '../../assets/static_text.json';
import MetaTags from "../components/general/MetaTags";
import Features from '../components/landing_page/features';
import Footer from '../components/landing_page/footer';
import Funeral_Testimonial from '../components/landing_page/Funeral_Testimonial';
import MainQuote_Partner from '../components/landing_page/MainQuote_Partner';
import { MockupPreviewPartner } from '../components/landing_page/MockupPreview_Partner';
import Navigation from '../components/landing_page/navigation';
import Partner_Header from '../components/landing_page/partner-header';
import Price_Table from '../components/landing_page/Price_Table';
import Price_Table_Partner from '../components/landing_page/Price_Table_Partner';
import { WithApollo } from "../utils/withApollo";






const PartnerPagina = () => {
  


  return (
<>
    <MetaTags title={'Partner Worden'} type_of_page={''} description={''} mediaUrl={''} />

        <div style={{backgroundColor:"#fff"}}>

                <Navigation  dark_nav={false}/>
                {/* <Header data={JsonData.Header} /> */}
                <Partner_Header  />
                <MainQuote_Partner />

                <MockupPreviewPartner />

                {/* <Main_feature />   */}
                <Features data={JsonData.Features_blocks.partner_step_1} textleft={true} />  {/*  1:fysieke foto's verzamelen */}
                <Features data={JsonData.Features_blocks.partner_step_2}  textleft={false} />   {/*  2: digitalisatie en directe selectie */}
                <Features data={JsonData.Features_blocks.partner_step_3} textleft={true} />  {/*  3: Media en herinneringen bewaard blijven contact klanten */}
      
                <Funeral_Testimonial />

                <Price_Table_Partner />
                {/* <ExamplesBanner  /> */}
                {/* <FreeTrialBanner /> */}

                <Footer />
                </div>
        

</>
  );
};

export default WithApollo({ssr: false})(PartnerPagina);

