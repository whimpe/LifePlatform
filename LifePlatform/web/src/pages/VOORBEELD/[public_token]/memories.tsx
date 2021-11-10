import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GrAdd, GrAddCircle } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { MdTimeline } from "react-icons/md";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import Demo_CreateContent from "../../../components/Demo_components/Demo_Modals/Demo_CreateContent";
import DEMO_StackGridMemoryElement from "../../../components/Demo_components/DEMO_StackGridMemoryElement";
import ErrorPage from "../../../components/general/ErrorPage";
import MetaTags from "../../../components/general/MetaTags";
import { AMOUNT_OF_MEMORIES_PLAN } from "../../../constants";
import { useHerdenkingspaginaQuery, useHerinneringen_DemoQuery } from "../../../generated/graphql";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";
import Masonry from 'react-masonry-css'
import StackGridMemoryElement from "../../../components/grid_blocks/StackGridMemoryElement";


const years:Array<String> = [];
var current_year:string='';
const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  800: 2,
  550: 1
};

const Memories: React.FC<{}> = ({}) => {
  

   
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();  
  const [modalClick, setmodalClick] = useState(false);
  const [modalState,setmodalState] = useState('content');

  
  //sizeMe.noPlaceholders = true
  const { data, error, loading, fetchMore, variables } = useHerinneringen_DemoQuery({
    variables: {
      limit: 1000,
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

if(hploading){
  return(<></>)
}


  if (!data && error && !loading) {
    console.log("error?.message", error?.message);
    return (<><ErrorPage /> </>);
  }

  const check_allowed=()=>{
    if(herdenkingspagina!.herdenkingspagina!.number_of_memories >= AMOUNT_OF_MEMORIES_PLAN[herdenkingspagina!.herdenkingspagina!.Payment_plan]){
    }else{
      setmodalState('content');
      setmodalClick(true);
    }
  }

  return (
    <>

        <MetaTags title={'DEMO'} 
                type_of_page={'- Herinneringen'} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />


        <div className="collage_btn_box_full" onClick={(e:any)=>{router.push(`/PLATFORM/${herdenkingspagina?.herdenkingspagina?.id}/timeline`)}}> 
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




    <Demo_Layout page_name={'Herinneringen'}>
      <div className="background_platform">

        {/* <div className="create_content_memories_container"> */}

        {/* <div className="timeline_btn_container">
            <div className='timeline_droplet_btn'>
              <div className="timeline_droplet_btn_text" onClick={(e:any)=>{check_allowed()}}>DEEL NIEUWE HERINNERING</div> <GrAddCircle className='droplet_btn_icon' />
            </div>
          </div>

        {/* </div> */}
      <Demo_CreateContent  type={'memories'}  name_of_page={''} modalClick={modalClick} setmodalClick={setmodalClick} modalState={modalState} setmodalState={setmodalState} /> 

      { data?.herinneringen_demo.herinneringen.length===0 ? 
       <div className="memories_default_box" onClick={(e:any)=>{check_allowed()}}>
       <div className="memories_default_container_box">
         <img className="memories_default_view_img"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
         <div className="memories_default_text">{`Start het verhaal over ${herdenkingspagina?.herdenkingspagina?.name_of_page} `}</div>
         <IoMdAdd className='memories_default_icon'/> 
       </div>
      </div>
      
      :null}


        {!data && loading ? (
          <Flex align="center" justify="center">
           <CircularProgress color="primary"  size={30}/>
          </Flex>
        ) : (
          
          <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">

            {data!.herinneringen_demo.herinneringen.map((herr: any) =>
              !herr ? null : (
                  <>

                 <div key={herr.id}>
                   <StackGridMemoryElement herinnering={herr} />
                 </div>
                </>
                
      
              ))}
              </Masonry>

        )}

        {data && data.herinneringen_demo.hasMore ? (
          <div className='add_more_container'>
                <button  onClick={() => {
                          fetchMore({
                            variables: {
                              limit: variables?.limit,
                              cursor:
                                data.herinneringen_demo.herinneringen[
                                  data.herinneringen_demo.herinneringen.length - 1
                                ].createdAt,
                            },
                          });
                        }} className='add_more_btn'>{loading ? <CircularProgress color="primary"  size={30}/> : 'Meer Herinneringen'}</button>             
          </div>         
        ) : null}




      </div>
      </Demo_Layout>



     
    </>
  );
};

export default WithApollo({ ssr: false })(Memories);


