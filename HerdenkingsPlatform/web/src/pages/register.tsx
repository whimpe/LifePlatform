import gql from "graphql-tag";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillEye, AiOutlineUser } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { setAccessToken } from "../accessToken";
import MetaTags from "../components/general/MetaTags";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import { useFacebookLoginMutation, useGoogleLoginMutation, useLoginMutation, useRegisterMutation, useRequestToVerifyAccountMutation } from "../generated/graphql";
import { WithApollo } from "../utils/withApollo";
import { CircularProgress } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


import * as gtag from "../utils/googleanalytics/gtag";


export const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [tokenValue, settokenValue] = useState("");
  const [googleClick, setgoogleClick] = useState(false);
  const [nameValue, setnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const [view_pass, setview_pass] = useState(false);
  const [loading_state,setloading_state] = useState(false);

  // const [passwordValue2, setpasswordValue2] = useState("");
  const [Agree, setAgree] = useState(false);
  const [requestToVerifyAccount] = useRequestToVerifyAccountMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();

  const clientId = '904549887963-emi5poeaelal4nk9h5autquu76g011ui.apps.googleusercontent.com';
  const appId = '295807738550744';

  const responseGoogle = async (res: any) => {
    console.log(res);
    await res;
    settokenValue(res.tokenId);
    setEmailValue(res.profileObj.email);
    setgoogleClick(true);
  };

  let registreren = async (e:any) => {  
    if(Agree!== true){
      return alert('U moet akkoord gaan met de Algemene Voorwaarden om verder te gaan.')
    } 
    e.preventDefault();
 
    const values = { username: nameValue,email: emailValue,password: passwordValue}
    const response = await register({
            variables: { options: values },

            update: (cache: any, { data }) => {

              setAccessToken(data?.register.accessToken!);
      
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
                    user: data?.register.user,
                    status: 0,
                  },
                },
              });
            },
              
                });
                if(response && response.data?.register.accessToken) {
                  console.log("bij register instellen",response.data.register.accessToken);
                  setAccessToken(response.data.register.accessToken);
                }
      
                if (response.data?.register.errors) {
                  alert(response.data?.register.errors[0].message);
                  console.log(response.data?.register.errors)
                } else{

                  gtag.event({action:"register",category:"User",label:"user",value:0});
                  requestToVerifyAccount({variables: { email: emailValue }});                    
                  alert('Er is een een verificatie-email gestuurd. Ga naar uw email inbox, en verifieer uw account.')
                  if (response.data?.register.user) {
                    if (typeof router.query.next === "string") {                      
                      router.push(router.query.next);
                    } else { 
                      router.push("/account"); }
                  }
                } 
    }

  let googleInloggen = async (e: any) => {
      const response = await googleLogin({
        variables: {
          googleId: e.tokenId,
        },
  
        //ZORGT VOOOR PROBLEMEN IN DE NAVBAR
        update: (cache: any, { data }) => {
          setAccessToken(data?.googleLogin.accessToken!);
  
          cache.writeQuery({
            query: gql`
              query writeLoginToCache($paginaId: String) {
                me(paginaId: $paginaId) {
                  user
                  status
                }
              }
            `,
            data: {
              me: {
                __typename: 'MeResponse',
                user: data?.googleLogin.user,
                status: 0,
              },
            },
          });
        },
      });
  
      if (response && response.data?.googleLogin.errors) {
        console.log(response.data?.googleLogin.errors);
        alert('Gelieve eerst te registreren');
      } else {
        // TODO: geeft een error
        gtag.event({
          action: 'login',
          category: 'User',
          label: 'user',
          value: 0,
        });
  
        if (response && response.data?.googleLogin.accessToken) {
          setAccessToken(response.data.googleLogin.accessToken);
  
          if (typeof router.query.next === 'string') {
            window.location.replace(router.query.next);
          } else {
            router.push('/account');
          }
        } else {
          console.log('hallokes');
        }
      }
    };
  
  let facebookInloggen = async (e: any) => {
      console.log(e.accessToken, e.userID);
      console.log(typeof e.userID);
      const response = await facebookLogin({
        variables: {
          accessToken: e.accessToken,
          userID: e.userID,
        },
  
        //ZORGT VOOOR PROBLEMEN IN DE NAVBAR
        update: (cache: any, { data }) => {
          setAccessToken(data?.facebookLogin.accessToken!);
  
          cache.writeQuery({
            query: gql`
              query writeLoginToCache($paginaId: String) {
                me(paginaId: $paginaId) {
                  user
                  status
                }
              }
            `,
            data: {
              me: {
                __typename: 'MeResponse',
                user: data?.facebookLogin.user,
                status: 0,
              },
            },
          });
        },
      });
  
      if (response && response.data?.facebookLogin.errors) {
        console.log(response.data?.facebookLogin.errors);
        alert('Gelieve eerst te registreren');
      } else {
        // TODO: geeft een error
        gtag.event({
          action: 'login',
          category: 'User',
          label: 'user',
          value: 0,
        });
  
        if (response && response.data?.facebookLogin.accessToken) {
          setAccessToken(response.data.facebookLogin.accessToken);
  
          if (typeof router.query.next === 'string') {
            window.location.replace(router.query.next);
          } else {
            router.push('/account');
          }
        } else {
          console.log('hallokes');
        }
      }
    };
  
  
  return (

  <>
  <MetaTags title={'Register'} type_of_page={''} description={''} mediaUrl={''} />

  <div className='background_dashboard'>

    <Navbar_LP   PaginaData={null} share_btn={false}  />

    <div className="login_container">
        {/* IMAGEVIEWER */}
      <div className="register_img_viewer_container">
        <div className="login_image"><img src={'/img/landing_page/login_image2.jpg'} alt='Aeterna'/></div>
      </div>


        {/* INPUT LOGIN  */}
      <div className="login_text_container">

          <div className="login_input_container">
          <div className="login_title">Maak een Account</div>
          <FacebookLogin appId={appId} autoLoad={false} callback={facebookInloggen} data-use-continue-as={true} cssClass={'facebook_login_btn'} icon = {<FaFacebook className='fb_login_icon' />} language={"nl_NL"} textButton='Inloggen met Facebook' />
          <GoogleLogin className='google_login_btn' clientId={clientId} onSuccess={googleInloggen} onFailure={googleInloggen} buttonText={"Inloggen met Google"} cookiePolicy={'single_host_origin'} render={(renderProps:any) => ( <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google_login_btn'> <FcGoogle className='gg_login_icon' />Inloggen met Google </button> )} />
          <div className='OR_line'> <span>OF</span> </div>

            <form>
            <div className="login_label"  >Volledige naam</div>
            <div className="login_input_box"  onClick={()=>document.getElementById('name')?.focus()}>  <AiOutlineUser className='input_login_icon'/><input  placeholder='Voor - en achternaam' id='name' className='login_input_field' autoComplete='name' onChange={(e:any)=>setnameValue(e.target.value)}></input></div>
          
            <div className="login_label"  >Email</div>
            <div className="login_input_box" onClick={()=>document.getElementById('email')?.focus()} >  <FiMail className='input_login_icon'/> <input  placeholder='Email' id='email' className='login_input_field' type="email" name='username'  autoComplete="username email" onChange={(e:any)=>setEmailValue(e.target.value)}></input></div>
          
            <div className="login_label">Wachtwoord</div>          
            <div className="login_input_box"  onClick={()=>document.getElementById('password')?.focus()}  >  <MdLock className='input_login_icon'/> <input  placeholder='Wachtwoord' id='password' className='login_input_field'type={view_pass ? "text" :"password"} name='password' autoComplete="new-password" onChange={(e:any)=>setpasswordValue(e.target.value)}></input><AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)}/> </div>
            
            {/* <div className="login_label">Herhaal Wachtwoord</div>          
            <div className="login_input_box" >  <MdLock className='input_login_icon'/> <input  placeholder='Wachtwoord' className='login_input_field' type="password" onChange={(e:any)=>setpasswordValue2(e.target.value)}></input></div>
             */}

            <div className="login_options_container">
           <input type="checkbox" id="stay_logged_in" value="stay_logged_in" className="accept_checkbox_register"  onChange={(e:any)=>setAgree(e.target.checked)}/>  <div className="stay_logged_in" >Ik ga akkoord met de<a href='/terms-and-conditions' className='terms_conditions_link'>Algemene Voorwaarden</a> en <a href='/privacy-policy' className='terms_conditions_link'>Privacybeleid </a>.</div>
            </div>

            <div className="login_btn"onClick={(e: any) => { registreren(e); }} > {loading_state ?<CircularProgress color='secondary' size={30}  />: "Registreren"}</div>

            <div className="no_account_container">Heeft u al een account? <a href={'/login'} className='no_account_register_link'>Log in</a></div>
            </form>


          </div>
      </div>
    </div>
{/* TODO:HIMPE opmaak */}
    {/* <div onClick={() => {
        router.push("/register-partners");
      }}>
        <div> Registreer als partner </div>
      </div> */}


    <div className="dashboard_footer" onClick={()=>{router.push("/#home")}}>
        <img src="img/logos/logo_black.svg" alt="Aeterna"  className="dashboard_footer_img"/>       
    </div>

    

    </div>

  </>
  
  );
};


export default WithApollo({ ssr: true })(Register);



