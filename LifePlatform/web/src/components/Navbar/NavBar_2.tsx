import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowBarLeft, BsArrowLeft, BsChevronDown } from 'react-icons/bs';
import { GoSettings } from "react-icons/go";
import { setAccessToken } from '../../accessToken';
import {
  IndexPageHerdenkingsPaginaFragment, useLogoutMutation, useMeQuery
} from "../../generated/graphql";
import { get_year } from '../../utils/FormatDate';
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import LoginModal from "../modal_components/LoginModal";
import Navbar_mobile from "./Navbar_mobile";



interface NavBar_2Props {
  herdenkingspagina: IndexPageHerdenkingsPaginaFragment;
  page_name:string;
  setopen:any;
}

export const NavBar_2: React.FC<NavBar_2Props> = ({herdenkingspagina,page_name,setopen}) => {
  // const {data: ownerData} = useIsOwner
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [LoginModalClick, setLoginModalClick] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);
  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  const OpenLoginModal = (hasAccount:boolean) =>{ sethasAccount(hasAccount); setLoginModalClick(true); }


  const { data: meData, loading: Meloading, error: MeError } = useMeQuery({ variables: { paginaId: public_token, },
    skip: isServer(),
    notifyOnNetworkStatusChange: true,
  });

  if (Meloading ) { return <div>loading</div>; }
  if (MeError) { return <div>{MeError.message}</div>; }

  const uitloggen = async (e:any) => {

    await logout({
      update: (cache: any) => {
        setAccessToken("");
        cache.evict({ fieldName: "me:({})" });
        cache.gc();
      }
    });
    apolloClient.clearStore().then(
      () => {
        //TODO: dubbel? setAccessToken?
        setAccessToken("");
     
      }  
    )
    await router.push("/");
    location.reload();
  }  

  const mql = window.matchMedia('(max-width: 768px)');
  let mobileView = mql.matches;
    

  return (
    <>

        <div className="nav_wrapper">
            <div className="nav_page_container"> 
                <div className="nav_page_left_box">
                    <div className="nav_page_name_box">
                        <div className="nav_page_name_of_page">{herdenkingspagina.name_of_page}</div>
                        <div className="nav_page_menu_dates">{get_year(herdenkingspagina.DoB)}{!herdenkingspagina.DoD ?null: ` - ${get_year(herdenkingspagina?.DoD)}`}</div>      
                    </div>
                  </div>
              
                <div className="nav_page_center_box">
                    {page_name==='back' ?  <div className="nav_page_name_of_tab_btn" onClick={(e:any)=> router.back()}><BsArrowLeft /> terugkeren</div>
                                        : <div className="nav_page_name_of_tab">{page_name}</div>
                    }
                </div>
                <div className="nav_page_right_box" onClick={()=>setopen(true)}>
                    <div className="nav_page_menu_box_entree">
                        <div>
                            <img src={'/img/icons/menu.svg'} className="nav_page_menu_icon_menu" alt={''}/>
                        </div>
                        <div className="nav_page_menu_text">menu</div>
                    </div>
                </div>
            </div>

        </div>


          {LoginModalClick ? 
            <> <LoginModal title={''}  LoginModalClick={LoginModalClick} setLoginModalClick={setLoginModalClick} hasAccount={hasAccount} sethasAccount={sethasAccount}/> </>
        : null}
 
    
    </>
  );

 
};

