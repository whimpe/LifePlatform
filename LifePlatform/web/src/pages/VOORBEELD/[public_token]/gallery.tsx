import {
  Flex
} from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { BsCameraVideo, BsFiles } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import { MediaDisplay } from "../../../components/general/MediaDisplay";
import MetaTags from "../../../components/general/MetaTags";
import StackGridGalleryElement from "../../../components/grid_blocks/StackGridGalleryElement";
import CreateContent from "../../../components/Demo_components/Demo_Modals/Demo_CreateContent";
import { AMOUNT_OF_MEMORIES_PLAN } from "../../../constants";
import {
  useHerdenkingspaginaQuery,
  useHerinneringen_Gallerij_DemoQuery
} from "../../../generated/graphql";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";





const Gallery: React.FC<{}> = ({}) => {

  const public_token = useGetStringFromUrl("public_token");
  const [category, setcategory] = useState('all'); //image,audio, video
  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content');
  const [LightboxClick, setLightboxClick] = useState(false);
  const [media_object, setmedia_object] = useState({'herinneringId':null,"urlFile":'','mediaType':''});

  
  const { data, error, loading, fetchMore, variables } = useHerinneringen_Gallerij_DemoQuery({
    variables: {
      limit: 25,
      cursor: null,      
      paginaId: public_token
    },
    // fetchPolicy: "cache-and-network", // moet omdat als er gerefreshed word er anders data verdwijnt
    notifyOnNetworkStatusChange: true,
  });
  

    const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
      variables: {
        paginaId: public_token,
      },
    })
  


  if (!data && error && !loading) {
    //TODO: custom error? cant use 404 or _error
  }
 
  // die eerste knop moet vanboven?
  const OpenLightBox =(media:any) =>{
    setLightboxClick(true);
    setmedia_object(media);
  }

  const check_allowed=()=>{
      setmodalState('content');
      setmodalClick(true);
    
  }

  return (
    <>

        <MetaTags title={'DEMO'} 
                type_of_page={'- Galerij'} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />

    <div className="background_platform">

    <Demo_Layout page_name={'Galerij'}>






      

        <CreateContent  type={'content'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState}  />


       <div className="gallery_filter_container">

        <div className="filter_group_container">
          <div className="filter_group_text"><FiFilter className='filter_icon' /> Filter welke media je graag zou zien:</div>
          <div className="category_container">
            <div className='category_btn' onClick={()=>setcategory('all')}><BsFiles className='category_icon_btn' />Alle media</div> 
            <div className='category_btn' onClick={()=>setcategory('image')}><HiOutlinePhotograph className='category_icon_btn'/>Foto</div> 
            <div className='category_btn' onClick={()=>setcategory('video')}><BsCameraVideo className='category_icon_btn' />Video</div>
            <div className='category_btn' onClick={()=>setcategory('audio')}><HiOutlineMicrophone className='category_icon_btn'/>Audio</div> 
            <div className='category_btn_add_media' onClick={()=>check_allowed()}><RiImageAddFill className='category_icon_btn'/>DEEL NIEUWE MEDIA</div> 

          </div>

         </div>


       </div>

        


    {!data && loading ? (
          <Flex align="center" justify="center">
           <CircularProgress color="primary"  size={30}/>
          </Flex>
        ) : (

          <>
           {data!.herinneringen_gallerij_demo.mediaHerinneringen.length===0 ? 
            <div className="memories_default_box" onClick={(e:any)=>{check_allowed()}}>
            <div className="memories_default_container_box">
              <img className="memories_default_view_img"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
              <div className="memories_default_text">{`Start het verhaal van ${herdenkingspagina?.herdenkingspagina?.name_of_page} `}</div>
              <IoMdAdd className='memories_default_icon'/> 
            </div>
            </div>
          :
           <div className="gallery_media_container">
            <div className="masonry_gallerygrid">
              {data!.herinneringen_gallerij_demo.mediaHerinneringen.map((mediaHerr: any) =>
                !mediaHerr ? null : 
                <>


                {/* <div key={mediaHerr.id} className='open_lightbox'  onClick={(e:any)=>OpenLightBox(mediaHerr)}> */}
                {/* {category==='all' ? (<StackGridGalleryElement mediaHerinnering={mediaHerr} type={'gallery'}/>):null} */}
                {((category===('image') || (category==='all')) && (mediaHerr.mediaType==='image'))  ? <div key={mediaHerr.id} className='open_lightbox'  onClick={(e:any)=>OpenLightBox(mediaHerr)}> <StackGridGalleryElement mediaHerinnering={mediaHerr} type={'gallery'} /></div>:null}
                {((category===('video') || (category==='all'))  && (mediaHerr.mediaType==='video')) ? <StackGridGalleryElement mediaHerinnering={mediaHerr} type={'gallery'} />:null}
                {((category===('audio') || (category==='all'))  && (mediaHerr.mediaType==='audio')) ? <StackGridGalleryElement mediaHerinnering={mediaHerr} type={'gallery'} />:null}   
                {/* </div>                                */}
                </>
              )}
            </div>
          </div>
          }        
        </>
        )}

        {data && data.herinneringen_gallerij_demo.hasMore ? (
          <div className='add_more_container'>
          <button   onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor:
                      data.herinneringen_gallerij_demo.mediaHerinneringen[
                        data.herinneringen_gallerij_demo.mediaHerinneringen.length - 1
                      ].createdAt,
                  },
                });
              }} className='add_more_btn'>{loading ? <CircularProgress color="primary"  size={30}/> : 'Meer media'}</button>             
        </div>
        
        ) : null}

        {/* lightboxview */}
      {LightboxClick ?
      
      <div className="lightbox2" onClick={(e:any)=>{setLightboxClick(false)}}>        
        <div key={media_object.herinneringId}  >                   
            <div className='gallery_item_view_box'>   
            <span className="close" ><FaTimes /></span>
              <MediaDisplay awsUrl={media_object.urlFile} width={'100%'}   type={media_object.mediaType}  designclass='lightbox2_gallery_item'/> 
              <a href={`/VOORBEELD/${public_token}/memory/${media_object.herinneringId}`}  className='lightbox2_gallery_elem_btn' >bekijk herinnering</a>
            </div>        
          </div>
        </div>
    :null}



        </Demo_Layout>
      </div>



    </>
  );
};

export default WithApollo({ ssr: false })(Gallery);

