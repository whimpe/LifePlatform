import { BsCheck } from "react-icons/bs"

interface MockupPreviewProps {
}

export const MockupPreview: React.FC<MockupPreviewProps> = ({}) => {
    
    return (

        <div className="mockup_background">
          
            <div className="mockup_video_container">
                <video autoPlay muted loop  playsInline disablePictureInPicture id="mockup_video">
                    <source src={"/videos/mockup_desk.mp4"} type="video/mp4" /> Your browser does not support HTML5 video.                
                </video> 
                <div className="mockup_video_filter"></div>
          
            </div>

            <div className="mockup_text_container">
            <div className="mockup_title_box">
                    <div className="mockup_title">HERINNEREN</div>
                    <div className="mockup_subtitle">VOOR ALTIJD</div>
            </div>
            <p className="mockup_info_text"><a className="main_quote_title_logo">AETERNA</a>  is een online platform waarmee je herinneringen van jezelf of dierbaren om je heen levendig kunt houden voor altijd.</p>

            <div className="mockup_feature_containter">
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Verhalen en anekdotes verzamelen</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Mensen uitnodigen om deel te nemen</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Herinneringen over generaties heen bewaren</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Video’s, foto’s en audio raadplegen mits toegang</div>  </div>
                    <div className="mockup_feature_box"><BsCheck className='mockup_feature_icon'/> <div className="mockup_feature_text">Oude media digitaliseren</div>  </div>
            </div>
            
            </div>

        </div>

    );
}
