import { useRouter } from "next/router";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";
import MetaTags from "../components/general/MetaTags";
import { PaginaList } from "../components/general/PaginaList";
import { CustomerList } from "../components/general/CustomerList ";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import CreatePage from "../components/modal_components/CreatePage";
import { ErrorModal } from "../components/modal_components/ErrorModal";
import { ACCOUNT_STATUS } from "../constants";
import {
  useAccessRequestsByUserIdQuery,
  useMeQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsLogin } from "../utils/useIsLogin";
import { WithApollo } from "../utils/withApollo";

interface accountProp {}

export const account: React.FC<accountProp> = ({}) => {
  useIsLogin();

  const router = useRouter();
  const [NewPageClick, setNewPageClick] = useState(false);
  const [Error_value, setError_value] = useState(false);

  const {
    data: meData,
    loading: Meloading,
    error: MeError,
  } = useMeQuery({
    skip: isServer(),
    // we only want this query to run when in the browser!
  });
  const {
    data: accessRequests,
    error: accessRequestsError,
    loading: accessRequestsLoading,
  } = useAccessRequestsByUserIdQuery({ skip: isServer() });

  if (!accessRequestsLoading && !accessRequests) {
    return <div> {accessRequestsError?.message} </div>;
  }

  const StartNewPage = (e: any) => {
    if (meData?.me?.user?.account_status === ACCOUNT_STATUS.NOT_VERIFIED) {
      setError_value(true);
    } else {
      setNewPageClick(true);
    }
  };
  //TODO: make component
  {/* TODO:HIMPE opmaak */}


  return (
    <>
      <MetaTags
        title={"Account"}
        type_of_page={""}
        description={""}
        mediaUrl={""}
      />

      {/* <div className="background_dashboard"> */}
        <Navbar_LP PaginaData={null} share_btn={false} />


        <div className="add_page_container">
          <div className="all_pages_textbox"> LEVENSVERHALEN</div>


          <div className="add_page_container_btn" onClick={(e: any) => { StartNewPage(e); }} > 
          <div className="add_page_btn">START NIEUWE LEVENSTIJDLIJN</div>
            <img
              src="/img/icons/add_btn.svg"
              alt="Aeterna"
              className="add_btn_icon"
            />
          </div>
        </div>

        {meData?.me?.partner_type>=0 ? <CustomerList />:null}

        <PaginaList
          loading={accessRequestsLoading}
          requests={accessRequests}
          StartNewPage={StartNewPage}
        />







        <div className="dashboard_footer" onClick={() => { router.push("/#home"); }} >
          <img src="img/logos/logo_black.svg" alt="Aeterna" className="dashboard_footer_img" />
        </div>

      {/* create memory model  */}
      {NewPageClick ? (
        <div id="myModal" className="modal">
          <div className="modal_content_memory">
            <div className="close_button" onClick={(e: any) => { setNewPageClick(false); }} >
              <IoCloseOutline className="close_button_icon" />
            </div>
            <CreatePage close_modal={setNewPageClick} />
          </div>
        </div>
      ) : null}

      {Error_value ? (
        <ErrorModal
          active={Error_value}
          setactive={setError_value}
          error_type={"verify_email"}
          link={`/edit-account`}
        />
      ) : null}
    </>
  );
};
export default WithApollo({ ssr: false })(account);
