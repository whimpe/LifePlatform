import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { AiOutlineUser } from 'react-icons/ai';
import { BsArrowLeft, BsChevronDown, BsFillLockFill } from 'react-icons/bs';
import { GoSettings } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import {
  IndexPageHerdenkingsPaginaFragment, MeQuery, useMeQuery
} from "../../generated/graphql";
import { get_year } from '../../utils/FormatDate';
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import LoginModal from "../modal_components/LoginModal";



interface Demo_MenuProps {
  herdenkingspagina: IndexPageHerdenkingsPaginaFragment;
  setopen:any;
  meData: any;
  setShareModalClick?:any;  
  setLoginModalClick:any;
  sethasAccount:any;
}
export const Demo_Menu: React.FC<Demo_MenuProps> = ({herdenkingspagina,setopen,meData,setShareModalClick,setLoginModalClick,sethasAccount}) => {


  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();


  const mql = window.matchMedia('(max-width: 768px)');
  let mobileView = mql.matches;

  const go_to = (link:string) =>{ 
    if(!meData?.me?.user?.id && link!==''){setLoginModalClick(true)
    }else{ router.push(`/PLATFORM/${herdenkingspagina.id}/${link}`); }  
}



  return (
    <>
        <div className="menu_wrapper">
        <div className="nav_wrapper">
            <div className="nav_page_container">                 
                <div className="nav_page_left_box">
                   <img src="\img\logos\black_flower.png" alt="" />
                </div>
              
                <div className="nav_page_center_box">
                    <div className="nav_page_name_of_tab">{herdenkingspagina.name_of_page}</div>
                    <div className="nav_page_menu_dates">{get_year(herdenkingspagina.DoB)}{!herdenkingspagina.DoD ?null: ` - ${get_year(herdenkingspagina?.DoD)}`}</div>
                </div>

                <div className="nav_page_right_box" >
                    <div className="nav_page_menu_box">
                       <div className="nav_page_menu_icon_box_user" onClick={(e:any)=>{sethasAccount(true);setLoginModalClick(true);setopen(false);}}>
                            <div className="nav_page_menu_user">Inloggen</div>   
                            <AiOutlineUser className="nav_page_menu_icon_user" />
                        </div>

                        <div className="nav_page_menu_icon_box" onClick={()=>setopen(false)}>
                            <IoCloseOutline className="nav_page_menu_icon_close"  />
                        </div>
                        {/* <div className="nav_page_menu_text">menu</div> */}
                    </div>
                </div>
            </div>

        
        </div>

            <div className="menu_col_wrapper">
                <div className="menu_col_1">
                    <div className="col_1_head">Herinneringen</div>                    
                    <div className="col_1_item_box">
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}`);}}>Portret</div>
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/timeline`);}}>Tijdlijn</div>
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/gallery`);}}>Galerij</div>
                    </div>
                
                </div>
         

                <div className="menu_col_3">
                    <div className="col_3_head">Afscheid</div>                    
                    <div className="col_3_item_box">
                        <div className="col_3_item"  onClick={(a:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/condolances`);}}>Condoleren</div>
                        {/* <div className="col_3_item">Begrafenis</div> */}
                        {/* <div className="col_3_item"></div> */}
                    </div>                
                </div>

                {/* {meData.me!.status >= 4 ? */}
                <div className="menu_col_2">
                    <div className="col_2_head">Instellingen <BsFillLockFill className='col_2_head_security_icon'/></div>                    
                    <div className="col_2_item_box">
                        <div className="col_2_item" onClick={(e:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/settings`);}}>Paginabeheer</div>
                        <div className="col_2_item" onClick={(e:any)=>{router.push(`/`); }}>Hoofdmenu</div>
                        <div className="col_2_item" onClick={(e:any)=>{sethasAccount(true);setLoginModalClick(true);setopen(false);}}>Inloggen</div>
                        <div className="col_2_item" onClick={(e:any)=>{sethasAccount(false);setLoginModalClick(true);setopen(false);}}>Maak account</div>                    </div>                
                </div>
                {/* :null} */}

    
        </div>

    </div>



          
         
        
 
    
    </>
  );

 
};

