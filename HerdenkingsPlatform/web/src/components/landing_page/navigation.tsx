import React, { useEffect, useState } from "react";
//import logo from './data/logo_aet_white.png'; // Tell webpack this JS file uses this image
import JsonData from '../../../assets/static_text.json';
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { Flex ,Spinner} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { FaBars, FaRegTimesCircle, FaTimes } from "react-icons/fa";
import { GiTrumpetFlag } from "react-icons/gi";
import { setAccessToken } from "../../accessToken";
import { CircularProgress } from "@material-ui/core";


interface NavigationProps {
  dark_nav:boolean;
}

export const Navigation: React.FC<NavigationProps> = ({dark_nav}) => {
  
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const [mobile_click, setmobile_click] = useState(true);

  const { data: meData, loading: Meloading } = useMeQuery({skip: isServer(),});

  const openNav= () => {
    setmobile_click(!mobile_click);

  }
  const uitloggen = async () => {
    await logout({
      update: (cache: any) => {
        setAccessToken("");
        cache.evict({ fieldName: "me:({})" });
        cache.gc();
      }
    });
    await apolloClient.clearStore().then(
      () => {
        //TODO: dubbel? setAccessToken?
        setAccessToken("");
        //
      }  
    )
    location.reload();
    router.push("/");
  }
  

  if (Meloading) {
    return(<Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex> )
  }
  
  let account=null;

  // not logged in
  if (meData?.me===null) {
    account = (      
      <>
      <div className='nav_links_lp' style={ dark_nav ? {color:'#000'} : {color:'#fff'}} onClick={() => {router.push("/login"); setmobile_click(true);}}>Inloggen</div>
      <div className= 'start_nav_btn' style={ dark_nav ? {color:'#000',backgroundColor:'#F1CC76'} : {}} onClick={() => {router.push("/register"); setmobile_click(true);}}>Start Nu </div>
      </>
    );
  }
// when logged in
else{
  account = (
          <>
            <a className='nav_links_lp' style={ dark_nav ? {color:'#000'} : {color:'#fff'}}                  
                onClick={async (e:any) => {uitloggen()}}>uitloggen</a>  

            <a className='start_nav_btn' onClick={() => {router.push("/account"); setmobile_click(true);}}>{meData?.me?.user?.username}</a>

          </>

    );
  }

// mobile menu activates with smaller screens
let sidebar_menu=(
  
  <div className={mobile_click ? "sidenav_close":"sidenav" }>
    <FaRegTimesCircle  className='close_btn_mobile' onClick={openNav}  />
    <a onClick={()=>{router.push(`/aan-de-slag`); setmobile_click(true);}}>Aan de slag</a>
    <a onClick={()=>{router.push(`/digitaliseren`); setmobile_click(true);}}>Digitaliseer media</a>
    <a onClick={()=>{router.push(`/ons-verhaal`); setmobile_click(true);}}>Over ons</a>
    {!meData?.me ? 
    <>
          <a  onClick={() => {router.push("/login"); setmobile_click(true);}} >Inloggen</a>
          <a  onClick={() => {router.push("/register"); setmobile_click(true);}}> Start Nu</a>
    </>
    : 
    <>
          <a onClick={() => {router.push("/account"); setmobile_click(true);}}>Uw Levensverhalen</a>

          <a  onClick={async (e:any) => {
                  await logout();
                  await apolloClient.clearStore().then(
                    () => {
                      setAccessToken("");
                      setmobile_click(true);
                      location.reload();
                    }                      
                  );
                  

                }}>uitloggen</a>  
    </>
    }
  </div>
);
    
    return (
<>
     
    
{sidebar_menu}
    {mobile_click ? (
    <div className='nav_container_lp'>        
      <a href="/"><img alt="Aeterna.be"  className="logo_img" src={ dark_nav ? "img/logos/logo_black.svg":"img/logos/logo_white.svg"}></img></a>
            
            <div className='nav_mobileIcon_lp'>
              {mobile_click ?  <FaBars style={ dark_nav ? {color:'#000',textShadow:'none'} : {color:'#fff'}} onClick={openNav} /> : null}
            </div>
            
                <div className='aet_nav_btn_lp'>
                <div className='nav_links_lp' style={ dark_nav ? {color:'#000',textShadow:'none'} : {color:'#fff'}} onClick={()=>{router.push(`/aan-de-slag`)}}>Aan de slag</div>
                <div className='nav_links_lp' style={ dark_nav ? {color:'#000',textShadow:'none'} : {color:'#fff'}} onClick={()=>{router.push(`/digitaliseren`)}}>Digitaliseer media</div>
                <div className='nav_links_lp' style={ dark_nav ? {color:'#000',textShadow:'none'} : {color:'#fff'}} onClick={()=>{router.push(`/ons-verhaal`)}}>Over ons</div>
                {/* <div className='nav_links_lp' style={ dark_nav ? {color:'#000',textShadow:'none'} : {color:'#fff'}} onClick={()=>{router.push(`/contact`)}}>Contact</div> */}

                    {account}
                </div>
        </div>
  
    ):
    (
      <div className='nav_container_lp'>        
      <div className='nav_mobileIcon_lp'>
    {mobile_click ?  <FaBars  onClick={openNav} /> : <FaTimes onClick={openNav} />}
    </div></div>) }
    
    </>
    );
  }


export default Navigation;


