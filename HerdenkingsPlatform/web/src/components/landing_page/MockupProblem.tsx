import { useRouter } from "next/router";
import { BsCheck, BsX } from "react-icons/bs"

interface MockupProblemProps {
}

export const MockupProblem: React.FC<MockupProblemProps> = ({}) => {
    const router = useRouter();
    return (

        <div className="mockup_background">
           

            <div className="mockup_problemtext_containter">
                    <div className="mockup_title_box">                    
                        <div className="mockup_title">DIERBAREN EN HUN VERHALEN</div>
                        <div className="mockup_subtitle">GAAN VERLOREN</div>
                    </div>
                    {/* <div className="mockup_info_text"> Elke dag zien we meer en meer herinneringen verloren gaan. Als de mooie momenten niet bewaard bijven dan lijkt het alsof ze nooit gebeurd zijn.</div> */}

                    <div className="mockup_feature_containter">
                        <div className="mockup_feature_box"><BsX className='mockup_feature_icon'/> <div className="mockup_feature_text">Zonder aandacht gaan verhalen en herinneringen verloren</div>  </div>
                        <div className="mockup_feature_box"><BsX className='mockup_feature_icon'/> <div className="mockup_feature_text">Oude foto’s verkleuren</div>  </div>
                        <div className="mockup_feature_box"><BsX className='mockup_feature_icon'/> <div className="mockup_feature_text">oude VHS-videobanden en cassettes vergaan na verloop van tijd</div>  </div>
     
                    </div>  
                    <div className="mockup_btn_containter"> 
                    <div className="mockup_btn" onClick={()=>{router.push('/digitaliseren')}}> Digitaliseer jouw media</div>
                   </div>



            </div>

            <div className="mockup_img_container">
                    <img src={'/img/landing_page/fotoboek.png'} className='mockup_img'  />                        
                    <div className="mockup_img_filter"></div>

            </div>

        </div>

    );
}
