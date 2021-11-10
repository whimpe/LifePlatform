import { useApolloClient } from '@apollo/client';
import { Box } from '@chakra-ui/core';
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import { IoArrowForwardCircle } from 'react-icons/io5';
// import {logo} from 'img/logos/logo_black.png';
import JsonData from "../../../assets/static_text.json";
import { setAccessToken } from '../../accessToken';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import Public_token from '../../pages/PLATFORM/[public_token]';
import { get_year } from '../../utils/FormatDate';
import { isServer } from '../../utils/isServer';
import ShareModal from '../modal_components/ShareModal';
import Navbar_LP_mobile from './Navbar_LP_mobile';


interface Navbar_LPProps {
  PaginaData: any;
  share_btn:any;
}

export const Navbar_LP: React.FC<Navbar_LPProps> = ({PaginaData,share_btn}) => {



  const { data: meData, loading: Meloading, error: MeError } = useMeQuery({
    skip: isServer(),
    // we only want this query to run when in the browser!
  });

   const [mobMenu, setmobMenu] = useState(false);

   var account = null;
   const router = useRouter();
   const [logout, { loading: logoutFetching }] = useLogoutMutation();
   const apolloClient = useApolloClient();
   const [ShareModalClick, setShareModalClick] = useState(false);


   if(Meloading) {
    //TODO: loader insteken?
    return (<div>
    </div>)
  }
  

   const uitloggen = async (e:any) => {
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
       
        }  
      )
      router.push("/");
    }  
     
    console.log(meData);
    

    if(Meloading) {
      //TODO: loader insteken?
      return (<div>
      </div>)
    }
    

    const mql = window.matchMedia('(max-width: 768px)');
    let mobileView = mql.matches;

    return (
        <>





        <div className="nav_dashboard">
        <div className='nav_dashboard_container'>    

          {/* LOGO OR MEMORYPAGE NAME */}
          {PaginaData !== null ?              
            <div className="nav_name_container"  onClick={()=>router.push(`/PLATFORM/${PaginaData!.herdenkingspaginaprivatetoken!.id}`)} >
              <img src="/img/icons/return_btn.svg" alt="Aeterna" className='return_settings_icon' />                         
              <div className="nav_text_containter">
                <div className="nav_name_text_lp"> {PaginaData!.herdenkingspaginaprivatetoken!.name_of_page}</div>
                <div className="nav_date">{mobileView ?null: <> {get_year(PaginaData!.herdenkingspaginaprivatetoken!.DoB)}{PaginaData!.herdenkingspaginaprivatetoken!.DoD ? <>- {get_year(PaginaData!.herdenkingspaginaprivatetoken!.DoD)}</>:null}</>}</div>
              </div>
            </div>
            : 
            <img src={JsonData.Header.black_logo} alt="Aeterna" className='nav_dashboard_logo'  onClick={()=>router.push("/")} /> 
            }
                
                
          {/* ACCOUNTMENU OR RETURN HOME */}
          {console.log(meData)}
          {(meData?.me?.user?.id===undefined)?  (                        
          
        <>

                <div className="nav_dashboard_account"  onClick={(e:any)=>router.push(`/`)} >                                        
                    <div className="return_home_container">
                      <div className="return_home_text">Terug naar welkomspagina</div>                     
                      <IoArrowForwardCircle  className='return_home_icon'/>
                    </div>
                </div>  
      </>

    ):(
<>
<div className='nav_dashboard_account'>

      {share_btn ? 
        <>
        <div className='droplet_share_btn' onClick={(event:any)=> {setShareModalClick(true)}}>
          <div className="droplet_share_btn_text">LEVENSTIJDLIJN DELEN</div> <FaShare className='droplet_share_btn_icon' />
        </div>
        <ShareModal ShareModalClick={ShareModalClick} setShareModalClick={setShareModalClick} name_of_page={PaginaData?.herdenkingspaginaprivatetoken?.name_of_page} public_link={`https://aeterna.be/PLATFORM/${PaginaData?.herdenkingspaginaprivatetoken?.id}`} private_link={`https://aeterna.be/PLATFORM/${PaginaData?.herdenkingspaginaprivatetoken?.private_token}`} />
        </>
       :null} 

    {mobileView ? 
      <><Navbar_LP_mobile meData={meData} uitloggen={uitloggen} PaginaData={PaginaData} ShareModalClick={ShareModalClick} setShareModalClick={setShareModalClick} /> </>
      : 
        <div className="dropdown">
            <button className='nav_dashboard_account_btn'>
              <AiOutlineUser className='nav_dashboard_user_icon' />{meData?.me?.user?.username}<BsChevronDown className='nav_dashboard_arrow_icon'/>                      
            </button>
              <div className="dropdown_content">
                  <a href="/account" >Levensverhalen </a>                
                  {meData?.me?.partner_type! >=0 ?  <a href="/dashboard">Partner dashboard</a>:null}  
                  <a href="/edit-account"> wijzig account</a>                  

                                             
                  <a href="/" onClick={(e:any)=>uitloggen(e)}>uitloggen</a>
              </div>
        </div>
      }

    </div>
    </>

    )}

    </div>
    </div>
    </>

)
}

export default Navbar_LP;






