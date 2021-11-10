
import { useRouter } from 'next/router';
import React from 'react';
import JsonData from '../../assets/static_text.json';
import MetaTags from '../components/general/MetaTags';
import Discover_banner from '../components/landing_page/Discover_banner';
import Footer from '../components/landing_page/footer';
import FreeTrialBanner from '../components/landing_page/FreeTrialBanner';
import Navigation from '../components/landing_page/navigation';
import StepPage from '../components/landing_page/StepPage';
import Steps_header from '../components/landing_page/steps_header';
import { WithApollo } from '../utils/withApollo';


interface ExplainPageProp {

} 

  export const ExplainPage: React.FC<ExplainPageProp> = ({}) => {

    const router = useRouter();

  return (
    <>
      <MetaTags title={'Aan de slag'} type_of_page={''} description={''} mediaUrl={''} />
      <div>
        <Navigation dark_nav={false} />
        <Steps_header  />
        <StepPage  img_location={JsonData.Steps.step1}/>
        <StepPage  img_location={JsonData.Steps.step2}/>
        <StepPage  img_location={JsonData.Steps.step3}/>
        <Discover_banner boolean_2btn={false}/>
        <FreeTrialBanner />
        <Footer />
      </div>
    </>
  );
}
export default WithApollo({ssr: false})(ExplainPage);


