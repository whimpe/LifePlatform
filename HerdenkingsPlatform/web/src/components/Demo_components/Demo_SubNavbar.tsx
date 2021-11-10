import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { BsArrowLeft, BsChevronDown } from 'react-icons/bs';
import { FaBookReader, FaEnvelopeOpenText } from "react-icons/fa";
import { GiCandleLight } from "react-icons/gi";
import { IndexPageHerdenkingsPaginaFragment, useMeQuery } from "../../generated/graphql";
import { get_year } from "../../utils/FormatDate";
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";


interface Demo_SubNavbarProps {
    herdenkingspagina: IndexPageHerdenkingsPaginaFragment;
    condolance_active: boolean;
    page_name?:string;
    setopen:any;

}

export const Demo_SubNavbar: React.FC<Demo_SubNavbarProps> = ({herdenkingspagina,condolance_active,page_name,setopen}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const [mobile_open, setmobile_open] = useState(false);
  
 
// {TODO-VOORBEELD: in demo mogen ze altijd de peroonlijke boodschappen zien, kijk eens na }


var see_personal_message = true;
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




         
          
    </>
  );

 
};


