import { Fade, Slide } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import static_text from '../../../assets/static_text.json'

interface StoryTellingBannerProps {
    
  }
  
  export const StoryTellingBanner: React.FC<StoryTellingBannerProps> = ({}) => {
    const router = useRouter();
    const [showStory, setshowStory] = useState(false);
    const [selectedStory, setselectedStory] = useState('willemh'); //0willemh, maite , willeml 
 
  const setStory = (name:string) =>{
    setshowStory(true);
    setselectedStory(name);
  }

    return (
      
       <>
      {showStory ? 
          <div className="detail_story_background">
          < >
            <BsArrowLeft className='detail_story_return' onClick={()=>setshowStory(false)}/>
            {/* <div className="detail_story_text">{static_text.Stories.[selectedStory].text}</div> */}
            {/* <div className="detail_story_img_box"> */}
              {/* <img className="detail_story_img_box"src={static_text.Stories.[selectedStory].img}/>               */}
            {/* </div> */}
            </>
          </div>


      :

       <div className="story_background">
          <>
            <div className="story_title_container">
              <div className="story_title">Herinneren voor altijd</div>
              <div className="story_subtitle">Enkele herinnerings voorbeelden van mensen  <br/>die hun digtale levensmomenten willen delen met iedereen.</div>
            </div>

            <div className="story_card_container">
              <div className="story_card">
              

                <div className="story_cont">
                <img src={'/img/team/story_himpe.png'} className="story_card_img"/>
                  <div className="middle">
                    <div className="story_cont_text" onClick={()=>{setStory('willemh')}}>Lees het verhaal</div>
                  </div>
                </div>

                <div className="story_card_quote">“Mijn kleine zus vroeg mij bij het overlijden van mijn Opa: Wie was mijn Opa?”
                    <br/><div className="story_card_name_sign">Willem H.</div></div>
                <div className="story_card_name_btn"onClick={()=>{setStory('willemh')}}>Lees het verhaal</div>
              </div>


              <div className="story_card">
                <div className="story_cont">
                <img src={'/img/team/maite.jpg'} className="story_card_img"/>
                  <div className="middle">
                    <div className="story_cont_text"onClick={()=>setStory('maite')}>Lees het verhaal</div>
                  </div>
                </div>
                <div className="story_card_quote">“10 Jaar nadat ik mijn mama heb verloren aan kanker kon ik haar stem niet meer herinneren”
                <br/><div className="story_card_name_sign">Maité</div></div>
                <div className="story_card_name_btn"onClick={()=>setStory('maite')}>Lees het verhaal</div>
              </div>


              <div className="story_card">
              <div className="story_cont">
              <img src={'/img/team/story_lann.png'} className="story_card_img"/>
                  <div className="middle">
                    <div className="story_cont_text"onClick={()=>setStory('willeml')}>Lees het verhaal</div>
                  </div>
                </div>
                
                <div className="story_card_quote">“De fotoboeken van mijn Oma beginnen te verkleuren. Deze herinneringen zijn stap voor"
                <br/><div className="story_card_name_sign">Willem L.</div></div>
                <div className="story_card_name_btn"onClick={()=>setStory('willeml')}>Lees het verhaal</div>
              </div>

            </div>
          </>

       </div>
      }
       </> 
    )
}

export default StoryTellingBanner
