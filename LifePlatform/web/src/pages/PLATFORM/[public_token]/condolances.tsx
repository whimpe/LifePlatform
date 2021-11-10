import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IoMdAdd, IoMdAddCircleOutline } from "react-icons/io";
import { EditDeleteCondolanceButtons } from "../../../components/edit_delete/EditDeleteCondolanceButton";
import { Layout } from "../../../components/general/Layout";
import MetaTags from "../../../components/general/MetaTags";
import StackgridCondolanceElement from "../../../components/grid_blocks/StackgridCondolanceElement";
import { useCondolatiesQuery, useHerdenkingspaginaQuery, useMeQuery, useUpdateCondolatieMutation } from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { formatDate_text } from "../../../utils/FormatDate";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";
import { CreateCondolance } from './create-condolance';


const Condolances: React.FC<{}> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router =useRouter();

  useIsAuth(STATUS.Approved,true);
  
  const [modalClick, setmodalClick] = useState(false);
  const [LightboxClick, setLightboxClick] = useState(false);
  const [condo_object, setcondo_object] = useState({'id':'','text':'', "createdAt":'','creator':{'username':'','id':''}});
  const [Editmode, setEditmode] = useState(false);
  const [text,settext] = useState('');

  const [updateCondolatie] = useUpdateCondolatieMutation();

  

  const { data: meData, loading: Meloading } = useMeQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });
  const {data,error, loading,fetchMore,variables,refetch,} = useCondolatiesQuery({
    variables: {
      limit: 25,
      cursor: null,
      paginaId: public_token,
    },
    // fetchPolicy: "cache-and-network", // moet omdat als er gerefreshed word er anders data verdwijnt
    notifyOnNetworkStatusChange: true,
  });
  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  })


  if (loading || hploading) {
    return(<Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex> )

  }

  if (!data) {
    return (<></>); }

  if (error) {
    return <div> {error?.message} </div>;
  }

  // die eerste knop moet vanboven?
  const OpenLightBox =(condo:any) =>{
    settext(condo.text)
    setLightboxClick(true);
    setcondo_object(condo);
  }


  const upgrade_condolence = async (event:any,condo_id:string)=>{
    await updateCondolatie({variables: { id: condo_id ,paginaId: public_token, text:text },
      update: (cache : any) =>
        cache.evict({ id: "Condolatie:" + condo_id }),
    });
    setLightboxClick(false);
    setEditmode(false);
    location.reload()
  }


  return (
    <>
           <MetaTags title={herdenkingspagina?.herdenkingspagina?.name_of_page} 
                type_of_page={'- Condoleances'} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />


      <Layout page_name={'Condoleances'}>

      { data!.condolaties.condolaties.length===0 ? 
         <Flex mt={20}>
       <div className="memories_default_box" onClick={(e:any)=>{setmodalClick(true)}}>
       <div className="memories_default_container_box">
         <img className="memories_default_view_img"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
         <div className="memories_default_text">{`Deel een condolatie ter herdenking van ${herdenkingspagina?.herdenkingspagina?.name_of_page} `}</div>
         <IoMdAdd className='memories_default_icon'/> 
       </div>
      </div>
      </Flex>
      :null}


        {!data && loading ? (
          <Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex> 
        
        ) : (

          <div className="condolence_body">
            <div className="condolence_masonry_with_columns">
                {data!.condolaties.condolaties.map((condo: any) =>
                  !condo ? null : 
                  <div key={condo.id}>
                  <div className='open_lightbox'  onClick={(e:any)=>OpenLightBox(condo)} >
                  <StackgridCondolanceElement condo={condo} />
                  </div>
                  </div>

              )}
            </div>
          </div>
        )}

      {modalClick ? 
        <>


        <div className="message_creator_container_big">
          <div className="droplet_message_btn_icon_container" ><GrClose className='droplet_message_btn_icon'  onClick={(e:any)=>{setmodalClick(false)}}/> </div>
          <div className="droplet_message_text">VERBERGEN</div>
          <CreateCondolance setclick={setmodalClick} />
        </div>

        </>
        :
        <>
        <div className="gradient_message_creator_container" onClick={(e:any)=>{setmodalClick(true)}}>
        <div className="droplet_message_btn_icon_container"><IoMdAddCircleOutline className='droplet_message_btn_icon'/> </div>
          <div className="droplet_message_text" >LAAT EEN CONDOLATIE ACHTER</div>
        </div>
        </>
        }


{/* lightboxview */}
      {LightboxClick ?
      
        <div className="lightbox2">        
          <div className="lightbox2-content">
          <div key={condo_object.id} className='stackgrid_condolence_box' >   
            <span className="close"  onClick={(e:any)=>{setLightboxClick(false)}} ><FaTimes /></span>
          
              <div className='condolence_textpreview_box'>   

                {Editmode ?
                <textarea className="lightbox_condolence_text" value={text} onChange={(e:any)=>{settext(e.target.value)}} ></textarea>
                :<div className="lightbox_condolence_text">{condo_object.text}</div>}

                <div className="lightbox_condolence_box_author"> {condo_object.creator.username}</div>
                <div className="lightbox_condolence_box_date"> {formatDate_text(condo_object.createdAt)} </div>

                <EditDeleteCondolanceButtons id={condo_object.id}  creatorId={condo_object.creator.id} setEditmode={setEditmode} Editmode={Editmode} upgrade_condolence={upgrade_condolence} />

            </div>
        </div>

          </div>
        </div>
      :null}





        {/* LOAD MORE  */}
        {data && data.condolaties.hasMore ? (
          <div className='add_more_container'>
            <button  onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.condolaties.condolaties[
                          data.condolaties.condolaties.length - 1
                        ].createdAt,
                    },
                  });
                }} className='add_more_btn'>{loading ? <CircularProgress color="primary"  size={30}/> : 'Meer condolaties'}</button>             
          </div>
        ) : null}
      </Layout>
    </>
  );
};

export default WithApollo({ ssr: false })(Condolances);
