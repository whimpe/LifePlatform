import { Button, Switch } from "@material-ui/core";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { CookiePreferences } from "../components/Cookies/CookiePreferences";
import { Layout } from "../components/general/Layout";
import Footer from "../components/landing_page/footer";
import { Layout_LP } from "../components/landing_page/Layout_LP";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import { WithApollo } from "../utils/withApollo";

interface privacyPolicyProps {}

const privacyPolicy: React.FC<privacyPolicyProps> = ({}) => {

  const [cookies, setCookie, removeCookie] = useCookies(["ConsentCookie"]);
  const [analytical, setanalytical] = useState(cookies["ConsentCookie"].analytical);
  const [marketing, setmarketing] = useState(cookies["ConsentCookie"].marketing);
  const [socialmedia, setsocialmedia] = useState(cookies["ConsentCookie"].socialmedia);
  const [pref_open, setpref_open] = useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {setpref_open(false); };


  const accepteerAlles = (e:any) => {
    setCookie( "ConsentCookie", { cookieClicked: true, analytical: true, marketing: true, socialmedia: true, //pixel om te zien van waar traffic komt }, { path: "/", maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years sameSite: true, } );
  })};

  const bevestigVoorkeuren = (e:any) => {
    setCookie( "ConsentCookie", { cookieClicked: true, analytical: analytical, marketing: marketing, socialmedia: socialmedia, //pixel om te zien van waar traffic komt }, { path: "/", maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years sameSite: true, } );
  })};


  return (
    <>
        <Navbar_LP PaginaData={null} share_btn={false} />
        <div className="privacy_policy_container">



        <div className="privacy_policy_title" >Privacybeleid</div>

        <div className="privacy_policy_text" >
          Aeterna processes personal information in compliance with this privacy
          statement. For further information, questions or comments on our
          privacy policy, please contact info@aeterna.be
        </div>

        <div className="privacy_policy_subtitle" > <b>Purposes of the processing</b> </div>

        <div className="privacy_policy_text" >
          Aeterna collects and processes customers’ personal data for customer
          and order management (customer administration, order/delivery
          follow-up, invoicing, solvency follow-up, profiling and the sending of
          marketing and personalised advertising).
        </div>

        <div className="privacy_policy_subtitle" > <b>Legal foundation for the processing</b> </div>

          <div className="privacy_policy_text" >
          Personal data is processed based on Article 6.1. [(a) consent,] [(b)
          (required for the implementation of an agreement),] [(c) (required to
          satisfy a legal obligation)], [(f) (required for the protection of our
          legitimate interest in entrepreneurship)] of the General Data
          Protection Act. [Insofar as the processing of personal data takes
          place based on Article 6.1. a (consent), customers always have the
          right to withdraw the given consent.]
        </div>

        <div className="privacy_policy_subtitle" > <b>Transfer to third parties</b> </div>

          <div className="privacy_policy_text" >
          If required to achieve the set purposes, the customers’ personal data
          will be shared with other companies (in the Aeterna group)
          within the European Economic Area, which are linked directly or
          indirectly with Aeterna or with any other partner of Aeterna.
           Aeterna guarantees that these recipients will take the
          necessary technical and organisational measures for the protection of
          personal data.
        </div>

        <div className="privacy_policy_subtitle" > <b>Retention period</b> </div>

          <div className="privacy_policy_text" >
          Personal data processed for customer management will be stored for the
          time necessary to satisfy legal requirements (in terms of bookkeeping,
          among others).
        </div>

        <div className="privacy_policy_subtitle" > <b> Right to inspection, improvement, deletion, limitation, objection and transferability of personal data{" "} </b> </div>

          <div className="privacy_policy_text" >
          The customer has at all times the right to inspect their personal data
          and can have it improved/improve it should it be incorrect or
          incomplete, have it removed, limit its processing an object to the
          processing of their personal data based on Article 6.1 (f), including
          profiling based on said provisions.
        </div>

          <div className="privacy_policy_text" >
          Furthermore, the customer is entitled to obtain a copy (in a
          structured, standard and mechanically readable form) of their personal
          data and to have said personal data forwarded to another company.
          <br/>
          <br/>

          In order to exercise the aforementioned rights, the customer is
          requested to:
          </div>

          <br/>
          <br/>

        <div>- Adjust the settings of their customer account; and/or</div>

        <div>- Send an e-mail the following address: info@aeterna.be</div>


        <div className="privacy_policy_subtitle" > <b> Direct marketing </b> </div>

        <div className="privacy_policy_text" >
        The customer is entitled to object free of charge to the processing of any processing of their personal data aimed at direct marketing. 
        </div>

        <div className="privacy_policy_subtitle" > <b> Complaint </b> </div>

        <div className="privacy_policy_text" >
        The customer has the right to file a complaint with the Belgian Privacy Protection Commission (35 Rue de la Presse, 1000 Brussels - commission@privacycommission.be).
        </div>


        {/* Deze knop ook niet te duidelijk aan maken wrs? */}
        <button className='privacy_policy_btn' onClick={()=>setpref_open(!pref_open)}>Stel privacy voorkeuren in </button>

      
          {pref_open ? 
            <CookiePreferences cookies={cookies} open={pref_open} setOpen={setpref_open} setCookie={setCookie} onClose={handleClose} />
          :null}

    
      </div>
      <Footer />



    </>
  );
};

export default WithApollo({ ssr: false })(privacyPolicy);
