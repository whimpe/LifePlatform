import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../utils/googleanalytics/gtag";
import { useCookies } from "react-cookie";


export default class MyDocument extends Document {

  render(

  ) {

    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:2496100,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `
            }}
          />
{/* the facebook pixel is activated when Sociale Media is on active */}
          <script
            dangerouslySetInnerHTML={{
              __html:` 
              function str_obj(str) {
                str = str.split(';');
                var result = {};
                for (var i = 0; i < str.length; i++) {
                    var cur = str[i].split('=');
                    result[cur[0]] = cur[1];
                }
                return result;
            }           
          const result = ((str_obj(document.cookie)[" ConsentCookie"].split('%')[16].split('3A')[1])); 
          if(result){
              !function(f,b,e,v,n,t,s)
              {
                
                if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; 
                  n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '556345715522252');
                  fbq('track', 'PageView');
            }

              `
            }}
            />
            <noscript><img height="1" width="1" style={{display:"none"}} src="https://www.facebook.com/tr?id=556345715522252&ev=PageView&noscript=1" /></noscript>
            <meta name="facebook-domain-verification" content="9nqu9c2nb8dib0u3umwfoph9af9vh4" />

    

        </Head>
{/*           //
 */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}