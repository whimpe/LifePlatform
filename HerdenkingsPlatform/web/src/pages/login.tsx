import { useApolloClient } from '@apollo/client';
import { __Directive } from 'graphql';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiMail } from 'react-icons/fi';
import { MdLock } from 'react-icons/md';
import { setAccessToken } from '../accessToken';
import MetaTags from '../components/general/MetaTags';
import Navbar_LP from '../components/landing_page/Navbar_LP';
import {
  useLoginMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
  useRegisterMutation,
} from '../generated/graphql';
import { useGetStringFromUrl } from '../utils/useGetIntFromUrl';
import { WithApollo } from '../utils/withApollo';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import * as gtag from '../utils/googleanalytics/gtag';
import Footer_Logo from '../components/display/Footer_Logo';
import { AiFillEye } from 'react-icons/ai';

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();
  //google TODO==> in env zetten
  const clientId =
    '904549887963-emi5poeaelal4nk9h5autquu76g011ui.apps.googleusercontent.com';

  const appId = '295807738550744';

  const apolloClient = useApolloClient();

  const [tokenValue, settokenValue] = useState('');
  const [googleClick, setgoogleClick] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [googleID, setGoogleIDValue] = useState('');
  const [userName, setUserNameValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');
  const [view_pass, setview_pass] = useState(false);

  const public_token = useGetStringFromUrl('public_token');

  let inloggen = async (e: any) => {
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
      <MetaTags
        title={'Login'}
        type_of_page={''}
        description={''}
        mediaUrl={''}
      />

      <div className='background_dashboard'>
        <Navbar_LP PaginaData={null} share_btn={false} />

        <div className='login_container'>
          {/* IMAGEVIEWER */}
          <div className='login_img_viewer_container'>
            <div className='login_image'>
              <img src={'/img/landing_page/login_image2.jpg'} alt='Aeterna' />
            </div>
          </div>

          {/* INPUT LOGIN  */}
          <div className='login_text_container'>
            <div className='login_input_container'>
              <div className='login_title'>Log in</div>

              <FacebookLogin
                appId={appId}
                autoLoad={false}
                callback={facebookInloggen}
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
                onSuccess={googleInloggen}
                onFailure={googleInloggen}
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
              <div className='OR_line'>
                {' '}
                <span>OF</span>{' '}
              </div>

              <form>
                <div className='login_label'>Email</div>
                <div className='login_input_box'>
                  <FiMail className='input_login_icon' />
                  <input
                    placeholder='Email'
                    name='username'
                    className='login_input_field'
                    onChange={(e: any) => setEmailValue(e.target.value)}
                  ></input>
                </div>
            
            <div className='login_label'>Wachtwoord</div>
            <div className="login_input_box"  onClick={()=>document.getElementById('password')?.focus()}  >  
              <MdLock className='input_login_icon'/> <input  placeholder='Wachtwoord' id='password' className='login_input_field'type={view_pass ? "text" :"password"} name='password' autoComplete="new-password" onChange={(e:any)=>setpasswordValue(e.target.value)}>
              </input><AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)}/> </div>


              </form>

              <div className='login_options_container'>
                <a className='no_account_register_link' href='/forgot-password'> {' '} Wachtwoord vergeten?{' '} </a> </div>

              <div className='login_btn' onClick={(e: any) => { inloggen(e); }} > {' '} Inloggen{' '} </div>

              <div className='no_account_container'>
                Hebt u nog geen account?
                <a href={'/register'} className='no_account_register_link'> {' '} Registreer hier{' '} </a>
              </div>
            </div>
          </div>
        </div>
        <Footer_Logo />
      </div>
    </>
  );
};

export default WithApollo({ ssr: true })(Login);

// in nextjs in the pages folder, the name of the file is automatically a route
