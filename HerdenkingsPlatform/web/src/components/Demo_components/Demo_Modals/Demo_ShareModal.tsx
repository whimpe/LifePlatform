import React, { useState } from "react";
import { FaFacebook, FaShare, FaShareSquare } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoCloseOutline, IoLogoWhatsapp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";
import { SiGmail, SiWhatsapp, SiFacebook } from "react-icons/si";
import { Tooltip } from "@material-ui/core";
import Tooltipdata from "../../../assets/tooltips_text.json";

var QRCode = require("qrcode.react");

// const shareButtonProps = {
//     url: "https://github.com/greglobinski/react-custom-share",
//     network: "Facebook",
//     text: "Give it a try - react-custom-share component",
//     longtext:
//       "Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch."
//   };

interface Demo_ShareModalProp {
  ShareModalClick: boolean;
  setShareModalClick: any;
  name_of_page: string;
  public_link: string;
  private_link: string;
}

const Demo_ShareModal: React.FC<Demo_ShareModalProp> = ({
  ShareModalClick,
  setShareModalClick,
  name_of_page,
  public_link,
  private_link,
}) => {
  const [private_link_view, setprivate_link_view] = useState(true);
  const [CursorLink, setCursorLink] = useState(private_link);
  const [Text_Clipboard, setText_Clipboard] = useState("Kopieer naar klembord");

  const setValueCursorLink = () => {
    if (private_link_view) {
      setCursorLink(`${public_link}`);
    } else {
      setCursorLink(`${private_link}`);
    }
    setText_Clipboard("Kopieer naar klembord");
  };

  const download_QR = (e: any, link: any) => {
    const canva = document.getElementById(link) as HTMLCanvasElement;
    const pngUrl = canva.toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.download = `${name_of_page}_QrCode.png`;
    downloadLink.href = pngUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const copy_link = (e: any) => {
    var copyText = CursorLink;
    console.log(copyText);
    navigator.clipboard.writeText(CursorLink);
    setText_Clipboard("Gekopieerd in klembord");
  };

  return (
    <>
      {ShareModalClick ? (
        <>
          <div id="myModal" className="modal">
          <div className="modal_content_memory">
          <div className="close_button">
                    <IoCloseOutline className="close_button_icon"  onClick={(e:any) => {setShareModalClick(false)}}  />
            </div>

              <div className="flashcard_container">
                <div className="flashcard_title">Levenstijdlijn delen </div>
                <div className="modal_share_btn_container">
                  {/* <ShareButton {...shareButtonProps}>
                            <FaFacebook />
                        </ShareButton> */}
                  <a
                    className="social_share_btn_box"
                    target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${
                      private_link_view ? `${private_link}` : `${public_link}`
                    }`}
                  >
                    <div
                      className="social_share_fb_icon_box"
                      data-href="https://developers.facebook.com/docs/plugins/"
                    >
                      <SiFacebook className="social_share_fb_icon" />
                    </div>
                    <div className="social_share_text">Facebook</div>
                  </a>

                  <div className="whatappshare_view">
                    <a
                      className="social_share_btn_box"
                      href={`whatsapp://send?text=Bekijk en deel mooie verhalen van onze dierbare ${name_of_page} via onderstaande link ${
                        private_link_view ? `${private_link}` : `${public_link}`
                      } `}
                      target="_blank"
                    >
                      <div className="social_share_wa_icon_box">
                        <RiWhatsappFill className="social_share_wa_icon" />
                      </div>
                      <div className="social_share_text">Whats App</div>
                    </a>
                  </div>

                  <a
                    className="social_share_btn_box"
                    target="_blank"
                    href={`mailto:?subject=Bekijk en deel mooie verhalen van onze dierbare ${name_of_page}&body=Klik op deze link (${
                      private_link_view ? `${private_link}` : `${public_link}`
                    }) om mooie momenten van ${name_of_page} te delen en herbeleven.`}
                  >
                    <div className="social_share_ma_icon_box">
                      <SiGmail className="social_share_ma_icon" />
                    </div>
                    <div className="social_share_text">Email</div>
                  </a>
                </div>

                <div className="social_share_link_container">
                  <div className="social_share_link_label"> Levensverhaal{" "} {private_link_view ? "directe link" : "indirecte link"} </div>
                  

                  <Tooltip title={Tooltipdata["explanation_direct-indirect"].text} placement="bottom">
                    <div className="box_link_select">
                      <div className="subscription_page_switch_text"> indirecte toegang </div>
                      <label className="subscription_price_switch">
                        <input 
                          type="checkbox"
                          checked={private_link_view}
                          onChange={(e: any) => {
                            setprivate_link_view(e.target.checked);
                            setValueCursorLink();
                          }}
                        />
                        <span className="price_slider round"></span>
                      </label>
                      <div className="subscription_page_switch_text">
                        directe toegang
                      </div>
                    </div>

                  </Tooltip>


                  
                  <div className="social_share_link_box" id="share_link_id">
                    {private_link_view ? `${private_link}` : `${public_link}`}
                    <Tooltip title={Text_Clipboard} placement="top">
                      <div
                        className="social_share_link_icon"
                        onClick={(e: any) => copy_link(e)}
                      >
                        <FaShareSquare />
                      </div>
                    </Tooltip>
                  </div>

               
                </div>

                <div className="social_share_qr_container">
                  <div className="social_share_qr_text">
                    De Qr-code van het Levensverhaal van {name_of_page}
                  </div>
                  <div className="social_share_qr_img">
                    {private_link_view ? (
                      <QRCode value={private_link} id={private_link} size={190} level={"H"} includeMargin={false} />
                    ) : (
                      <QRCode value={public_link} id={private_link} size={190} level={"H"} includeMargin={false}
                      />
                    )}
                  </div>
                  <div
                    className="social_share_qr_download_btn"
                    onClick={(e: any) => {
                      download_QR(e, private_link);
                    }}
                  >
                    Download de Qr-code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Demo_ShareModal;
