import { Flex } from "@chakra-ui/core";
import { CircularProgress, Fade } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { JSXElementConstructor, ReactElement, useEffect, useState } from "react";
import { Demo_SubNavbar, } from "../../../components/Demo_components/Demo_SubNavbar";
import ErrorPage from "../../../components/general/ErrorPage";
import MetaTags from "../../../components/general/MetaTags";
import { Altijdzichtbaar } from "../../../components/index_components/Altijdzichtbaar";
import { useHerdenkingspaginaQuery, useMeQuery, useSubscribeMutation } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
import { delay } from "../../../utils/TimeFunction";
import { Email_Pop_up } from "../../../components/Demo_components/Email_Pop_up";

import { FiMail } from "react-icons/fi";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import { Accepted_blokDemo } from "../../../components/Demo_components/Accepted_blokDemo";

function rand() { return Math.round(Math.random() * 20) - 10; }
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      display:'flex',
      flexDirection:'column',
      width: "fit-content",
      margin:'auto',
      outline:'none',

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);


const Index = () => {

  const router = useRouter();
  const public_token = useGetStringFromUrl("public_token");
 

  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
    variables: { paginaId: public_token, },
  })
  const { data: meData, loading: MeLoading, error: Meerror, } = useMeQuery({ variables: { paginaId: public_token },
    skip: isServer(),
  });


  // Error van de queies

  if (hploading || MeLoading) { return ( <div> <Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex>{" "} </div> ); }
  if (hperror) { return (<><ErrorPage /> </>); }
  if (!herdenkingspagina?.herdenkingspagina) { return (<><ErrorPage /> </>); }





  return (
    <>
      <MetaTags title={'DEMO'} 
                type_of_page={''} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />
      {/* <Email_Pop_up/> */}
      
      <Demo_Layout >

      <div className="background_dashboard">


        <Altijdzichtbaar herdenkingspagina={herdenkingspagina?.herdenkingspagina!} meData={meData} />

        <Accepted_blokDemo public_token={herdenkingspagina?.herdenkingspagina!.id} meData={meData} />


        <div className="dashboard_footer" onClick={() => { router.push("/#home"); }}
        >
          <img src="/img/logos/logo_black.svg" alt="Aeterna" className="dashboard_footer_img" />
        </div>

        
      </div>
      </Demo_Layout>

 

    </>
  );
};

export default WithApollo({ ssr: true })(Index);
