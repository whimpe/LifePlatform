import { Flex, Spinner } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { default as React, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import {
  useMeQuery,
  usePersonalMessageQuery,
} from '../../../../generated/graphql';
import { EditDeleteHerinneringButtons } from '../../../../components/edit_delete/EditDeleteHerinneringButtons';
import { CommentSection } from '../../../../components/general/CommentSection';
import { Layout } from '../../../../components/general/Layout';
import { MediaDisplay } from '../../../../components/general/MediaDisplay';
import StackGridGalleryElement from '../../../../components/grid_blocks/StackGridGalleryElement';
import { Herinnering } from '../../../../generated/graphql';
import { useGetStringFromUrl } from '../../../../utils/useGetIntFromUrl';
import { WithApollo } from '../../../../utils/withApollo';
import { AiOutlineEdit } from 'react-icons/ai';
import { CircularProgress } from '@material-ui/core';
import { useIsAuth } from '../../../../utils/useIsAuth';
import { STATUS } from '../../../../types';
import { formatDate_text } from '../../../../utils/FormatDate';

const PersonalMessage = () => {
  const public_token = useGetStringFromUrl('public_token');
  const personalMessageId = useGetStringFromUrl('personal_message_id');
  const router = useRouter();

  // const intId = useGetStringFromUrl("memory_id");
  // const router = useRouter();
  // const [show, setShow] = React.useState(false);
  const [LightboxClick, setLightboxClick] = useState(false);
  const [media_object, setmedia_object] = useState({
    id: '',
    urlFile: '',
    mediaType: '',
  });
  const { data, error, loading } = usePersonalMessageQuery({
    variables: { id: personalMessageId, paginaId: public_token },
  });
  const { data: meData, loading: meloading } = useMeQuery({
    variables: { paginaId: public_token },
  });

  useIsAuth(STATUS.Approved);

  const OpenLightBox = (media: any) => {
    setLightboxClick(true);
    setmedia_object(media);
  };

  if (loading || meloading) {
    return (
      <div>
        <Flex align='center' justify='center'>
          <CircularProgress color='primary' size={30} />
        </Flex>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  if (meData?.me?.status === undefined) {
    return <></>;
  }

  return (
    <>
      <Layout>
        <div className='memory_return_container'>
          <BsArrowLeft
            className='memory_return_icon'
            onClick={(e: any) =>
              router.push(
                `/PLATFORM/${public_token}/personal-messages-owner-view`
              )
            }
          />
        </div>

        <div className='memory_detail_head_container'>
          <div className='index_text_container'>
            <div className='index_text_date'>
              {data!.personalmessage.dateAvailable ? (
                <> {formatDate_text(data!.personalmessage.dateAvailable)}</>
              ) : null}
            </div>

            <div className='index_text_title'>
              {data!.personalmessage.title}
            </div>
            <div className='index_text_subtext'>
              {data!.personalmessage.text}
            </div>

            {meData?.me?.status >= 3 ? (
              <div className='sticky_btn_container'>
                <div
                  className='sticky_edit_droplet_btn'
                  onClick={(e: any) => {
                    router.push(
                      `/PLATFORM/${public_token}/personal-message/edit/${
                        data!.personalmessage.id
                      }`
                    );
                  }}
                >
                  <AiOutlineEdit className='sticky_droplet_edit_btn_icon' />
                  <div className='sticky_edit_droplet_btn_text'>
                    WIJZIG LAATSTE BOODSCHAP
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* the last image in the row  or main image of page */}
          {data!.personalmessage.media.length !== 0 ? (
            <div className='index_image_container'>
              <MediaDisplay
                awsUrl={data!.personalmessage.media[0].urlFile}
                type={data!.personalmessage.media[0].mediaType}
                designclass='index_image'
              />
            </div>
          ) : null}
        </div>

        {!data && loading ? (
          <Flex align='center' justify='center'>
            <CircularProgress color='primary' size={30} />
          </Flex>
        ) : (
          <div key={'gallery_media_cont'} className='gallery_media_container'>
            <div className='masonry_gallerygrid'>
              {data!.personalmessage.media.map((mediaHerr: any) =>
                !mediaHerr ? null : (
                  <div
                    key={mediaHerr.id}
                    className='open_lightbox'
                    onClick={(e: any) => OpenLightBox(mediaHerr)}
                  >
                    <StackGridGalleryElement
                      mediaHerinnering={mediaHerr}
                      type={'memory'}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className='dashboard_footer'>
          <img
            src='/img/logos/logo_black.svg'
            alt='Aeterna'
            className='dashboard_footer_img'
          />
        </div>

        {LightboxClick ? (
          <div
            className='lightbox2'
            onClick={(e: any) => {
              setLightboxClick(false);
            }}
          >
            <div key={media_object.id}>
              <div className='gallery_item_view_box'>
                <span className='close'>
                  <FaTimes />
                </span>
                <MediaDisplay
                  awsUrl={media_object.urlFile}
                  width={'100%'}
                  type={media_object.mediaType}
                  designclass='lightbox2_memory_item'
                />
              </div>
            </div>
          </div>
        ) : null}
      </Layout>
    </>
  );
};
export default WithApollo({ ssr: false })(PersonalMessage);
