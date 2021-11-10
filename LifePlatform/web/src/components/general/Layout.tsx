import React, { useEffect, useState } from "react";
import {
  useHerdenkingspaginaQuery, useMeQuery
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import Navbar_LP from "../landing_page/Navbar_LP";
import FeedbackModal from "../modal_components/FeedbackModal";
import LoginModal from "../modal_components/LoginModal";
import ShareModal from "../modal_components/ShareModal";
import Menu from "../Navbar/Menu";
import { NavBar_2 } from "../Navbar/NavBar_2";
import { SubNavbar } from "../Navbar/SubNavbar";

export type WrapperVariant = "small" | "regular";

interface LayoutProps {
  variant?: WrapperVariant;
  page_name?: string;
  

}

export const Layout: React.FC<LayoutProps> = ({ children, variant,page_name='' }) => {
  const public_token = useGetStringFromUrl("public_token");
  const [open, setopen] = useState(false);
  const [ShareModalClick, setShareModalClick] = useState(false)
  const [LoginModalClick, setLoginModalClick] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);

  const {
    data: meData,
    loading: MeLoading,
    error: Meerror,
  } = useMeQuery({ variables: { paginaId: public_token }, skip: isServer() });

  const {
    data: herdenkingspagina,
    loading: hploading,
    error: hperror,
  } = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  });

  const [index_color, setindex_color] = useState(herdenkingspagina?.herdenkingspagina?.DesignType);
  const [OpenFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [primary_color, setprimary_color] = useState([
    "#F1CC76",
    "rgb(247,243,245,1)",
    "rgb(247,243,245,1)",
    "rgb(116,139,111,0.5)",
  ]);
  const [secondary_color, setsecondary_color] = useState([
    "#F8E5BB",
    "rgb(247,243,245,0.5)",
    "rgb(247,243,245,0.5)",
    "rgb(116,139,111,0.25)",
  ]);
  const [third_color, setthird_color] = useState([
    "#FAEFD6",
    "rgb(247,243,245,0.25)",
    "rgb(247,243,245,0.25)",
    "rgb(116,139,111,0.25)",
  ]);
  const [background_color, setbackground_color] = useState([
    "#FFFDF5",
    "#fff",
    "#fff",
    "#fff",
  ]);

    const root = document.documentElement;
    root?.style.setProperty("--primary-color", primary_color[0]);
    root?.style.setProperty("--secondary-color", secondary_color[0]);
    root?.style.setProperty("--third-color", third_color[0]);
    // root?.style.setProperty( "--background-color", background_color[0] );

  if (hploading) { return <div>Laden...</div>; }
  if (hperror) {
    // Soms hier omdat de je van niet ingelogt naar een pagina in de folder PLATFORM gaat
    console.log("index error :", hperror);
  }

  return (
    <>
      {/* Which Navbar on the screen depending if the person is logged in  */}
      {/* {!meData?.me?.user?.id ? (
          <Navbar_LP PaginaData={null} share_btn={false} />
          {open ?<Menu herdenkingspagina={herdenkingspagina!!.herdenkingspagina!} setopen={setopen} meData={meData} setShareModalClick={setShareModalClick}/>  

          
        ) : ( */}
        
          { }
          {open ?<Menu herdenkingspagina={herdenkingspagina!!.herdenkingspagina!} setopen={setopen} meData={meData} setShareModalClick={setShareModalClick} setLoginModalClick={setLoginModalClick} sethasAccount={sethasAccount}/>  
                :<NavBar_2 herdenkingspagina={herdenkingspagina!!.herdenkingspagina!} page_name={page_name} setopen={setopen}  />}



{ShareModalClick ? (
      <ShareModal
                ShareModalClick={ShareModalClick}
                setShareModalClick={setShareModalClick}
                name_of_page={herdenkingspagina?.herdenkingspagina?.name_of_page as string}
               
                />
      ):null}   


  {LoginModalClick ? 
  <> <LoginModal title={''}  
                LoginModalClick={LoginModalClick} 
                setLoginModalClick={setLoginModalClick} 
                hasAccount={hasAccount} 
                sethasAccount={sethasAccount}/> </> : null}

                
          
      {children}
    </>
  );
};
