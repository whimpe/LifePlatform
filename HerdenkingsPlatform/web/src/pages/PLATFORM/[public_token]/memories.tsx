import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { MdTimeline } from "react-icons/md";
import ErrorPage from "../../../components/general/ErrorPage";
import { Layout } from "../../../components/general/Layout";
import MetaTags from "../../../components/general/MetaTags";
import StackGridMemoryElement from "../../../components/grid_blocks/StackGridMemoryElement";
import CreateContent from "../../../components/modal_components/CreateContent";
import { ErrorModal } from "../../../components/modal_components/ErrorModal";
import { AMOUNT_OF_MEMORIES_PLAN } from "../../../constants";
import {
  useHerdenkingspaginaQuery,
  useHerinneringenQuery,
  useMediaForVideoSlideshowMutation,
  useMeQuery
} from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";
import Masonry from 'react-masonry-css'

// import pptxgen from "pptxgenjs";
const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  800: 2,
  550: 1
};

const Memories: React.FC<{}> = ({}) => {
  useIsAuth(STATUS.Approved);

  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const [modalClick, setmodalClick] = useState(false);
  const [modalState, setmodalState] = useState("content");
  const [Error_value, setError_value] = useState(false);

  const { data: meData, loading: Meloading } = useMeQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });

  //sizeMe.noPlaceholders = true
  const { data, error, loading, fetchMore, variables } = useHerinneringenQuery({
    variables: {
      limit: 10000,
      cursor: null,
      paginaId: public_token,
    },
    // fetchPolicy:"cache-and-network",// moet omdat als er gerefreshed word er anders data verdwijnt,     fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true, //bij csr zou network only moeten werken
  });

  //TODO; check to fetch oly on one place
    const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
      variables: {
        paginaId: public_token,
      },
    })

if(hploading){ return(<>laden</>) };


  if (!data && error && !loading) {
    console.log("error?.message", error?.message);
    return (<><ErrorPage /> </>);
  }



  // TODO:Himpe verplaats dit naar dashboard en integreer met paginalist? -> naam 
  // powerpoint heractivatie
  // const [getImages] = useMediaForVideoSlideshowMutation();
  // const generateSlideShow = async () => {
  //   const raw_images = await getImages({ variables: { paginaId: public_token }, });
  //   let pres = new pptxgen();
  //   for (let i=0; i< raw_images!.data!.mediaForVideoSlideshow.length; i++){
  //     let slide = pres.addSlide();
  //     slide.background ={color: "#000000"}      
  //     let path = raw_images!.data!.mediaForVideoSlideshow[i].urlFile;
  //     // console.log("imageAsBase64", imageAsBase64);
  //     // slide.addImage({ data: imageAsBase64 });
  //     // let image =  new Image(raw_images!.data!.mediaForVideoSlideshow[i].urlFile);
  //     // slide.addImage({ path: path , x:"50%", y:"50%" });
  //     slide.addImage({ path: path , x:"10%", y:"10%", w:"75%", h:"75%" });
  //     // slide.addImage({ path: path , x:"10%", y:"50%", w:"75%", h:"75%" , sizing:{type:'contain', w: "100%", h:1}});
  //   }
  //   // Naam powerpoint : In plaats van public token -> name_of_page
  //   pres.writeFile({ fileName: public_token });
  //   return raw_images;
  // };



 

  const check_allowed = () => {
    if (
      herdenkingspagina!.herdenkingspagina!.number_of_memories >=
      AMOUNT_OF_MEMORIES_PLAN[
        herdenkingspagina!.herdenkingspagina!.Payment_plan
      ]
    ) {
      setError_value(true);
    } else {
      setmodalState("content");
      setmodalClick(true);
    }
  };
  const go_to_timeline = () => {
    router.push(`/PLATFORM/${herdenkingspagina?.herdenkingspagina?.id}/timeline`);
  }

  return (
    <>
      <MetaTags
        title={herdenkingspagina?.herdenkingspagina?.name_of_page}
        type_of_page={"- Herinneringen"}
        description={herdenkingspagina?.herdenkingspagina?.text}
        mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl}
      />


      <Layout page_name={'Herinneringen'}>

      <div className="background_platform">


      <div className="collage_btn_box_full" onClick={()=>{go_to_timeline()}}> 
          <div className="collage_btn_full">
            <div className="collage_icon_box"><MdTimeline className="collage_icon" /></div>
          </div>
          <div className="add_memory_text">TIJDLIJN</div>
        </div>


        <div className="add_memory_btn_box_full" onClick={(e:any)=>{check_allowed();}}>
          <div className="add_memory_btn_full">
            <div className="add_memory_icon_box"><GrAdd className="add_memory_icon" /></div>
          </div>
          <div className="add_memory_text">DEEL EEN HERINNERING</div>
        </div>




          <CreateContent  type={'memories'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState} />




          {/* <button onClick={() => { const result = generateSlideShow(); console.log("result", result); }} > Klik voor functie </button> */}
  


          {data?.herinneringen.herinneringen.length === 0 ? (
            <div className="memories_default_box" onClick={(e: any) => { check_allowed(); }} >
              <div className="memories_default_container_box">
                <img className="memories_default_view_img" src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
                <div className="memories_default_text">{`Start het verhaal over ${herdenkingspagina?.herdenkingspagina?.name_of_page} `}</div>
                <IoMdAdd className="memories_default_icon" />
              </div>
            </div>
          ) : null}

          {!data && loading ? (
            <Flex align="center" justify="center">
              <CircularProgress color="primary" size={30} />
            </Flex>
          ) : (

            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">

                {data!.herinneringen.herinneringen.map((herr: any) =>
                  !herr ? null : (
                      <>

                     <div key={herr.id}>
                       <StackGridMemoryElement herinnering={herr} />
                     </div>
                    </>
                  )
                )}
              </Masonry>

            //   </div>
            // </div>
            
          )}

          {data && data.herinneringen.hasMore ? (
            <div className="add_more_container">
              <button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.herinneringen.herinneringen[
                          data.herinneringen.herinneringen.length - 1
                        ].createdAt,
                    },
                  });
                }}
                className="add_more_btn"
              >
                {loading ? (
                  <CircularProgress color="primary" size={30} />
                ) : (
                  "Meer Herinneringen"
                )}
              </button>
            </div>
          ) : null}
        </div>
        
      </Layout>
        

      {Error_value ? ( <ErrorModal active={Error_value} setactive={setError_value} error_type={"max_memories"} link={`/PLATFORM/${public_token}/settings`} /> ) : null}
    </>
  );
};

export default WithApollo({ ssr: false })(Memories);