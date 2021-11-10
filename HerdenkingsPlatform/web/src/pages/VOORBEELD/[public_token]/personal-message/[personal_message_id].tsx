import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Demo_Layout } from "../../../../components/Demo_components/Demo_Layout";
import { MediaDisplay } from "../../../../components/general/MediaDisplay";
import StackGridGalleryElement from "../../../../components/grid_blocks/StackGridGalleryElement";
import { usePersonalMessage_DemoQuery } from "../../../../generated/graphql";
import { formatDate_string, formatDate_text } from "../../../../utils/FormatDate";
import { useGetStringFromUrl } from "../../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../../utils/withApollo";

const PersonalMessage = () => {
  const public_token = useGetStringFromUrl("public_token");
  const personalMessageId = useGetStringFromUrl("personal_message_id");
  const router = useRouter();

  const [LightboxClick, setLightboxClick] = useState(false);
  const [media_object, setmedia_object] = useState({
    id: "",
    urlFile: "",
    mediaType: "",
  });

  const { data, error, loading } = usePersonalMessage_DemoQuery({
    variables: { id: personalMessageId, paginaId: public_token },
  });

  const OpenLightBox = (media: any) => {
    setLightboxClick(true);
    setmedia_object(media);
  };

  if (loading) { return ( <div> <Flex align="center" justify="center"> <CircularProgress color="primary" size={30} /> </Flex> </div> ); }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Demo_Layout>
        <div className="memory_return_container">
          <BsArrowLeft
            className="memory_return_icon"
            onClick={(e: any) =>
              router.push(`/VOORBEELD/${public_token}/personal-messages`)
            }
          />
        </div>

        <div className="memory_detail_head_container">
          <div className="index_text_container">
            <div className="index_text_date"> {data?.personalmessage_demo.dateAvailable ? <> {formatDate_string(data!.personalmessage_demo.dateAvailable)}</> : null } </div>
            <div className="index_text_title"> {data!.personalmessage_demo.title} </div>
            <div className="index_text_subtext"> {data!.personalmessage_demo.text} </div>

          </div>

          {/* the last image in the row  or main image of page */}
          {data!.personalmessage_demo.media.length !== 0 ? (
            <div className="index_image_container">
              <MediaDisplay
                awsUrl={data!.personalmessage_demo.media[0].urlFile}
                type={data!.personalmessage_demo.media[0].mediaType}
                designclass="index_image"
              />
            </div>
          ) : null}
        </div>

      

        {!data && loading ? (
          <Flex align="center" justify="center">
            <CircularProgress color="primary" size={30} />
          </Flex>
        ) : (
          <div key={"gallery_media_cont"} className="gallery_media_container">
            <div className="masonry_gallerygrid">
              {data!.personalmessage_demo.media.map((mediaHerr: any) =>
                !mediaHerr ? null : (
                  <div
                    key={mediaHerr.id}
                    className="open_lightbox"
                    onClick={(e: any) => OpenLightBox(mediaHerr)}
                  >
                    <StackGridGalleryElement
                      mediaHerinnering={mediaHerr}
                      type={"memory"}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="dashboard_footer">
          <img
            src="/img/logos/logo_black.svg"
            alt="Aeterna"
            className="dashboard_footer_img"
          />
        </div>

        {LightboxClick ? (
          <div
            className="lightbox2"
            onClick={(e: any) => {
              setLightboxClick(false);
            }}
          >
            <div key={media_object.id}>
              <div className="gallery_item_view_box">
                <span className="close">
                  <FaTimes />
                </span>
                <MediaDisplay
                  awsUrl={media_object.urlFile}
                  width={"100%"}
                  type={media_object.mediaType}
                  designclass="lightbox2_memory_item"
                />
              </div>
            </div>
          </div>
        ) : null}
      </Demo_Layout>
    </>
  );
};
export default WithApollo({ ssr: false })(PersonalMessage);
