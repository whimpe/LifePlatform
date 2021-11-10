import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MediaHerinnering } from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";
import { RemoveModal } from "../modal_components/RemoveModal";
import {BsStar,BsDownload} from 'react-icons/bs';

interface StackGridGalleryElementProps {
  mediaHerinnering: MediaHerinnering;
  type:string;

}

const StackGridGalleryElement: React.FC<StackGridGalleryElementProps> = ({
  mediaHerinnering: mediaHerr,
  type:TypeName
  
}) => {
  const public_token = useGetStringFromUrl("public_token"); 
  const [RemoveClick, setRemoveClick] = useState(false);

  const download_file = (name_file:string,file_link:string) => {
    let downloadLink = document.createElement("a");
    downloadLink.download = `${name_file}.{.${file_link.split(".").pop()}`;
    downloadLink.href =file_link;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (

    <>    
    <div key={mediaHerr.id} className='stackgrid_gallery_box' >   

       {TypeName==='gallery'?
       
      <MediaDisplay awsUrl={mediaHerr.urlFile} width={'100%'}   type={mediaHerr.mediaType} designclass='stackgrid_gallery_elem' memory_id={mediaHerr.id} />
      :null}

      {TypeName==='memory'?
      <>
      <MediaDisplay awsUrl={mediaHerr.urlFile} width={'100%'}   type={mediaHerr.mediaType} designclass='stackgrid_gallery_elem' />
          <div className="overlay_memory_id" id='overlay_memory_id' >
          <div className="btn_box_overlay">
            <BsDownload onClick={(e:any)=>download_file(mediaHerr.id,mediaHerr.urlFile)}/>
            {/* <BsStar onClick={(e:any)=>alert('like')} /> */}

          </div>
          </div>
          <div className="gradient_top_dark"></div>  
    </> 
      :null}

      {TypeName==='memory_edit'?
      <>
      <MediaDisplay awsUrl={mediaHerr.urlFile} width={'100%'}   type={mediaHerr.mediaType} designclass='stackgrid_gallery_elem'/>
      <div className="delete_media_gallery_btn" onClick={(e:any)=>setRemoveClick(true)}><FaTimes className='delete_media_gallery_btn_icon' />verwijderen</div>
      </>
      :null}


    
      {RemoveClick ? 
      <RemoveModal public_token={public_token}
                Modalclick={RemoveClick} setmodalclick={setRemoveClick} 
                  title={'Bent u zeker dat u deze media wilt verwijderen?'} media_id={mediaHerr.id} />
      :null}

    </div>





    </>

  );
};
export default WithApollo({ ssr: false })(StackGridGalleryElement);

