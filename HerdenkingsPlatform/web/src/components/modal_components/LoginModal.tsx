import { default as React,  useState } from 'react';
import { getAccessToken, setAccessToken } from "../../accessToken";
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FiMail } from "react-icons/fi";
import { GrClose } from 'react-icons/gr';
import { MdLock } from "react-icons/md";
import { useFacebookLoginMutation, useGoogleLoginMutation, useLoginMutation, useRegisterMutation, useRequestToVerifyAccountMutation } from '../../generated/graphql';
import gql from "graphql-tag";
import { useRouter } from 'next/router';
import { AiFillEye, AiOutlineUser } from 'react-icons/ai';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import * as gtag from "../../utils/googleanalytics/gtag";
import { CircularProgress } from '@material-ui/core';


 //google TODO==> in env zetten
 const clientId = '904549887963-emi5poeaelal4nk9h5autquu76g011ui.apps.googleusercontent.com';
 const appId = '295807738550744';

interface LoginModalProp{
    title:string;  
    LoginModalClick:boolean;
    setLoginModalClick:any;
    hasAccount:boolean;
    sethasAccount:any;
}  

const LoginModal: React.FC<LoginModalProp> = ({title,LoginModalClick,setLoginModalClick,hasAccount,sethasAccount}) => {
    const router = useRouter();

    // login states
    const [tokenValue, settokenValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setpasswordValue] = useState("");
    const [login] = useLoginMutation();
    const [view_pass, setview_pass] = useState(false);
    const [loading_state, setloading_state] = useState(false);
    
    // register states
    const [nameValue, setnameValue] = useState("");
    const [passwordValue2, setpasswordValue2] = useState("");
    const [Agree, setAgree] = useState(false);
    const [register] = useRegisterMutation();
    const [googleLogin] = useGoogleLoginMutation();
    const [facebookLogin] = useFacebookLoginMutation();
    const [requestToVerifyAccount] = useRequestToVerifyAccountMutation();



    let registreren = async (e:any) => {  
      setloading_state(true);
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
          setloading_state(false);

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
                      } 
                    }  if (typeof router.query.public_token === 'string') {
                      // console.log("push naar :" ,router.query.next);
                      router.reload()
                      setLoginModalClick(false);
                      //werkt wel tov router.push
                      //router.push(router.query.next);
                    
                    } else { 
                        router.push("/account"); }
                    }
            } 
      

    let inloggen = async (e: any) => {
      setloading_state(true);
        const response = await login({
          variables: {
            email: emailValue,
            password: passwordValue,
          },
    
          //ZORGT VOOOR PROBLEMEN IN DE NAVBAR
          update: (cache: any, { data }) => {
            setAccessToken(data?.login.accessToken!);
    
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
                  user: data?.login.user,
                  status: 0,
                },
              },
            });
          },
        });
      setloading_state(false);
        
        if (response && response.data?.login.errors) {
          console.log(response.data?.login.errors);
          alert('wachtwoord of email is niet correct');
        } else {
          // TODO: geeft een error
          gtag.event({ action: 'login', category: 'User', label: 'user', value: 0, });
          
          if (response && response.data?.login.accessToken) {
            setAccessToken(response.data.login.accessToken);
    
            if (typeof router.query.next === 'string') {
              // console.log("push naar :" ,router.query.next);
              window.location.replace(router.query.next);
              //werkt wel tov router.push
              //router.push(router.query.next);
            
            }  if (typeof router.query.public_token === 'string') {
              // console.log("push naar :" ,router.query.next);
              router.reload()
              setLoginModalClick(false);
              //werkt wel tov router.push
              //router.push(router.query.next);
            
            } else {
              // console.log("push naar : /account");
              router.push('/account');
            }
          } else {
            //TODO: handle this
            console.log('hallokes');
          }
        }
      };
    
      
        //todo make geneirc method to login
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
            gtag.event({ action: 'login', category: 'User', label: 'user', value: 0, });
      
            if (response && response.data?.googleLogin.accessToken) {
              setAccessToken(response.data.googleLogin.accessToken);
      
              if (typeof router.query.next === 'string') {
                window.location.replace(router.query.next);
              } if (typeof router.query.public_token === 'string') {
                // console.log("push naar :" ,router.query.next);
                router.reload()
                setLoginModalClick(false);
                //werkt wel tov router.push
                //router.push(router.query.next);
              
              }else {
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
            gtag.event({ action: 'login', category: 'User', label: 'user', value: 0, });
      
            if (response && response.data?.facebookLogin.accessToken) {
              setAccessToken(response.data.facebookLogin.accessToken);
      
              if (typeof router.query.next === 'string') {
                window.location.replace(router.query.next);
           }  if (typeof router.query.public_token === 'string') {
                // console.log("push naar :" ,router.query.next);
                router.reload()
                setLoginModalClick(false);
                //werkt wel tov router.push
                //router.push(router.query.next);
              
              } else {
                router.push('/account');
              }
            } else { console.log('hallokes'); }
          }
        };
      

    return (

        <>    
        <div id="myModal" className='login_modal'>
            <div className="login_modal-content">
                <div className="close_btn_container">
                    <div className="close_button" onClick={(e:any) => {setLoginModalClick(false)}}>                    
                        <GrClose className='close_btn_modal_icon' />
                    </div>
                </div>

                <div className="flashcard_container">   
                    <div className="login_modal_text_container">

            <div className="login_input_container">
              <div className="login_modal_title">{hasAccount ? 'Inloggen ': 'Registreren '}{title}</div>

              <FacebookLogin
                appId={appId}
                autoLoad={false}
                callback={(e:any)=>{facebookInloggen}}
                data-use-continue-as={true}
                cssClass={'facebook_login_btn'}
                disableMobileRedirect={true}
                isMobile={false}
                icon={<FaFacebook className='fb_login_icon' />}
                language={'nl_NL'}
                textButton='Inloggen met Facebook'
              />
              <GoogleLogin
                className='google_login_btn'
                clientId={clientId}
                onSuccess={(e:any)=>{googleInloggen}}
                onFailure={(e:any)=>{googleInloggen}}
                buttonText={'Inloggen met Google'}
                cookiePolicy={'single_host_origin'}
                render={(renderProps: any) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className='google_login_btn'
                  >
                    {' '}
                    <FcGoogle className='gg_login_icon' />
                    Inloggen met Google{' '}
                  </button>
                )}
              />
              <div className='OR_line'> <span>OF</span> </div>

              {hasAccount ?
              <>

              <div className="login_label">Email</div>

              <div className="login_input_box"  onClick={()=>document.getElementById('email')?.focus()}>  <FiMail className="input_login_icon" /> <input placeholder="Email" id='email' className="login_input_field" onChange={(e: any) => setEmailValue(e.target.value)} ></input> </div>
              <div className="login_label">Wachtwoord</div>
              <div className="login_input_box"  onClick={()=>document.getElementById('password')?.focus()}>  <MdLock className="input_login_icon" /> <input placeholder="Wachtwoord"  id='password' className="login_input_field" type={view_pass ? "text" :"password"}  onChange={(e: any) => setpasswordValue(e.target.value)} ></input> <AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)}/> </div>


              <div className="login_options_container">     
                <a className="forgot_password_link" href="/forgot-password"> Wachtwoord vergeten? </a>
              </div>

              <div className="login_btn" onClick={(e: any) => {inloggen(e);}}> {loading_state ?<CircularProgress color='secondary' size={30}  />: "Inloggen"} </div>


              <div className="no_account_container">Hebt u nog geen account?
              <div onClick={(e:any)=>sethasAccount(false)} className="no_account_register_link">Registreer hier</div>
              </div>
              </>
            :
            
            <>
            <div className="login_label"  >Volledige naam</div>
            <div className="login_input_box"  onClick={()=>document.getElementById('full_name')?.focus()}>  <AiOutlineUser className='input_login_icon'/><input  placeholder='Voor - en achternaam' id='full_name' className='login_input_field' onChange={(e:any)=>setnameValue(e.target.value)}></input></div>
          
            <div className="login_label"  >Email</div>
            <div className="login_input_box"  onClick={()=>document.getElementById('email_register')?.focus()}>  <FiMail className='input_login_icon'/><input  placeholder='Email' id='email_register' className='login_input_field' type="email" onChange={(e:any)=>setEmailValue(e.target.value)}></input></div>
          
            <div className="login_label">Wachtwoord</div>          
            <div className="login_input_box"  onClick={()=>document.getElementById('password')?.focus()}>  <MdLock className='input_login_icon'/><input  placeholder='Wachtwoord' id='password' className='login_input_field' type={view_pass ? "text" :"password"}  onChange={(e:any)=>setpasswordValue(e.target.value)}></input> <AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)}/></div>          

            <div className="login_options_container">

            <div className="stay_logged_in" ><input type="checkbox" id="stay_logged_in" value="stay_logged_in" className="stay_logged_in"  onChange={(e:any)=>setAgree(e.target.checked)}/> Ik heb de <a href='/terms-and-conditions' className='terms_conditions_link'>Algemene Voorwaarden</a> en <a href='/privacy-policy' className='terms_conditions_link'>privacybeleid </a> gelezen en ga hiermee akkoord</div>
            </div>

            <div className="login_btn" onClick={(e:any)=>{registreren(e)}}> {loading_state ?<CircularProgress color='secondary' size={30}  />: "Registreren"}</div>

            <div className="no_account_container">Heeft u al een account? <div onClick={(e:any)=>sethasAccount(true)} className='no_account_register_link'>Log in</div></div>
            </>                                   
            }


            </div>
          </div>              
 
                        
                </div>     
            </div> 
        </div>
        </>

    
    )
}

export default LoginModal;

