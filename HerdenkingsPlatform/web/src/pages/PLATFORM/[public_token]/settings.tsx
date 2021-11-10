import { Box, Flex } from "@chakra-ui/core";
import { CircularProgress, Tooltip } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
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
import { Limits_of_page } from "../../../components/display/Limits_of_page";
import EditPage from "../../../components/edit_delete/EditPage";
import NoAccessPage from "../../../components/general/NoAccessPage";
import Navbar_LP from "../../../components/landing_page/Navbar_LP";
import { ConfirmationModal } from "../../../components/modal_components/ConfirmationModal";
import InviteModal from "../../../components/modal_components/InviteModal";
import {
  MAX_AMOUNT_OF_BYTES_FREE_GB,
  MAX_AMOUNT_OF_MEMORIES_FREE,
  MAX_AMOUNT_OF_MESSAGES_FREE,
  MAX_AMOUNT_OF_PEOPLE_FREE,
  PAYMENT_PLAN,
  PAYMENT_PREMIUM_PLAN,
  Payment_Term,
} from "../../../constants";
import {
  useCancelMollieSubscriptionMutation,
  useChangeStatusAccessRequestMutation,
  useCreateLevenstijdlijnBetalingMutation,
  useCreateLevenstijdlijnDomicilieringMutation,
  useGetMollieSubscriptionForPageQuery,
  useHerdenkingspaginaprivatetokenQuery,
  useMeQuery,
  useRequestsByPaginaIdQuery,
} from "../../../generated/graphql";
import { formatDate_string, formatDate_text } from "../../../utils/FormatDate";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";

import * as gtag from "../../../utils/googleanalytics/gtag";
import Price_Table from "../../../components/landing_page/Price_Table";
import {STATUS} from "../../../constants";
import { Layout } from "../../../components/general/Layout";

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

export const StyledMenu = withStyles({
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

export const StyledMenuItem = withStyles((theme) => ({
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
  useIsAuth(STATUS.CoOwner);

  const public_token = useGetStringFromUrl("public_token");
  const [changestatus] = useChangeStatusAccessRequestMutation();
  const [cancelSubscription] = useCancelMollieSubscriptionMutation();
  const [createdomiciliering] = useCreateLevenstijdlijnDomicilieringMutation();
  const [createLevenstijdlijnbetaling] =
    useCreateLevenstijdlijnBetalingMutation();

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

  const { data: meData, loading: Meloading } = useMeQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });

  const {
    data: requestsData,
    error: errorRequestQuery,
    loading: loadingrequests,
  } = useRequestsByPaginaIdQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });

  // mutatie privateAccessToken
  const {
    data: herdenkingspagina,
    loading: hpaginaLoading,
    error: hpgainaprivateError,
  } = useHerdenkingspaginaprivatetokenQuery({
    variables: {
      paginaId: public_token,
    },
  });

  const {
    data: SubscriptionData,
    loading: sub_load,
    error: errors,
  } = useGetMollieSubscriptionForPageQuery({
    variables: {
      public_token: public_token,
    },
  });

  if (Meloading || loadingrequests || hpaginaLoading || sub_load) {
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
    return (
      <>
        {" "}
        <NoAccessPage />{" "}
      </>
    );
  }

  if (!meData?.me?.status) {
    return <div>no status</div>;
  }

  const private_link = `https://aeterna.be/PLATFORM/${
    herdenkingspagina!.herdenkingspaginaprivatetoken!.private_token
  }`;
  const public_link = `https://aeterna.be/PLATFORM/${public_token}`;

  const handleClick = (event: any, id_value: string) => {
    setAnchorEl(event.currentTarget);
    setacessrequestid(id_value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = async (status: STATUS, accessrequest_id: any) => {
    try {
      const response = await changestatus({
        variables: {
          id: accessrequest_id,
          paginaId: public_token,
          status: status,
        },
        update: (cache: any) => {
          cache.writeFragment({
            id: "AccessRequest:" + accessrequest_id,
            fragment: gql`
              fragment _ on AccessRequest {
                status
              }
            `,
            data: {
              status: status,
            },
          });
        },
      });

      gtag.event({
        action: "change_status",
        category: "Manage_page",
        label: "manage_page",
        value: status,
      });
    } catch (error:any) {

      //TODO mooie dialog
      if (error.message.includes("not owner of page")) {
        alert("Alleen de eigenaar kan deze  actie uitvoeren");
      } else if (error.message.includes("Cant promote or demote yourself")) {
        alert("Je kan je eigen status niet wijzigen");
      } else if (
        error.message.includes(
          "Cant change status of people who have a higher or equal status than yourself"
        )
      ) {
        alert("Je kan de status van medebeheerders niet wijzigen ");
      } else if (
        error.message.includes(
          "De gebruiker moet geverifieerd zijn voordat die mede_beheerder of eigenaar kan worden"
        )
      ) {
        alert(
          "De gebruiker moet geverifieerd zijn voordat die mede_beheerder of eigenaar kan worden"
        );
      } else {
        alert("Er is iets misgelopen probeer later opnieuw.");
      }
    }
  };

  const start_subscription = async (e: any, year_package: boolean) => {
    if (year_package) {
      const pay = await createLevenstijdlijnbetaling({
        variables: {
          public_token: public_token,
          payment_plan: PAYMENT_PLAN.Premium,
          payment_term: Payment_Term.One_Year,
        },
      });
      gtag.event({
        action: "start_package",
        category: "Subscription",
        label: "subscription",
        value: 0,
      });
      window.open(pay?.data?.createLevenstijdlijnBetaling?.pay_link!, "_blank");
    } else {
      try {
        const pay = await createdomiciliering({
          variables: {
            payment_plan: PAYMENT_PLAN.Premium,
            public_token: public_token,
            payment_term: Payment_Term.Recurring,
          },
        });
        gtag.event({
          action: "start_subscription",
          category: "Subscription",
          label: "subscription",
          value: 0,
        });
        window.open(
          pay?.data?.createLevenstijdlijnDomiciliering?.pay_link!,
          "_blank"
        );
      } catch (error:any) {
        if (
          error.message.includes(
            "Alleen de eigenaar kan een abonnement starten"
          )
        ) {
          alert("Alleen de eigenaar kan deze  actie uitvoeren");
        } else if (
          error.message.includes(
            "There already exist a subscription for this page"
          )
        ) {
          alert("Er bestaat al een abonnement voor deze pagina");
        } else if (error.message.includes("The email address")) {
          alert(
            "U kan geen abonnement starten zolang uw email niet geverifieerd is. Ga naar wijzig account om u te verifiëren."
          );
        } else {
          alert("Er is iets misgelopen probeer later opnieuw.");
        }
      }
    }
  };

  const cancel_subscription = async () => {
    await cancelSubscription({
      variables: {
        public_token: public_token,
        MollieSubscriptionId:
          SubscriptionData?.getMollieSubscriptionForPage?.mollieSubscriptionId!,
      },
    });

    gtag.event({
      action: "cancel_subscription",
      category: "Subscription",
      label: "subscription",
      value: 0,
    });

    window.location.reload();
  };
  const has_no_subscription =
    SubscriptionData?.getMollieSubscriptionForPage?.description === null ||
    SubscriptionData === undefined;
  const has_free_account =
    herdenkingspagina?.herdenkingspaginaprivatetoken?.Payment_plan === 0;

  return (
    <>
      <div className="background_dashboard">
      <Layout page_name={'Paginabeheer'} />


    
        {/* edit page settings */}
        <div className="add_page_container_margin">
          <div className="all_pages_textbox"> PAGINA BEWERKEN</div>
        </div>

        <EditPage data={herdenkingspagina} />

        {/* contactlist page settings */}

        <div className="add_page_container">
          <Tooltip title={Tooltipdata["explanation_authors"].text}>
            <div className="all_pages_textbox"> AUTEURS VAN LEVENSTIJDLIJN</div>
          </Tooltip>
          <div
            className="add_page_container_btn"
            onClick={() => {
              handleOpenInvite();
            }}
          >
            <div className="add_page_btn"> UITNODIGING STUREN </div>
            <img
              src="/img/icons/add_btn.svg"
              alt="Aeterna"
              className="add_btn_icon"
            />
          </div>
        </div>
        <InviteModal
          handleCloseInvite={handleCloseInvite}
          handleOpenInvite={handleOpenInvite}
          open={open}
          public_token={public_token}
          username={meData.me.user?.username}
        />

        <div className="edit_page_container">
          <table className="contact_list_table">
            <>
              <thead></thead>
              <tbody>
                {requestsData!.requestsByPaginaId.map((request) => (
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
                          changeStatus(STATUS.Denied, acessrequestid);
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
                          changeStatus(STATUS.Pending, acessrequestid);
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
                          changeStatus(STATUS.Approved, acessrequestid);
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
                            Een persoon die alle publieke boodschappen kan zien
                          </div>
                        </div>
                      </StyledMenuItem>
                      <StyledMenuItem
                        key="intimate_circle"
                        onClick={(e: any) => {
                          changeStatus(STATUS.Intimate, acessrequestid);
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
                            Persoon die alle publieke en intieme herinneringen
                            kan zien
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
                            status: STATUS.Owner ,
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
          <Limits_of_page herdenkingspagina={herdenkingspagina!} />

          <div className="border_settings_subscription_container"></div>

          <div className="subscription_update_container">
            <div className="current_sub_settings_title">
              LEVENSTIJDLIJN ABONNEMENT -{" "}
              {
                PAYMENT_PLAN[
                  herdenkingspagina!.herdenkingspaginaprivatetoken!.Payment_plan
                ]
              }
            </div>

            <div className="current_settings_dates_container">
              <div className="current_settings_date_container">
                <div className="current_settings_date_label">Oprichtdatum</div>
                <div className="start_sub_date">
                  {formatDate_text(
                    herdenkingspagina?.herdenkingspaginaprivatetoken?.createdAt
                  )}
                </div>
              </div>
              {has_free_account || !has_no_subscription ? null : (
                <div className="current_settings_date_container">
                  <div className="current_settings_date_label">
                    Beschikbaar tot
                  </div>
                  <div className="valid_until_sub_date">
                    {herdenkingspagina?.herdenkingspaginaprivatetoken
                      ?.ValidUntil ? (
                      formatDate_string(
                        herdenkingspagina?.herdenkingspaginaprivatetoken
                          ?.ValidUntil
                      )
                    ) : (
                      <>geen einddatum</>
                    )}
                  </div>
                </div>
              )}
            </div>

            {has_no_subscription ? null : (
              <div className="amount_of_days_available_text">
                {/* {Math.ceil((new Date(herdenkingspagina!.herdenkingspaginaprivatetoken!.ValidUntil).valueOf() - new Date().valueOf())/ (1000 * 60 * 60 * 24))}  */}
                Premium subscriptie actief{" "}
              </div>
            )}

            {/* cancel en restart subscription */}
            {has_no_subscription ? (
              <div
                className="extend_subscription_btn"
                onClick={(e: any) => {
                  start_subscription(e, false);
                }}
              >
                {" "}
                Abonnement starten{" "}
                <BsArrowRight className="extend_subscription_icon" />
              </div>
            ) : (
              <>
                {/* <div className="current_settings_date_label">Volgende maandelijkse betaling is:</div>

                            <div className="start_sub_date">{((SubscriptionData?.getMollieSubscriptionForPage?.nextPaymentDate))}</div>  */}

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

                          

                      </div>


                </div>
                

           
                <Price_Table data={herdenkingspagina?.herdenkingspaginaprivatetoken?.Payment_plan} />
          

              <div className="dashboard_footer" onClick={()=>{router.push("/#home")}}>
                  <img src="/img/logos/logo_black.svg" alt="Aeterna"  className="dashboard_footer_img"/>       
              </div>

           
        </div>



     

      {confirmed ? (
        <>
          <ConfirmationModal
            data={confirmation_obj}
            validate_function={changeStatus}
            cancel_function={cancel_subscription}
            confirmed={confirmed}
            setconfirmed={setconfirmed}
          />{" "}
        </>
      ) : null}
    </>
  );
};

export default WithApollo({ ssr: false })(Settings);
