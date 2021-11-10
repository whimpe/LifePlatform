import React from 'react';
import About from './about';
import Contact from '../../pages/contact';
import JsonData from '../../../assets/static_text.json';
import Enquete from './Enquete';
import Features from './features';
import Header from './header';
import Navigation from './navigation';
import Team from './Team';
import Slideshow from './Slideshow';
import Discover_banner from './Discover_banner';
import Footer from './footer';
import Main_feature from './main_feature';
import General_Information from './General_Information';
import Price_Table from './Price_Table';
import FreeTrialBanner from './FreeTrialBanner';
import OurStoryBanner from './OurStoryBanner';
import StoryTellingBanner from './StoryTellingBanner';
import MainQuote from './MainQuote';
import Testimonials from './testimonials';
import { MockupPreview } from './MockupPreview';
import { MockupProblem } from './MockupProblem';
import ExamplesBanner from './ExamplesBanner';





interface LayoutProps {
}

export const Layout_LP: React.FC<LayoutProps> = ({}) => {
        return (
        <div style={{backgroundColor:"#fff"}}>

                <Navigation  dark_nav={false}/>
                <Header data={JsonData.Header} />
                <MainQuote />
                <MockupPreview />
                <MockupProblem />
                <ExamplesBanner  />
                <OurStoryBanner />
                <Main_feature />
                 <Features data={JsonData.Features_blocks.private} textleft={true} />   
                <Features data={JsonData.Features_blocks.timeline}  textleft={false} />   
                <Features data={JsonData.Features_blocks.last_message} textleft={true} />   
                <Features data={JsonData.Features_blocks.digital_service} textleft={false} />   
                <Features data={JsonData.Features_blocks.Partnership} textleft={true} />   
                <Price_Table />
                <Discover_banner boolean_2btn={true} />

                <FreeTrialBanner />

                <Footer />

      
                {/* <Testimonials data={JsonData.Testimonials} /> */}
                {/* <Contact data={JsonData.Contact} /> */}
              
        </div>

        );
}


