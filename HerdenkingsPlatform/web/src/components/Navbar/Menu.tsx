import React,{useState} from 'react'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { IoCloseOutline } from 'react-icons/io5'
import { IndexPageHerdenkingsPaginaFragment, MeQuery, useLogoutMutation } from '../../generated/graphql'
import { get_year } from '../../utils/FormatDate'
import { useRouter } from "next/router";
import { BsFillLockFill } from 'react-icons/bs'
import ShareModal from '../modal_components/ShareModal';
import LoginModal from "../modal_components/LoginModal";
import { setAccessToken } from '../../accessToken'
import { useApolloClient } from '@apollo/client'



interface MenuProps {
    herdenkingspagina: IndexPageHerdenkingsPaginaFragment;
    setopen:any;
    meData?: MeQuery;
    setShareModalClick:any;
    setLoginModalClick:any;
    sethasAccount:any;

  }
  
export const Menu: React.FC<MenuProps> = ({herdenkingspagina,setopen,meData,setShareModalClick,setLoginModalClick,sethasAccount}) => {
    const router = useRouter();
    const apolloClient = useApolloClient();
    const [logout, { loading: logoutFetching }] = useLogoutMutation();



    const go_to = (link:string) =>{ 
        if(!meData?.me?.user?.id && link!==''){setLoginModalClick(true)
        }else{ router.push(`/PLATFORM/${herdenkingspagina.id}/${link}`); }  
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
          () => { setAccessToken(""); }  
        )
        router.push("/");
    } 



    return (
        <>
        <div className="menu_wrapper">
        <div className="nav_wrapper">
            <div className="nav_page_container">                 
                <div className="nav_page_left_box">
                   <img src="\img\logos\black_flower.png" alt=""  className='cursor_pointer' onClick={(e:any)=>{router.push('/')}}/>
                </div>
              
                <div className="nav_page_center_box">
                    <div className="nav_page_name_of_tab">{herdenkingspagina.name_of_page}</div>
                    <div className="nav_page_menu_dates">{get_year(herdenkingspagina.DoB)}{!herdenkingspagina.DoD ?null: ` - ${get_year(herdenkingspagina?.DoD)}`}</div>
                </div>

                <div className="nav_page_right_box" >
                    <div className="nav_page_menu_box">

                    {!meData?.me?.user?.id ?  
                    // NO ACCOUNT
                        <div className="nav_page_menu_icon_box_user" onClick={(e:any)=>{sethasAccount(true);setLoginModalClick(true);setopen(false);}}>
                            <div className="nav_page_menu_user">Inloggen</div>   
                            <AiOutlineUser className="nav_page_menu_icon_user" />
                        </div>
                    
                    :
                    //HAS ACCOUNT
                        <div className="nav_page_menu_icon_box_user" onClick={(e:any)=>{setopen(false);router.push(`/account`);}}>
                            <div className="nav_page_menu_user">Mijn Account</div>    {/*  {meData.me?.user?.username} */}
                            <AiOutlineUser className="nav_page_menu_icon_user" />
                        </div>
                    }



                        <div className="nav_page_menu_icon_box" onClick={()=>setopen(false)}>
                            <IoCloseOutline className="nav_page_menu_icon_close"  />
                        </div>
                    </div>
                </div>
            </div>

        





        </div>

            <div className="menu_col_wrapper">
                <div className="menu_col_1">
                    <div className="col_1_head">Herinneringen</div>                    
                    <div className="col_1_item_box">
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);go_to('');}}>Portret</div>
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);;go_to('timeline');}}>Tijdlijn {!meData?.me?.user?.id ? <BsFillLockFill className='col_2_head_security_icon'/>:null}</div>
                        <div className="col_1_item" onClick={(e:any)=>{setopen(false);;go_to('gallery');}}>Galerij   {!meData?.me?.user?.id ? <BsFillLockFill className='col_2_head_security_icon'/>:null}</div>
                    </div>
                
                </div>
         
                {herdenkingspagina.condoleance_active ?
                <div className="menu_col_3">
                    <div className="col_3_head">Afscheid</div>                    
                    <div className="col_3_item_box">
                        <div className="col_3_item"  onClick={(a:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/condolances`);}}>Condoleren</div>
                        
                    </div>                
                </div>
                :null}


            {!meData?.me?.user?.id ?  
            // NO ACCOUNT
            <div className="menu_col_2">
                <div className="col_2_head">Account <BsFillLockFill className='col_2_head_security_icon'/></div>                    
                <div className="col_2_item_box">
                    
                    <div className="col_2_item" onClick={(e:any)=>{sethasAccount(true);setLoginModalClick(true);setopen(false);}}>Inloggen</div>
                    <div className="col_2_item" onClick={(e:any)=>{setopen(false);setLoginModalClick(true);}}>Maak account</div>
                    <div className="col_2_item" onClick={(e:any)=>{router.push(`/`); }}>Hoofdmenu</div>
                </div>                
            </div>
            :     
            // HAS ACCOUNT       
            <>
                {meData.me!.status >= 4 ?
                <div className="menu_col_2">
                    <div className="col_2_head"><div className="col_2_head_text">Instellingen</div> <BsFillLockFill className='col_2_head_security_icon'/></div>                    
                    <div className="col_2_item_box">
                        <div className="col_2_item" onClick={(e:any)=>{setopen(false);router.push(`/PLATFORM/${herdenkingspagina.id}/settings`);}}>Paginabeheer</div>
                        <div className="col_2_item" onClick={(e:any)=>{setShareModalClick(true);setopen(false); }}>Pagina Delen</div>
                        <div className="col_2_item" onClick={(e:any)=>{setopen(false);router.push(`/account`);}}>Mijn account</div>
                        <div className="col_2_item" onClick={(e:any)=>{setopen(false);uitloggen(e);}}>Uitloggen</div>

                    </div>                
                </div>
                :null}
            </>
            }
    
        </div>

    </div>



    
    </>
    )
}

export default Menu
