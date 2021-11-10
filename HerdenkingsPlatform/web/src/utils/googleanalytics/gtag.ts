//@ts-nocheck

export const GA_TRACKING_ID = " G-PEC504L52G"
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
import Cookies from 'js-cookie';


export const pageview = (url: URL) => {

  const cookieConsent = Cookies.getJSON("ConsentCookie");
  if((cookieConsent.analytical as boolean)===true){    

    
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url
    });
  }

  
};


type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {

 
  const cookieConsent = Cookies.getJSON("ConsentCookie");
  
  if((cookieConsent.analytical as boolean)===true){    

    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
    

 }