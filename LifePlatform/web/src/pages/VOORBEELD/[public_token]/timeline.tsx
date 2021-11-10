import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";
import { BsArrowLeft,BsArrowRight, BsArrowsFullscreen, BsChevronLeft, BsChevronRight,BsThreeDots } from "react-icons/bs";
import { FaBookReader } from "react-icons/fa";
import { GrAddCircle,GrAdd } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io"; 
import { RiArrowLeftLine, RiArrowRightLine,RiDashboardLine } from "react-icons/ri";
import ErrorPage from "../../../components/general/ErrorPage";
import { Layout } from "../../../components/general/Layout";
import { MediaDisplay } from "../../../components/general/MediaDisplay";
import MetaTags from "../../../components/general/MetaTags";
import CreateContent from "../../../components/modal_components/CreateContent";
import ErrorModal from "../../../components/modal_components/ErrorModal";
import { AMOUNT_OF_MEMORIES_PLAN } from "../../../constants";
import { useHerdenkingspaginaQuery, useHerinneringenByDateQuery, useHerinneringenByDate_DemoQuery, useHerinneringenQuery, useHerinneringQuery, useMeQuery } from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { get_year_db } from "../../../utils/FormatDate";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";
import Memory_id from "./memory/[memory_id]";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";


const delay = (ms:any) => new Promise(res => setTimeout(res, ms));
// const years:Array<String> = [];    //all the unique years
// const years_index:Array<number> = []; //all the indexes of the unique years
const navigation = { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" };


const Timeline: React.FC<{}> = ({}) => {

  
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content');
  const [swiper, setswiper] = useState<any>(null);
  const [swiper_year, setswiper_year] = useState<any>(null);
  const [current_year_index, setcurrent_year_index] = useState(null)
  const [current_memory_index, setcurrent_memory_index] = useState(null)
  const [view_memory, setview_memory] = useState(false);
  const [memory_id, set_memory_id] = useState('');
  const [Error_value, setError_value] = useState(false)
  const [years, setyears] = useState<Array<string>>([]);
  const [years_index, setyears_index] = useState<Array<number>>([]);
  const { data: meData, loading: Meloading } = useMeQuery({ variables: { paginaId: public_token, }, skip: isServer(), });

  // useIsAuth(STATUS.Approved);


  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({ variables: { paginaId: public_token, }, })  
  const { data:hpdata, error:herinneringenbydateERROR, loading:herinneringenByDateLoading } = useHerinneringenByDate_DemoQuery({ variables: { paginaId: public_token, }, notifyOnNetworkStatusChange: true, });


  // const { data:herr_data, error:herr_error, loading:herr_loading } = useHerinneringQuery({ variables: { id: memory_id, paginaId: public_token }, });
  
  const check_allowed=()=>{
  if(herdenkingspagina!.herdenkingspagina!.number_of_memories >= AMOUNT_OF_MEMORIES_PLAN[herdenkingspagina!.herdenkingspagina!.Payment_plan]){
    setError_value(true)
  }else{
    setmodalState('media');
    setmodalClick(true);
  }
}

  if (herinneringenByDateLoading  || hploading ) {
    return (<div><Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex></div>);
  }





var show_default_timeline =  hpdata?.herinneringenByDate_demo.length===0;



async function zoom_in(herr_id:any,has_image:boolean) {
  set_memory_id(herr_id);
  if(has_image){
    document.getElementById(herr_id)!.className = 'zoom_in_animation';
    router.push(`/VOORBEELD/${public_token}/memory/${herr_id}`)

    await delay(3000);
  }
}

const prev_slide_update = (index_mem:number) =>{
  if (swiper.activeIndex<years_index[swiper_year.activeIndex]){
    swiper_year.slidePrev(2500); 
    }
}
const next_slide_update = (index_mem:number) =>{
  if (swiper.activeIndex>years_index[swiper_year.activeIndex]){
      swiper_year.slideNext(2500);
  }
}

const on_swipe = (index_mem:number)=>{
  if (swiper.activeIndex>years_index[swiper_year.activeIndex]){
    swiper_year.slideNext(2500);
  }
  if (swiper.activeIndex<years_index[swiper_year.activeIndex]){
    swiper_year.slidePrev(2500);
  }

}

var i;
for (let i = 0; i < hpdata!.herinneringenByDate_demo.length ; i++) {
  if (!years.includes(get_year_db(hpdata?.herinneringenByDate_demo[i].datumVanHerinnering))){
    years.push(get_year_db((hpdata?.herinneringenByDate_demo[i].datumVanHerinnering)));
    years_index.push(i);
  }    
}



  return (
    <>
  
        <MetaTags title={herdenkingspagina?.herdenkingspagina?.name_of_page} 
                type_of_page={'- Levensverhaal'} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />



<Demo_Layout page_name={'Herinneringen'} >

    <div className="background_platform">

    {show_default_timeline ? null:

      <>
   
               
               

        <div className="year_items_container">

              <div className="year_items_arrow_box" onClick={(e:any) => {swiper_year.slidePrev(2500); swiper.slideTo(years_index[swiper_year.activeIndex]); }}>
                    <div className="year_items_arrow"  ><BsArrowLeft className='year_items_arrow_icon'/></div>
              </div>

            <Swiper modules={[Navigation, Pagination]} speed={900} 
                    centeredSlides= {true} 
                    slidesPerView={5}
                    onSwiper={(swiper:any) => { setswiper_year(swiper); setcurrent_year_index(swiper.activeIndex) }} 
                    slideClass={'swiper-slide-year'}
                    slidePrevClass={'swiper-slide-prev-year'}
                    slideNextClass={'swiper-slide-next-year'}
                    slideActiveClass={'swiper-slide-active-year'}
                    breakpoints={{ 
                      // 1200:{ slidesPerView:, },
                      768:{ slidesPerView:5},
                      450:{ slidesPerView:3},
                    }}
                    
                    > 

              {years.map((year_item: any,index:any) =>(   
             
             <SwiperSlide className='swiper-slide-year'>
             
                          <div key={year_item} className="year_items_box">
                              <div className='year_items_element'  onClick={(e:any)=>{swiper.slideTo(years_index[index],2500);swiper_year.slideTo(index);}}>{year_item}</div>                                
                          </div>                 

            </SwiperSlide>
            ))}                                
            </Swiper>
              <div className="year_items_arrow_box" onClick={(e:any) => {swiper_year.slideNext(2500);swiper.slideTo(years_index[swiper_year.activeIndex]); }}>
                      <div className="year_items_arrow" ><BsArrowRight className='year_items_arrow_icon'/></div>
              </div>
            </div>
       
              
    
    </>
    
    }





        <div className="add_memory_btn_box" onClick={(e:any)=>{check_allowed();}}>
          <div className="add_memory_btn">
            <div className="add_memory_icon_box"><GrAdd className="add_memory_icon" /></div>
          </div>
          <div className="add_memory_text">DEEL EEN HERINNERING</div>
        </div>

        

        <div className="collage_btn_box" onClick={(e:any)=>{router.push(`/VOORBEELD/${herdenkingspagina?.herdenkingspagina?.id}/memories`)}}> 
          <div className="collage_btn">
            <div className="collage_icon_box"><RiDashboardLine className="collage_icon" /></div>
          </div>
          <div className="add_memory_text">OVERZICHT</div>
        </div>

        <CreateContent  type={'timeline'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState} />


    
            {show_default_timeline ?                    
              <>
                <div className="memories_default_box" onClick={(e:any)=>{check_allowed(); }}>
                    <div className="memories_default_container_box">
                      <img className="memories_default_view_img"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
                      <div className="memories_default_text">{`Start het verhaal over ${herdenkingspagina?.herdenkingspagina?.name_of_page} `}</div>
                      <IoMdAdd className='memories_default_icon'/> 
                    </div>
                </div>
              </>
                :
                <>

                <div className="timeline_wrapper">
                


                    <Swiper
                        modules={[Navigation, Pagination]}
                        slideClass={'swiper-slide'}
                        slidePrevClass={'swiper-slide-prev'}
                        slideNextClass={'swiper-slide-next'}
                        slideActiveClass={'swiper-slide-active'}
                        speed={900}
                        // slidesPerView={1.7}
                        breakpoints={{ 
                          1200:{ slidesPerView:1.7, },
                          450:{ slidesPerView:1.2, }
                        }}
                        // longSwipes={false}
                        centeredSlides= {true}                 
                        className="mySwiper"                      
                        onSwiper={(swiper:any) => { setswiper(swiper);  }}
                        onSlideChange={() =>{on_swipe(swiper.activeIndex)}} 
                      >
    
         
                {hpdata?.herinneringenByDate_demo.map((herr: any,herr_index:any) =>(
                  <>

            <SwiperSlide>                     
                        {herr.media.length>0 ? 
                        <>
                            <div className="media_timeline_wrapper" id='media_timeline_wrapper'>
                                <a className='timeline_link_memory'  href={`/VOORBEELD/${public_token}/memory/${herr.id}`} >
                                    <MediaDisplay awsUrl={herr.media[0].urlFile} type={herr.media[0].mediaType} designclass={'memory_card_image'} memory_id={herr.id} />  
                                </a>                                                                                                                                                                                  
                                {herr.media.length>1 ?    <MediaDisplay awsUrl={herr.media[1].urlFile} type={herr.media[1].mediaType} designclass={'swiper_portraits_item_left'} /> :null} 
                                {herr.media.length>2 ?    <MediaDisplay awsUrl={herr.media[2].urlFile} type={herr.media[2].mediaType} designclass={'swiper_portraits_item_right'} /> :null}                                                       
                            </div>

                            <div className="media_timeline_text_box">
                                <div className="media_timeline_title_box"><div className='media_timeline_title'>{herr.title}</div> </div>   
                                <div className="media_timeline_btn_box" onClick={(e:any)=>{zoom_in(herr.id ,true)}}><div className='media_timeline_btn'>BEKIJK HERINNERING</div> </div>   
                            </div>
                            
                          
                                
                
  
                        </>
                        :   
                        // with no media   
                        
                        <div className="media_timeline_text_only_box">
                          <div className="memory_card_title_box"><div className='memory_card_title'>{herr.title}</div> </div>               
                          {herr.text != null ?  <div className='memory_card_text'>{herr.text.substr(0,300)}...</div> :null}
                          <div className="media_timeline_btn_box" onClick={()=>{zoom_in(herr.id,false)}}><div className='media_timeline_btn'>BEKIJK HERINNERING</div> </div>   
                        </div>
  
                        }                
            </SwiperSlide>                    
                  </>
                ))}   
                                      </Swiper>
              {/* NEXT + PREV BUTTONS */}
              <div className="swiper-button-box-prev" onClick={(e:any) => {swiper.slidePrev(500); prev_slide_update(swiper.activeIndex);  }}>
                    <div className="swiper-button-prev2"  ><BsArrowLeft className='swiper-button-next-icon'/></div>
              </div>

              <div className="swiper-button-box-next" onClick={(e:any) => {swiper.slideNext(500); next_slide_update(swiper.activeIndex);  }}>
                    <div className="swiper-button-next2" ><BsArrowRight className='swiper-button-next-icon'/></div>
              </div>          

             </div>





          </>}

    </div>
    </Demo_Layout>

{/* } */}



      {Error_value ? <ErrorModal  active={Error_value} setactive={setError_value} error_type={'max_memories'}  link={`/VOORBEELD/${public_token}/settings`}/> :null}
    </>
  );
};

export default WithApollo({ ssr: false })(Timeline);
