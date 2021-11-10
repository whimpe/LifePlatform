
import React from 'react';
import Navbar_LP from '../components/landing_page/Navbar_LP';
import { WithApollo } from '../utils/withApollo';
import Navigation from '../components/landing_page/navigation'
import JsonData from '../../assets/static_text.json';
import {  useRouter } from 'next/router';
import About_header from '../components/landing_page/about_header';
import Footer from '../components/landing_page/footer';
import General_Information from '../components/landing_page/General_Information';
import MeetFounder from '../components/landing_page/MeetFounder';
import MetaTags from '../components/general/MetaTags';
import FreeTrialBanner from '../components/landing_page/FreeTrialBanner';


interface OurStoryProp {

} 

  export const OurStory: React.FC<OurStoryProp> = ({}) => {

    const router = useRouter();

  return (
    <>

      <MetaTags title={'Ons verhaal'} type_of_page={''} description={''} mediaUrl={''} />


      <div>
          <Navigation dark_nav={false} />
          <About_header data={JsonData.About_header} />
          <MeetFounder data={JsonData.About_us.maite} textleft={true}/>   
          <MeetFounder data={JsonData.About_us.himpe} textleft={false} />   
          <MeetFounder data={JsonData.About_us.lannoye} textleft={true} />   
          <Footer />
      </div>
    </>
  );
}
export default WithApollo({ssr: false})(OurStory);

