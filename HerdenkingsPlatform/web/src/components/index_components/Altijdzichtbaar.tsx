import { useRouter } from 'next/router';
import React, { useState,useCallback } from 'react';
import { GrAdd } from 'react-icons/gr';
import { IoFlameSharp } from 'react-icons/io5';
import { useEffect } from 'toasted-notes/node_modules/@types/react';
import { IndexPageHerdenkingsPaginaFragment } from '../../generated/graphql';
import { get_year } from '../../utils/FormatDate';
import { MediaDisplay } from '../general/MediaDisplay';
import DisplayMarkdown from '../MarkdownHandling/DisplayMarkdown';
import CreateContent from '../modal_components/CreateContent';
import { useSpring, animated } from 'react-spring'

interface AltijdzichtbaarProps {
  herdenkingspagina: IndexPageHerdenkingsPaginaFragment;
  meData: any;
}

// function Animate(offset:any) {
  
//   return <animated.div style={{ position: 'absolute',opacity }}><div className="main_index_title">test</div></animated.div>
// }

export const Altijdzichtbaar: React.FC<AltijdzichtbaarProps> = ({
  herdenkingspagina,
  meData,
}) => {
  const router = useRouter();
  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content');
  const [{ scroll }, set] = useSpring(() => ({ scroll: 0 }))
  const onScroll = useCallback((e:any) => void set({ scroll: e.target.scrollTop / (window.innerHeight / 2) }), [])
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } ,    delay: 1000, })
  return (
    <>

    <div className="main_index_container">
        <div className="main_index_title_box">              
            
            <div className="main_index_title">{herdenkingspagina.name_of_page}</div>
              <div className="main_index_dates">{get_year(herdenkingspagina.DoB)}{' '} {herdenkingspagina.DoD ? ( <> - {get_year(herdenkingspagina.DoD)}</>) : null}</div>
            </div>

            <div className="main_index_image_container" >
            <img src={herdenkingspagina.mediaUrl} className='main_index_image'  />
            <div className="gradient_top"></div>
            <div className="gradient_bottom"></div>
            <div className="gradient_left"></div>
              <div className="gradient_right"></div>
            </div>      
    </div>

    <div className="main_index_biography_container">
      <div className="main_index_biography_text">{herdenkingspagina.text}</div>
    </div>

    </>
  );
};
