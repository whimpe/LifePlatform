import { BsCheck } from "react-icons/bs"

interface MockupPreviewPartnerProps {
}

export const MockupPreviewPartner: React.FC<MockupPreviewPartnerProps> = ({}) => {
    
    return (

        <div className="mockup_background">
          
            <div className="mockup_video_container">
                <video autoPlay muted loop  playsInline disablePictureInPicture id="mockup_video">
                    <source src={"/videos/mockup_digitize.mp4"} type="video/mp4" /> Your browser does not support HTML5 video.                
                </video> 
                <div className="mockup_video_filter"></div>
          
            </div>

            <div className="mockup_text_container">
            <div className="mockup_title_box">
                    <div className="mockup_title">Voordelen </div>
                    <div className="mockup_subtitle">Samenwerken</div>
            </div>
            <p className="mockup_info_text"><a className="main_quote_title_logo">AETERNA</a> zorgt voor dat jouw klanten een betere beleving hebben tijdens een periode van rouw en verlies. De begrafenis wordt een betere beleving en herdenking van de verloren dierbare.</p>

            <div className="mockup_feature_containter">
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Digitalisatie service</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Automatische video/slide presentaties</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Persoonlijker afscheid door verzameling verhalen </div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Herbeleving van de herinneringen</div> </div>
                    {/* <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Oude media digitaliseren</div>  </div> */}
            </div>
            
            </div>

        </div>

    );
}
