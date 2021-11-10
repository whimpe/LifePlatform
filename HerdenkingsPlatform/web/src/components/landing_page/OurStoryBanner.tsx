import { useRouter } from 'next/router';
import React from 'react'

interface OurStoryBannerProps {
    
  }
  
  export const OurStoryBanner: React.FC<OurStoryBannerProps> = ({}) => {
    const router = useRouter();

    return (
        <div className='ourstory_container'>
            <img src={'/img/landing_page/our_story.png'} className='ourstory_img'/>
            <div className="ourstory_text_box">
                <div className="ourstory_title">“Toen mijn Opa overleden was vroeg mijn kleine zus
                    Waar is Opa? Maar de volgende vraag kwam harder aan... <br/>
                    <div className='ourstory_title_bold'> Wie was mijn Opa?” </div>
                </div>
                {/* <div className="ourstory_text">Wij zijn Aeterna, een digitale en intieme ruimte waar de mooie herinneringen verzameld en vereeuwigd kunnen worden. </div> */}
                <div className="ourstory_btn" onClick={()=>router.push('/ons-verhaal')}>LEES MEER </div>
            </div>
        </div>
    )
}

export default OurStoryBanner
