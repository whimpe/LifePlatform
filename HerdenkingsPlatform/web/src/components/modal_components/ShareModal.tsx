import React, { useState,useRef,useEffect } from "react";
import { FaFacebook, FaShare, FaShareSquare } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoCloseOutline, IoLogoWhatsapp } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";
import { SiGmail, SiWhatsapp, SiFacebook } from "react-icons/si";
import { Tooltip } from "@material-ui/core";
import Tooltipdata from "../../../assets/tooltips_text.json";
import { QRCode } from 'react-qrcode-logo';
import { useHerdenkingspaginaprivatetokenQuery } from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
// import MetaTags from "../general/MetaTags";
// import QRCodeStyling from "qr-code-styling";
import dynamic from 'next/dynamic'


interface ShareModalProp {
  ShareModalClick: boolean;
  setShareModalClick: any;
  name_of_page: string;

}

const ShareModal: React.FC<ShareModalProp> = ({
  ShareModalClick,
  setShareModalClick,
  name_of_page, 
}) => {

  const public_token = useGetStringFromUrl("public_token");
  const [options, setOptions] = useState({
    width: 300,
    height: 300,
    type: 'svg',
    data: 'http://qr-code-styling.com',
    // image: '/favicon.ico',
    margin: 10,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte' ,
      errorCorrectionLevel: 'Q' 
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 20,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: '#000',
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
      // },
      type: 'dots' 
    },
    backgroundOptions: {
      color: 'transparent',
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
    cornersSquareOptions: {
      color: '#000',
      type: 'square',
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: '#000',
      type: 'square' ,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
      // },
    }
  });
  const [private_link_view, setprivate_link_view] = useState(true);
  const [CursorLink, setCursorLink] = useState('');
  const [Text_Clipboard, setText_Clipboard] = useState("Kopieer naar klembord");
  const [size, setsize] = useState(190)




  const {data, loading,error} = useHerdenkingspaginaprivatetokenQuery({variables:{paginaId:public_token}});

  if(loading){ return( <div> laden... </div>) }

  

  const private_link = `https://aeterna.be/PLATFORM/${data?.herdenkingspaginaprivatetoken?.private_token}`;
  const public_link = `https://aeterna.be/PLATFORM/${public_token}`;

 

  const setValueCursorLink = () => {
    if (private_link_view) {
      setCursorLink(`${public_link}`);
    } else {
      setCursorLink(`${private_link}`);
    }
    setText_Clipboard("Kopieer naar klembord");
  };

  const download_QR = (e: any, link: any) => {
    setsize(800);
    const canva = document.getElementById('react-qrcode-logo') as HTMLCanvasElement ;
    const pngUrl = canva.toDataURL('image/png');;
    // const pngUrl = canva[0].toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.download = `${name_of_page}_QrCode.png`;
    downloadLink.href = pngUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setsize(190);

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
 
             <a className="social_share_btn_box" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${ private_link_view ? `${private_link}` : `${public_link}` }`} >
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
                  {/* <div className="social_share_link_label"> Levensverhaal{" "} {private_link_view ? "directe link" : "indirecte link"} </div> */}
                  

                  <Tooltip title={Tooltipdata["explanation_direct-indirect"].text} placement="bottom">
                    <div className="box_link_select">
                      <div className="subscription_page_switch_text"> indirecte toegang </div>
                      <label className="subscription_price_switch">
                        <input 
                          type="checkbox"
                          checked={private_link_view}
                          onChange={(e: any) => {
                            setprivate_link_view(e.target.checked);
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
                  {/* <div className="social_share_qr_text"> De Qr-code van het Levensverhaal van {name_of_page} </div> */}
                  <div className="social_share_qr_img">
                    {private_link_view ? (
                        <div id={private_link}>
                        <QRCode enableCORS={true}  value={private_link} size={size} ecLevel={"M"} fgColor={"#000"} logoOpacity={1} logoImage={"/img/logos/black_flower_white_bg.png"} logoWidth={55} logoHeight={40} qrStyle={"dots"} bgColor={'transparent'} eyeRadius={0} quietZone={0}/>
                        </div>
                      
                    ) : (
                      <div id={public_link}>
                        <QRCode enableCORS={true} value={public_link} size={size} ecLevel={"M"} fgColor={"#000"} logoOpacity={1} logoImage={"/img/logos/black_flower_white_bg.png"} logoWidth={55} logoHeight={40} qrStyle={"dots"} bgColor={'transparent'} eyeRadius={0} quietZone={0}/>

                        </div>
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
export default WithApollo({ ssr: false })(ShareModal);

