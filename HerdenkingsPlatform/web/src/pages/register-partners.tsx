import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineNumber, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { MdLocationCity, MdLocationOn, MdLock } from "react-icons/md";
import { setAccessToken } from "../accessToken";
import MetaTags from "../components/general/MetaTags";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import {
  useLoginMutation,
  useRegister_PartnerMutation,
  useRequestToVerifyAccountMutation,
} from "../generated/graphql";
import { WithApollo } from "../utils/withApollo";

import * as gtag from "../utils/googleanalytics/gtag";
import { PARTNER_TYPE } from "../constants";
import { GoLocation } from "react-icons/go";
import { GiBelgium } from "react-icons/gi";
import { CircularProgress } from "@material-ui/core";

export const Register_Partner: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [register_partner] = useRegister_PartnerMutation();

  const [tokenValue, settokenValue] = useState("");
  const [googleClick, setgoogleClick] = useState(false);
  const [nameValue, setnameValue] = useState("");
  const [mobile_numberValue, setmobile_numberValue] = useState("+32");
  const [PartnerNameValue, setPartnerNameValue] = useState("");
  const [VAT_value, setVAT_value] = useState("");
  const [streetValue, setstreetValue] = useState("");
  const [street_numberValue, setstreet_numberValue] = useState("");
  const [cityValue, setcityValue] = useState("");
  const [city_postcodeValue, setcity_postcodeValue] = useState("");
  const [countryValue, setcountryValue] = useState("België");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const [loading_state, setloading_state] = useState(false);
  const [Agree, setAgree] = useState(false);
  const [requestToVerifyAccount] = useRequestToVerifyAccountMutation();



  let registreren = async (e: any) => {
    setloading_state(true);
    if (Agree !== true) {
      return alert(
        "U moet akkoord gaan met de Algemene Voorwaarden om verder te gaan."
      );
    }
    e.preventDefault();

    const values = { username: nameValue, email: emailValue, password: passwordValue, };
    const partnervalues = { mobile_phone: mobile_numberValue, name_partner: PartnerNameValue, vat_number: VAT_value, street: streetValue, street_number:street_numberValue , city: cityValue, city_postcode: city_postcodeValue, country: countryValue };
    const response = await register_partner({
      variables: {
        options: values,
        partner_type: PARTNER_TYPE.FUNERAL_UNDERTAKER, //TODO selecteer partnertype
        partnerdata: partnervalues,
      },

      update: (cache: any, { data }) => {
        setAccessToken(data?.register_partner.accessToken!);

        cache.writeQuery({
          query: gql`
            query writeRegisterToCache($paginaId: String) {
              me(paginaId: $paginaId) {
                user
                status
              }
            }
          `,
          data: {
            me: {
              __typename: "MeResponse",
              user: data?.register_partner.user,
              status: 0,
            },
          },
        });
      },
    });
    if (response && response.data?.register_partner.accessToken) {
      console.log( "bij register instellen", response.data.register_partner.accessToken );
      setAccessToken(response.data.register_partner.accessToken);
    }

    if (response.data?.register_partner.errors) {
      // TODO aanpassen
      // setErrors(toErrorMap(response.data.register.errors));
      alert(response.data?.register_partner.errors[0].message);
      console.log(response.data?.register_partner.errors);
      setloading_state(false);

    } else {
      gtag.event({ action: "register_partner", category: "User", label: "user", value: 0, });

      await requestToVerifyAccount({ variables: { email: emailValue } });
      if (response.data?.register_partner.user) {
        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        } else {
          setloading_state(false);
          alert( "Welkom als partner bij Aeterna.be. " );
          router.push("/dashboard");
          
        }
      }
    }
    setloading_state(false);    
  };

  return (
    <>
      <MetaTags
        title={"Register"}
        type_of_page={""}
        description={""}
        mediaUrl={""}
      />

      <div className="background_dashboard">
        <Navbar_LP PaginaData={null} share_btn={false} />


          <div className="login_partner_title">Registreer Begrafenisondernemer</div>
          <div className="login_partner_container">

          <div className="login_text_container">
            <div className="login_input_container">
              
                <div className="login_label">Bedrijfsnaam</div>
                <div className="login_input_box">               
                  <AiOutlineUser className="input_login_icon" /> <input placeholder="Uitvaart Bvba" className="login_input_field" autoComplete="organization" onChange={(e: any) => setPartnerNameValue(e.target.value)} ></input>
                </div>

                <div className="login_label">Mobiel nummer</div>
                <div className="login_input_box">                 
                  <AiOutlinePhone className="input_login_icon" /> <input placeholder="+32" className="login_input_field"   autoComplete="tel" onChange={(e: any) => setmobile_numberValue(e.target.value)} ></input>
                </div>

                <div className="login_label">BTW nummer *</div>
                <div className="login_input_box">                 
                <p className="input_login_icon">BE</p> <input placeholder="0123.456.789" className="login_input_field"  onChange={(e: any) => setVAT_value(e.target.value)} ></input>
                </div>

                <div className="login_label">Straat</div>
                <div className="login_input_box">                 
                <GoLocation className="input_login_icon" /><input placeholder="Dorpstraat" className="login_input_field" autoComplete="street-address" onChange={(e: any) => setstreetValue(e.target.value)} ></input>
                </div>

                <div className="login_half_container"> 
                <div className="login_half_box">
                  <div className="login_label">Huisnummer</div>
                  <div className="login_input_box">                 
                    <AiOutlineNumber className="input_login_icon" /> <input placeholder="1 bus A" className="login_input_field" onChange={(e: any) => setstreet_numberValue(e.target.value)} ></input>
                  </div>
                </div>
                
                <div className="login_half_box">
                  <div className="login_label">Postcode</div>
                  <div className="login_input_box">                 
                    <MdLocationOn className="input_login_icon" /> <input placeholder="1000" className="login_input_field" autoComplete="postal-code" onChange={(e: any) => setcity_postcodeValue(e.target.value)} ></input>
                  </div>
                  </div>
                </div>

                <div className="login_label">Stad</div>
                <div className="login_input_box">                 
                  <MdLocationCity className="input_login_icon" /> <input placeholder="Brussel" className="login_input_field" autoComplete="address-level2" onChange={(e: any) => setcityValue(e.target.value)} ></input>
                </div>

                <div className="login_label">Land</div>
                <div className="login_input_box">                 
                  <GiBelgium className="input_login_icon" /> <input placeholder="België" className="login_input_field" autoComplete="country" value={countryValue} onChange={(e: any) => setcountryValue(e.target.value)} ></input>
                </div>   
                <div className="required_label">* verplicht</div>
       

            </div>
          </div>


          {/* INPUT LOGIN  */}
          <div className="login_text_container">
            <div className="login_input_container">

        
            <div className="login_label">Gebruikersnaam </div>
              <div className="login_input_box">               
                <AiOutlineUser className="input_login_icon" /> <input placeholder="Voor - en achternaam" className="login_input_field" autoComplete="name" onChange={(e: any) => setnameValue(e.target.value)} ></input>
              </div>
      
              <div className="login_label">Email *</div>
                <div className="login_input_box">                 
                  <FiMail className="input_login_icon" /> <input placeholder="Email" className="login_input_field" type="email" name="username" autoComplete="email" onChange={(e: any) => setEmailValue(e.target.value)} ></input>
                </div>

              <form>


           
   
                <div className="login_label">Wachtwoord *</div>
                <div className="login_input_box">                 
                  <MdLock className="input_login_icon" /> <input placeholder="Wachtwoord" className="login_input_field" type="password" name="password" autoComplete="new-password" onChange={(e: any) => setpasswordValue(e.target.value)} ></input>
                </div>



                <div className="login_options_container">
                  <input type="checkbox" id="stay_logged_in" value="stay_logged_in" className="accept_checkbox_register" onChange={(e: any) => setAgree(e.target.checked)} />
                  <div className="stay_logged_in"> Ik ga akkoord met de <a href="/terms-and-conditions" className="terms_conditions_link" > Algemene Voorwaarden </a> en <a href="/privacy-policy" className="terms_conditions_link"> Privacybeleid </a> . </div>
                </div>

                <div className="login_btn" onClick={(e: any) => { registreren(e); }} > {loading_state ?<CircularProgress color='secondary' size={30}  />: "Registreren"} </div>
                <div className="no_account_container"> Heeft u al een account? 
                  <a href={"/login"} className="no_account_register_link"> Log in </a> 
                </div>
                
              </form>
            </div>
          </div>


        </div>





        <div
          className="dashboard_footer"
          onClick={() => {
            router.push("/#home");
          }}
        >
          <img
            src="img/logos/logo_black.svg"
            alt="Aeterna"
            className="dashboard_footer_img"
          />
        </div>
      </div>
    </>
  );
};

export default WithApollo({ ssr: true })(Register_Partner);
