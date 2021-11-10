import {  Flex } from '@chakra-ui/core';
import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { EditDeleteHerinneringButtons } from '../../../../components/edit_delete/EditDeleteHerinneringButtons';
import { CommentSection } from '../../../../components/general/CommentSection';
import { Layout } from '../../../../components/general/Layout';
import { MediaDisplay } from '../../../../components/general/MediaDisplay';
import StackGridGalleryElement from '../../../../components/grid_blocks/StackGridGalleryElement';
import {
  Herinnering,
  useHerdenkingspaginaQuery,
  useHerinneringQuery
} from '../../../../generated/graphql';
import { STATUS } from '../../../../types';
import {
  formatDate_object_Date_Month_Year
} from '../../../../utils/FormatDate';
import { isServer } from '../../../../utils/isServer';
import { useGetStringFromUrl } from '../../../../utils/useGetIntFromUrl';
import { useIsAuth } from '../../../../utils/useIsAuth';
import { WithApollo } from '../../../../utils/withApollo';

export const Memory_id = ( ) => {
  const public_token = useGetStringFromUrl('public_token');
  const memory_id = useGetStringFromUrl('memory_id');
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [LightboxClick, setLightboxClick] = useState(false);
  const [media_object, setmedia_object] = useState({ herinneringId: '', urlFile: '', mediaType: '', });

  useIsAuth(STATUS.Approved);

  const { data, error, loading } = useHerinneringQuery({ variables: { id:memory_id , paginaId: public_token }, });
  const { data: herdenkingspagina, loading: hploading, error: hperror, } = useHerdenkingspaginaQuery({ variables: { paginaId: public_token, }, });


  if (loading) {
    return (
      <div>
        {' '}
        <Flex align='center' justify='center'>
          {' '}
          <CircularProgress color='primary' size={30} />{' '}
        </Flex>{' '}
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // if (!data?.herinnering) {
  //   return <div>could not find herinnering</div>;
  // }

  const OpenLightBox = (media: any) => {
    if (media.mediaType !== 'video') {
      setLightboxClick(true);
      setmedia_object(media);
    }
  };


  return (
    <>
      <Layout page_name={'back'} >
      <div className="main_index_container" >
      <div className="main_index_image_container" >
        {/* relative */}
        {data?.herinnering.media.length !== 0 ? 
          <>
          {((data?.herinnering.media[0].mediaType==='image') && (data?.herinnering.media.length>0)) 
                                                ? <MediaDisplay  type={'image'} awsUrl={data!.herinnering.media[0].urlFile} designclass={'main_index_image_memory'}  /> 
                                                :  <MediaDisplay  type={'image'} awsUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} designclass='main_index_image_memory'  />}
          <div className="gradient_top"></div>
          <div className="gradient_bottom"></div>
          <div className="gradient_left"></div>
          <div className="gradient_right"></div>
          </>
        :null}
        </div>

        <div className="main_index_title_box_memory">
            <div className="main_index_title_memory">{data?.herinnering.title}</div>
            <div className="main_index_dates">{formatDate_object_Date_Month_Year( new Date(data?.herinnering.datumVanHerinnering as string) )}</div>
        </div>


       
    </div>

    {((data?.herinnering.text === '') || (data?.herinnering.text === null)) ?  null : 
    <div className="main_index_biography_container">
      <div className="main_index_biography_text">{data?.herinnering.text}</div>
      <div className="main_index_biography_author">{`geschreven door ${data?.herinnering.creator.username}`}</div>
    </div>
  }



    

        <EditDeleteHerinneringButtons
          id={data!.herinnering.id}
          creatorId={data!.herinnering.creator.id}
        />



        <h2 className='memory_horizontal_line'> HERINNERING GALERIJ </h2>

          <div key={'gallery_media_cont'} className='gallery_media_container'>
            <div className='masonry_gallerygrid'>
              {data!.herinnering.media.map((mediaHerr: any) =>
                !mediaHerr ? null : (
                  <div
                    key={mediaHerr.id}
                    className='open_lightbox'
                    onClick={(e: any) => OpenLightBox(mediaHerr)}
                  >
                    <div className='grid_box'>

                    <StackGridGalleryElement mediaHerinnering={mediaHerr} type={'memory'} />
                        
                  </div>
                  </div>
                )
              )}
            </div>
          </div>

     
        <CommentSection
          herinnering={data?.herinnering as Herinnering}
          public_token={public_token}
          candelete={false}
        />

        <div className='memory_return_container' onClick={(e: any) => router.push(`/PLATFORM/${public_token}/memories`) } >
          <BsArrowLeft className='memory_return_icon' />
        </div>




        {LightboxClick ? (
          <div className='lightbox2' onClick={(e: any) => { setLightboxClick(false); }}
          >
            <div key={media_object.herinneringId}>
              <div className='gallery_item_view_box'>
                <span className='close'>
                  <IoCloseOutline className='close_lightbox_icon'/>
                </span>
                <MediaDisplay
                  awsUrl={media_object.urlFile}
                  width={'100%'}
                  type={media_object.mediaType}
                  designclass='lightbox2_memory_item'
                />
                {/* <a href={`/PLATFORM/${public_token}/memory/${media_object.herinneringId}`}  className='lightbox2_gallery_elem_btn' >bekijk herinnering</a> */}
              </div>
            </div>
          </div>
        ) : null}

      </Layout>
    </>
  );
};
export default WithApollo({ ssr: false })(Memory_id);





