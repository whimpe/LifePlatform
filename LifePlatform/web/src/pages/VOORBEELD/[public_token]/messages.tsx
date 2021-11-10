import { default as React, useState } from "react";
import { AiOutlineCloud } from "react-icons/ai";
import { BiBookHeart } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { GrClose, GrGroup } from "react-icons/gr";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import { Demo_CreateMessage } from '../../../components/Demo_components/Demo_Modals/Demo_CreateMessage';
import { MediaDisplay } from "../../../components/general/MediaDisplay";
import MetaTags from "../../../components/general/MetaTags";
import { useHerdenkingspaginaQuery, useMessages_DemoQuery } from "../../../generated/graphql";
import { formatDate_text } from "../../../utils/FormatDate";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";



const Messages: React.FC<{}> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");
    
  
  const [modalClick, setmodalClick] = useState(false);
  const [ContentType, setContentType] = useState(2)  //2=pubblic - 3=intimate - 4=owners - 5=private
  const [LightboxTextClick, setLightboxTextClick] = useState(false);
  const [LightboxImgClick, setLightboxImgClick] = useState(false);
  const [message_obj, setmessage_obj] = useState({'id':null,'text':'','createdAt':null,'creator':{'username':null}});
  const [media_object, setmedia_object] = useState({'herinneringId':null,"urlFile":'','mediaType':''});



  // De messages_demo haalt wel gewoon alles op zonder tekijken naar privacy enzo
  const { data:messages_data, error:messages_error, loading:messages_loading} = useMessages_DemoQuery({
    variables: {
      limit: 1000,
      cursor: null,
      paginaId: public_token,
    },
    // fetchPolicy:"cache-and-network",// moet omdat als er gerefreshed word er anders data verdwijnt,     fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true, //bij csr zou network only moeten werken
  });



    const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
      variables: {
        paginaId: public_token,
      },
    })



  if (  hploading || messages_loading) {
    return (
      <div>
        {" "}
      loading...
      </div>
    );
  }


  const OpenLightBox_text =(message:any) =>{
    setLightboxTextClick(true);
    setmessage_obj(message);
  }
  
  const OpenLightBox_img =(media_obj:any) =>{
    setLightboxImgClick(true);
    setmedia_object(media_obj);
  }

  const check_allowed=(data:any)=>{
    setmodalClick(true)
    }


  var share_options = ['','',"Publieke Berichten", "Steunberichten aan intieme kring", "Berichten met met beheerders herdenkingsplaats",`PrivéBerichten tussen ${herdenkingspagina?.herdenkingspagina?.name_of_page} en mezelf `];


  return (
    <>

      <MetaTags title={'DEMO'} 
                type_of_page={'- Berichten'} 
                description={herdenkingspagina?.herdenkingspagina?.text} 
                mediaUrl={herdenkingspagina?.herdenkingspagina?.mediaUrl} 
                />
      <Demo_Layout>


      <div className="messages_btn_container">
        <button className="message_btn_box" autoFocus onClick={(e:any)=>{setContentType(2)}} >   <GrGroup className='message_icon_box'/>Publieke Boodschappen</button>
        <button className="message_btn_box" onClick={(e:any)=>{setContentType(3)}}>   <BiBookHeart className='message_icon_box'/>intieme kring</button>
        {herdenkingspagina?.herdenkingspagina?.DoD ? <button className="message_btn_box" onClick={(e:any)=>{setContentType(5)}}>   <AiOutlineCloud className='message_icon_box'/>Bericht aan de overkant</button>:null}
      

      </div>

      
      <div className="messages_content_container">

         <div className="messages_img_box">

          <div className="messages_container_box">
            <img className="messages_img_view"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
            <div className="messages_img_title"> {herdenkingspagina?.herdenkingspagina?.name_of_page}</div>
          </div>
         {messages_data?.messages_demo.berichten.length !==0 ? <div className="messages_img_subtitle">Laatste boodschap op {formatDate_text(messages_data?.messages_demo.berichten[messages_data?.messages_demo.berichten.length-1].createdAt)}</div>:null}

        </div>


        <div className="messages_content_box">
          <div className="messages_content_title">{share_options[ContentType]}</div>

          <div className="messages_content_container_box">

          {messages_data?.messages_demo.berichten.map((message: any) =>
                  !message ? null : 
                  <div key={message.id}>
                  {message.status===ContentType ?
                  <div  className="message_content_item">
                    
                    
                      {message.media.length!==0 ?
                      <>
                        <div className="message_media_containter">
                       {message.media.map((media_file: any) =>   
                        <div key={media_file.id}>
                             <div className='message_media_box' onClick={(e:any)=>OpenLightBox_img(media_file)}>

                             <MediaDisplay awsUrl={media_file.urlFile} type={media_file.mediaType} designclass='message_media_item'  />
                            </div> 

                            </div>
                       )}
                        </div>
                      </>
                      :null}
                    
                    <div className='open_lightbox'  onClick={(e:any)=>OpenLightBox_text(message)} >
                        <div className="message_content_text">{message.text}</div>
                          <div className="message_content_info_container">
                            <div className="message_item_name">{message.creator.username}</div>
                            <div className="message_item_date">{formatDate_text(message.createdAt)}</div>
                          </div>
                        </div>
                    </div>
                
                  :null}
                  </div>                                   
          )}
              {/* <AlwaysScrollToBottom/> */}
          </div>

        </div>

      </div>

      

        {modalClick ? 
        <>
        <div className="message_creator_container_big">
          <div className="droplet_message_btn_icon_container" ><GrClose className='droplet_message_btn_icon'  onClick={(e:any)=>{setmodalClick(false)}}/> </div>
          <div className="droplet_message_text">VERBERGEN</div>
          <Demo_CreateMessage setclick={setmodalClick} Type={ContentType} setType={setContentType} name_of_page={herdenkingspagina!.herdenkingspagina!.name_of_page} has_passed_away={!(herdenkingspagina?.herdenkingspagina?.DoD == undefined)}/>
        </div>

        </>
        :
        <>
        <div className="gradient_message_creator_container" onClick={(e:any)=>{check_allowed(herdenkingspagina)}}>
        <div className="droplet_message_btn_icon_container"><IoMdAddCircleOutline className='droplet_message_btn_icon'/> </div>
          <div className="droplet_message_text" >LAAT EEN BOODSCHAP ACHTER</div>
        </div>
        </>
        }

              
      {LightboxTextClick ?      
      <div className="lightbox2" onClick={(e:any)=>{setLightboxTextClick(false)}}>        
        <div className="lightbox2-content">
        <div key={message_obj.id} className='stackgrid_condolence_box' >   
          <span className="close cursor" ><FaTimes /></span>      
            <div className='condolence_textpreview_box'>   
                  <div className="lightbox_condolence_text">{message_obj.text}</div>
                  <div className="lightbox_condolence_box_author"> {message_obj.creator.username}</div>
                  <div className="lightbox_condolence_box_date"> {formatDate_text(message_obj.createdAt)} </div>
            </div>
        </div>
      </div>
      </div>
      :null}        




      {LightboxImgClick ?      
      <div className="lightbox2" onClick={(e:any)=>{setLightboxImgClick(false)}}>        
         {/* <div className="lightbox2-content" key={media_object.urlFile}> */}
         <div key={media_object.urlFile}  >   
         <div className='gallery_item_view_box'>   
            <span className="close" ><FaTimes /></span>
              <MediaDisplay awsUrl={media_object.urlFile} width={'100%'}   type={media_object.mediaType}  designclass='lightbox2_gallery_item'/> 
              <div  onClick={(e:any)=>{setLightboxImgClick(false)}} className='lightbox2_gallery_elem_btn' >terugkeren</div>
            </div>     
        </div>
      </div>
      :null}


              

  

     
      </Demo_Layout>
    </>
  );
};

export default WithApollo({ ssr: false })(Messages);

