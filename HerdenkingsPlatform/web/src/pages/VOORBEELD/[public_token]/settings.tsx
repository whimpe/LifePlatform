import { Box, Flex } from "@chakra-ui/core";
import { CircularProgress, Tooltip } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import {
  FaQuestion,
  FaUser,
  FaUserCheck,
  FaUserEdit,
  FaUserFriends,
  FaUserTimes,
} from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { TiCancel } from "react-icons/ti";
import Tooltipdata from "../../../../assets/tooltips_text.json";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import NoAccessPage from "../../../components/general/NoAccessPage";
import Price_Table from "../../../components/landing_page/Price_Table";
import {
  MAX_AMOUNT_OF_BYTES_FREE_GB,
  MAX_AMOUNT_OF_MEMORIES_FREE,
  MAX_AMOUNT_OF_PEOPLE_FREE,
  PAYMENT_PLAN,
  PAYMENT_PREMIUM_PLAN,
  STATUS,
} from "../../../constants";
import {
  useHerdenkingspaginaQuery,
  useMeQuery,
  useRequestsByPaginaId_DemoQuery,
} from "../../../generated/graphql";
import { formatDate_string } from "../../../utils/FormatDate";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";

import example_accessrequest from '../../../../assets/example_accesrequest.json';



// enum STATUS {
//   GEEN_TOEGANG = -1,
//   GEEN = 0,
//   IN_AFWACHTING = 1,
//   HEEFT_TOEGANG = 2,
//   INTIEME_KRING = 3,
//   MEDE_BEHEERDER = 4,
//   EIGENAAR = 5,
// }






const options = [
  "Geen Toegang",
  "--------",
  "In Afwachting",
  "Bezoeker",
  "Intieme Kring",
  "Mede-Beheerder",
  "Beheerder",
];

const icon_options = [
  <FaUserTimes color="#F77777" className="contact_list_icon" />,
  <AiFillHeart color="#F1CC76" className="contact_list_icon" />,
  <FaQuestion color="#D0D0D0" className="contact_list_icon" />,
  <FaUser color="#D0D0D0" className="contact_list_icon" />,
  <FaUserFriends color="#66A265" className="contact_list_icon" />,
  <FaUserEdit color="#F1CC76" className="contact_list_icon" />,
  <FaUserCheck color="#F1CC76" className="contact_list_icon" />,
];

const color_options = [
  "transparent",
  "transparent",
  "#fff",
  "#fff",
  "#E0EBD8",
  "#F8E5BB",
  "#f0ce7f",
];

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    // backgroundColor: theme.palette.primary.main
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    backgroundColor: "white",

    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

interface settingsProps {}

const Settings: React.FC<settingsProps> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [acessrequestid, setacessrequestid] = useState("");
  const [yearView, setyearView] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenInvite = () => {
    setOpen(true);
  };
  const handleCloseInvite = () => {
    setOpen(false);
  };
  const [Error_value, setError_value] = useState(false);

  const [confirmed, setconfirmed] = useState(false);
  const [confirmation_obj, setconfirmation_obj] = useState({
    status: 2,
    accessrequest_id: "",
    person_name: "",
    title: "",
    text: "",
  });

  const handleClick = (event: any, id_value: string) => {
    setAnchorEl(event.currentTarget);
    setacessrequestid(id_value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = () =>
    alert("Op een voorbeeld levensverhaal kan er niet gewijzigd worden.");

  const start_subscription = () =>
    alert("Op een voorbeeld levensverhaal kan er niet gewijzigd worden.");

  const cancel_subscription = () =>
    alert("Op een voorbeeld levensverhaal kan er niet gewijzigd worden.");

  // TODO-VOORBEELD: andere waarden hier in steken?
  const has_no_subscription = true;
  const has_free_account = false;
  
  let requestData

  if(public_token === "d32b99a9-3583-4f61-a04f-dd6d5ffab20b"){
    requestData =example_accessrequest["d32b99a9-3583-4f61-a04f-dd6d5ffab20b"].requests;
  }else if(public_token ==="169f485d-a542-47ac-87b1-1d9bd5be569e"){
    requestData =example_accessrequest["169f485d-a542-47ac-87b1-1d9bd5be569e"].requests;
  }else{
    requestData =example_accessrequest["51fc5f66-87ab-41f4-b24b-6c0eb06ae33f"].requests;
  }
  
  
 

  const {
    data: herdenkingspagina,
    loading: hpaginaLoading,
    error: hpgainaprivateError,
  } = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  });

 

  if ( hpaginaLoading) {
    return (
      <div>
        {" "}
        <Flex align="center" justify="center">
          {" "}
          <CircularProgress color="primary" size={30} />{" "}
        </Flex>{" "}
      </div>
    );
  }

  if (hpgainaprivateError) {
   
  }


  if (hpgainaprivateError) {
    return (
      <>
        {" "}
        <NoAccessPage />{" "}
      </>
    );
  }

  return (
    <>
      <Demo_Layout page_name={"Paginabeheer"}>
        <div className="background_platform">
          <div className="settings_body_container">
            {/* edit page settings */}
            {/* <div className="add_page_container">
                <div className="all_pages_textbox"> PAGINA BEWERKEN</div>
            </div> */}

            {/* <EditPage data={herdenkingspagina!} />  */}

            {/* contactlist page settings */}

            <div className="add_page_container">
              <Tooltip title={Tooltipdata["explanation_authors"].text}>
                <div className="all_pages_textbox">
                  {" "}
                  AUTEURS VAN LEVENSTIJDLIJN
                </div>
              </Tooltip>
              {/* <div className="add_page_container_btn" onClick={()=>{handleOpenInvite()}}>             
                      <div className="add_page_btn"> VOEG AUTEUR TOE </div> 
                      <img src="/img/icons/add_btn.svg" alt="Aeterna" className='add_btn_icon'  />                         
                  </div> */}
            </div>

{/* 
            {
            requestData2.map((request) => 
            (<div>
              {request.requesttext}
              </div>))
              
  


            } */}

            <div className="edit_page_container">
              <table className="contact_list_table">
                <>
                  <thead></thead>
                  <tbody>
                    {requestData.map((request) => (
                      // <div key={request.id}>

                      <tr className="contact_list_table" key={request.id}>
                        <td className="contact_list_icon_container">
                          {icon_options[request.status + 1]}
                        </td>
                        <td
                          className="contact_list_name_container"
                          style={{
                            backgroundColor: color_options[request.status + 1],
                          }}
                        >
                          {" "}
                          <div className="contact_list_name">
                            {request.requestor.username}
                          </div>
                        </td>
                        <td
                          className="contact_list_text_container"
                          style={{
                            backgroundColor: color_options[request.status + 1],
                          }}
                        >
                          {" "}
                          {request.requesttext}
                        </td>
                        <td
                          className="contact_list_status_container"
                          style={{
                            backgroundColor: color_options[request.status + 1],
                          }}
                          onClick={(e: any) => {
                            handleClick(e, request.id);
                          }}
                        >
                          {options[request.status + 1]}
                          <BiChevronDown className="contact_list_status_container_icon" />
                        </td>

                        <StyledMenu
                          id="customized-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <StyledMenuItem
                            key="no_access"
                            onClick={(e: any) => {
                              changeStatus();
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaUserTimes
                                style={{ color: "#F77777", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="no_access">
                              <div className="contact_list_status_title">
                                Geen toegang
                              </div>
                              <div className="contact_list_status_subtitle">
                                Persoon kan niets bekijken of delen.
                              </div>
                            </div>
                          </StyledMenuItem>
                          <StyledMenuItem
                            key="waiting"
                            onClick={(e: any) => {
                              changeStatus();
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaQuestion
                                style={{ color: "#D0D0D0", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="waiting">
                              <div className="contact_list_status_title">
                                In Afwachting
                              </div>
                              <div className="contact_list_status_subtitle">
                                Persoon wacht op toestemming{" "}
                              </div>
                            </div>
                          </StyledMenuItem>
                          <StyledMenuItem
                            key="has_access"
                            onClick={(e: any) => {
                              changeStatus();
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaUser
                                style={{ color: "#D0D0D0", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="has_access">
                              <div className="contact_list_status_title">
                                Bezoeker
                              </div>
                              <div className="contact_list_status_subtitle">
                                Een persoon die alle publieke boodschappen kan
                                zien
                              </div>
                            </div>
                          </StyledMenuItem>
                          <StyledMenuItem
                            key="intimate_circle"
                            onClick={(e: any) => {
                              changeStatus();
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaUserFriends
                                style={{ color: "#66A265", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="intimate_circle">
                              <div className="contact_list_status_title">
                                Intieme Kring
                              </div>
                              <div className="contact_list_status_subtitle">
                                Persoon die alle publieke en intieme
                                herinneringen kan zien
                              </div>
                            </div>
                          </StyledMenuItem>
                          <StyledMenuItem
                            key="co-owner"
                            onClick={(e: any) => {
                              setconfirmation_obj({
                                status: STATUS.CoOwner,
                                accessrequest_id: acessrequestid,
                                person_name: request.requestor.username,
                                title: "Auteurs wijziging",
                                text: `Bent u zeker dat u deze persoon medebeheerder wilt maken?`,
                              });
                              setconfirmed(true);
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaUserEdit
                                style={{ color: "#F1CC76", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="co-owner">
                              <div className="contact_list_status_title">
                                Medebeheerder
                              </div>
                              <div className="contact_list_status_subtitle">
                                Persoon die alles kan zien en mee-corrigeren
                              </div>
                            </div>
                          </StyledMenuItem>
                          <StyledMenuItem
                            key="owner"
                            onClick={async (e: any) => {
                              setconfirmation_obj({
                                status: STATUS.Owner,
                                accessrequest_id: acessrequestid,
                                person_name: request.requestor.username,
                                title: "Auteurs wijziging",
                                text: `Bent u zeker dat u deze persoon beheerder wilt maken?`,
                              });
                              setconfirmed(true);
                              setAnchorEl(null);
                            }}
                          >
                            <ListItemIcon>
                              <FaUserCheck
                                style={{ color: "#F1CC76", fontSize: "1.5em" }}
                              />
                            </ListItemIcon>
                            <div key="owner">
                              <div className="contact_list_status_title">
                                Beheerder
                              </div>
                              <div className="contact_list_status_subtitle">
                                Persoon die verantwoordelijk is voor de pagina
                              </div>
                            </div>
                          </StyledMenuItem>
                        </StyledMenu>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot></tfoot>
                </>
              </table>
            </div>

            <div className="edit_page_subsettings_container">
              {/* TODO:Himpe (of mezelf) Als het funeral payment plkan is dan mot de optie zijn om te verlegen, starten mag hier niet bestaan */}

              <div className="subscription_settings_example_container">
                <div className="current_sub_settings_title">
                  LEVENSTIJDLIJN ABONNEMENT-{" "}
                  {PAYMENT_PLAN[PAYMENT_PLAN.Premium]}
                </div>

                <div className="current_settings_dates_container">
                  <div className="current_settings_date_container">
                    <div className="current_settings_date_label">
                      Oprichtdatum
                    </div>

                    <div className="start_sub_date">{"5 januari 2020"}</div>
                  </div>
                  {has_free_account ? null : (
                    <div className="current_settings_date_container">
                      <div className="current_settings_date_label">
                        Beschikbaar tot
                      </div>
                      <div className="valid_until_sub_date">
                        {herdenkingspagina?.herdenkingspagina?.ValidUntil ? (
                          formatDate_string("2021-05-07")
                        ) : (
                          <>geen einddatum</>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {has_no_subscription ? null : (
                  <div className="amount_of_days_available_text">
                    {Math.ceil(
                      (new Date(
                        herdenkingspagina!.herdenkingspagina!.ValidUntil
                      ).valueOf() -
                        new Date().valueOf()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    dagen tot abonnement verloopt
                  </div>
                )}

                {/* cancel en restart subscription */}
                {has_no_subscription ? (
                  <div
                    className="extend_subscription_btn"
                    onClick={(e: any) => {
                      alert("kan niet in voorbeeld account");
                    }}
                  >
                    {" "}
                    Abonnement starten{" "}
                    <BsArrowRight className="extend_subscription_icon" />
                  </div>
                ) : (
                  <>
                    <div className="current_settings_date_label">
                      Volgende maandelijkse betaling is:
                    </div>

                    <div className="start_sub_date">{"05-12-2021"}</div>

                    <div
                      className="extend_subscription_btn"
                      onClick={(e: any) => {
                        setconfirmation_obj({
                          status: 2,
                          accessrequest_id: "",
                          person_name: "",
                          title: "Annulatie Abonnement",
                          text: `Bent u zeker dat u de subscriptie wilt stopzetten?`,
                        });
                        setconfirmed(true);
                      }}
                    >
                      Abonnement annuleren{" "}
                      <TiCancel className="extend_subscription_icon" />
                    </div>
                  </>
                )}

                <div className="OR_line">
                  <span>OF</span>
                </div>
                <div
                  className="extend_subscription_btn"
                  onClick={(e: any) => {
                    alert("kan niet in voorbeeld account");
                  }}
                >
                  {" "}
                  1 jaar pakket kopen
                  <GrAddCircle className="extend_subscription_icon" />
                </div>
              </div>
            </div>

            <Price_Table data={null} />

            <div
              className="dashboard_footer"
              onClick={() => {
                router.push("/#home");
              }}
            >
              <img
                src="/img/logos/logo_black.svg"
                alt="Aeterna"
                className="dashboard_footer_img"
              />
            </div>
          </div>
        </div>
      </Demo_Layout>

      {/* TODO-VOORBEELD: niet meer nodig? */}
    </>
  );
};

export default WithApollo({ ssr: false })(Settings);
