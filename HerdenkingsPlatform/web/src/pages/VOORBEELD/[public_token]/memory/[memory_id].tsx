import {
  Flex
} from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Demo_Layout } from "../../../../components/Demo_components/Demo_Layout";
import { Demo_EditDeleteHerinneringButtons } from "../../../../components/Demo_components/Demo_EditDeleteHerinneringButtons";
import { Demo_Commentsection } from "../../../../components/Demo_components/Demo_Commentsection";
import { MediaDisplay } from "../../../../components/general/MediaDisplay";
import StackGridGalleryElement from "../../../../components/grid_blocks/StackGridGalleryElement";
import {
  Herinnering,
  useHerdenkingspaginaQuery, useHerinnering_DemoQuery
} from "../../../../generated/graphql";
import { formatDate_object_Date_Month_Year, formatDate_string } from "../../../../utils/FormatDate";
import { isServer } from "../../../../utils/isServer";
import { useGetStringFromUrl } from "../../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../../utils/withApollo";

const Memory = () => {
  const public_token = useGetStringFromUrl("public_token");
  const intId = useGetStringFromUrl("memory_id");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [LightboxClick, setLightboxClick] = useState(false);
  const [media_object, setmedia_object] = useState({'herinneringId':'','urlFile':'','mediaType':''});

  
  const { data, error, loading } = useHerinnering_DemoQuery({
    variables: { id: intId, paginaId: public_token },
  });

    const {data: PaginaData, loading: Paginaloading, } = useHerdenkingspaginaQuery({
      variables: {
        paginaId: public_token,
      },
      skip: isServer(),
      // we only want this query to run when in the browser!
    });


  

  if(loading) {
    return ( <div> <Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex> </div> );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.herinnering_demo) {
    return <div>could not find herinnering</div>;
  }

  const OpenLightBox =(media:any) =>{
    setLightboxClick(true);
    setmedia_object(media);
  }

  return (
    <>
      <Demo_Layout page_name={'back'}>

      {/* formatDate_string */}
      <div className="main_index_container" >
      <div className="main_index_image_container" >
        {/* relative */}
        {data?.herinnering_demo.media.length !== 0 ? 
          <>
          {/* <MediaDisplay awsUrl={data!.herinnering_demo.media[0].urlFile} type={data!.herinnering_demo.media[0].mediaType} designclass={'main_index_image'}/> */}
          {data?.herinnering_demo.media[0].mediaType ? <img src={data!.herinnering_demo.media[0].urlFile} className='main_index_image_memory'  /> : null}
          <div className="gradient_top"></div>
          <div className="gradient_bottom"></div>
          <div className="gradient_left"></div>
          <div className="gradient_right"></div>
          </>
        :null}
        </div>

        <div className="main_index_title_box_memory">
            <div className="main_index_title_memory">{data?.herinnering_demo.title}</div>
            <div className="main_index_dates">{formatDate_object_Date_Month_Year( new Date(data?.herinnering_demo.datumVanHerinnering as string) )}</div>
        </div>


       
    </div>

    {((data?.herinnering_demo.text === '') || (data?.herinnering_demo.text === null)) ?  null : 
    <div className="main_index_biography_container">
      <div className="main_index_biography_text">{data?.herinnering_demo.text}</div>
      <div className="main_index_biography_author">{`geschreven door ${data?.herinnering_demo.creator.username}`}</div>
    </div>
  }





        <Demo_EditDeleteHerinneringButtons id={data.herinnering_demo.id} creatorId={data.herinnering_demo.creator.id} />

     
        <h2 className='memory_horizontal_line'> <span>HERINNERING GALLERIJ</span> </h2>



        {!data && loading ? (
          <Flex align="center" justify="center">
           <CircularProgress color="primary"  size={30}/>
          </Flex>
        ) : (


          <div key={'gallery_media_cont'} className="gallery_media_container">
            <div className="masonry_gallerygrid">
              {data!.herinnering_demo.media.map((mediaHerr: any) =>
                !mediaHerr ? null : 
                
                <div key={mediaHerr.id}  className='open_lightbox'  onClick={(e:any)=>OpenLightBox(mediaHerr)}>
                <div className='grid_box'>

                <StackGridGalleryElement mediaHerinnering={mediaHerr}  type={'memory'}/>
                </div>
                </div>

              )}
            </div>
          </div>
        )}

        <h2 className='memory_horizontal_line'> verhalen en bijdragen van andere auteurs </h2>
        

        <Demo_Commentsection herinnering={data.herinnering_demo as Herinnering} public_token={public_token}  candelete={false}/>

        <div className="memory_return_container" onClick={(e:any)=> router.push(`/VOORBEELD/${public_token}/memories`)}>
        <BsArrowLeft className='memory_return_icon' />
        </div>


      {LightboxClick ?      
      <div className="lightbox2" onClick={(e:any)=>{setLightboxClick(false)}}>        
        <div key={media_object.herinneringId}  >                   
            <div className='gallery_item_view_box'>   
            <span className="close" ><FaTimes /></span>
              <MediaDisplay awsUrl={media_object.urlFile} width={'100%'}   type={media_object.mediaType}  designclass='lightbox2_memory_item'/> 
              {/* <a href={`/VOORBEELD/${public_token}/memory/${media_object.herinneringId}`}  className='lightbox2_gallery_elem_btn' >bekijk herinnering</a> */}
            </div>        
          </div>
        </div>
       :null}

    
      </Demo_Layout>
    </>
  );
};
export default WithApollo({ ssr: false })(Memory);

