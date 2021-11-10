import React, { useState } from "react";
import {
  useHerdenkingspaginaQuery, useMeQuery
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import FeedbackModal from "../modal_components/FeedbackModal";
import LoginModal from "../modal_components/LoginModal";
import { Demo_Menu } from "././Demo_Menu";
import { Demo_SubNavbar } from "./Demo_SubNavbar";
import { Email_Pop_up } from "./Email_Pop_up";

export type WrapperVariant = "small" | "regular";

interface Demo_LayoutProps {
  variant?: WrapperVariant;
  page_name?:string;
}

export const Demo_Layout: React.FC<Demo_LayoutProps> = ({ children, variant,page_name }) => {
  const public_token = useGetStringFromUrl("public_token");
  const [open, setopen] = useState(false);
  const [ShareModalClick, setShareModalClick] = useState(false);
  const [LoginModalClick, setLoginModalClick] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);


  const { data: meData, loading: MeLoading, error: Meerror, } = useMeQuery({ variables: { paginaId: public_token }, skip: isServer() });

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

  // useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty("--primary-color", primary_color[0]);
    root?.style.setProperty("--secondary-color", secondary_color[0]);
    root?.style.setProperty("--third-color", third_color[0]);
    root?.style.setProperty( "--background-color", background_color[0] );
  // }, [index_color]);

  if (hploading) {
    return <div>loading...</div>;
  }
  if (hperror) {
    // Soms hier omdat de je van niet ingelogt naar een pagina in de folder VOORBEELD gaat
    console.log("index error :", hperror);
  }

  return (
    <>
      {/* Which Navbar on the screen depending if the person is logged in  */}      
        <>
        {/* <Email_Pop_up/> */}
        {open ?
        <Demo_Menu herdenkingspagina={herdenkingspagina!!.herdenkingspagina!} setopen={setopen} meData={meData} setShareModalClick={setShareModalClick}  setLoginModalClick={setLoginModalClick} sethasAccount={sethasAccount} />  
        :
        <Demo_SubNavbar herdenkingspagina={herdenkingspagina!!.herdenkingspagina!} page_name={page_name} setopen={setopen} condolance_active={false}  />}

        </>
      
        {OpenFeedbackModal  ? <FeedbackModal  setOpenFeedbackModal={setOpenFeedbackModal} OpenFeedbackModal={OpenFeedbackModal}  userid={meData?.me?.user?.id ? meData?.me?.user?.id :'null'}/>  :  null}
        {LoginModalClick ? <> <LoginModal title={''} LoginModalClick={LoginModalClick} setLoginModalClick={setLoginModalClick} hasAccount={hasAccount} sethasAccount={sethasAccount}/> </> : null}

                
          

      {children}
    </>
  );
};
