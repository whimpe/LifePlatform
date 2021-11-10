import { useDisclosure } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@material-ui/styles";

//stylesheet react bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'
import  Router  from "next/router";
import * as gtag from "../utils/googleanalytics/gtag";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import nlLocale from "date-fns/locale/nl";

        
import '../../public/css/condolences.scss';
import '../../public/css/grid_style.scss';
import '../../public/css/index_page.scss';
import '../../public/css/landing_page.scss';
import '../../public/css/memories.scss';
import '../../public/css/modal_designs.scss';
import '../../public/css/NavBar.scss';
import '../../public/css/personal_message.scss';
import '../../public/css/settings.scss';
import '../../public/css/timeline.scss';
import '../../public/css/_base.scss';
import '../../public/css/menu.scss';
import '../../public/css/messages.scss';

// import 'swiper/dist/css/swiper.css'

import "../../node_modules/swiper/swiper-bundle.css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import { setAccessToken } from "../accessToken";
import { CookieConsent } from "../components/Cookies/CookieConsent";





export const theme_aeterna = createMuiTheme({
  palette: {
    primary:{
      light: '#F8E5BB',
      main: '#fcc138',
      dark: '#fcc138', 
      contrastText:'#403620',
    },
  secondary: {
    light: '#ff7961',
    main: '#403620',
    dark: '#ba000d',
    contrastText: '#000',
    },
    error: {
    main: '#F77777'
    },
   
  },

});



Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))



function MyApp({ Component, pageProps }: any) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // TODO - is this required now that we have the token refresh link?
    fetch(process.env.NEXT_PUBLIC_REFRESH_URL!, { method: 'POST', credentials: 'include' }).then(async (x) => {
      const { accessToken } = await x.json()
      setAccessToken(accessToken);
      setLoading(false);
    })
    

    
  }, [])

  if (loading) {
    return (<div>...</div>)
  }


  return (
    <>
     <ThemeProvider theme={theme_aeterna}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}  locale={nlLocale}>
        <Component {...pageProps} />
      </MuiPickersUtilsProvider>
    </ThemeProvider>

    <CookieConsent />

    </>

  );
}


export default MyApp;
