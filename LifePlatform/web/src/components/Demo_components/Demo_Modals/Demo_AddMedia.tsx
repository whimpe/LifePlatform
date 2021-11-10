


import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { BsArrowRight, BsCameraVideo } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { MAX_UPLOAD_SIZE } from "../../../constants";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";





interface Demo_AddMediaProps {
  herinnering_id:string;
}

export const Demo_AddMedia: React.FC<Demo_AddMediaProps> = ({herinnering_id}) => { 

  const public_token = useGetStringFromUrl("public_token");  
  const [files, setfiles] = useState<Array<File>>([]);
  const [aantalMB, setaantalMB] = useState(0);
  const [btnloading, setbtnloading] = useState(false)


    let handleChangeAantal = async (event: any) => {
      for (let i = 0; i < event.target.files.length; i++) {
        //check how much MB 
        if((aantalMB + event.target.files[i].size)>MAX_UPLOAD_SIZE){
          alert("Aantal of grootte van media is te groot om te uploaden")
          }
           
        else{
          files.push(event.target.files[i]);
          console.log(event.target.files[i].size);
          setaantalMB(aantalMB+(event.target.files[i].size));          
        }
      }          
    }
    let removeItem = async (file: any) => {

      setfiles(files.filter((item: any) => item.name !== file.name));
      setaantalMB(aantalMB - file.size);
  
    }

  //write memory to database
  const add_media = async () =>{
      alert('Dit is een voorbeeld levensverhaal, je kan geen media toevoegen.')
      }
    

    

     

  return (
    <>

        
    
           <div className="flashcard_container_media">   
                <div className="flashcard_title">Voeg media toe aan je herinnering </div>  
                
              <div className="flashcard_text_container">   
                <div className="flashcard_upload_btn_container">
                  <label htmlFor="upload-photo"> <div className='flashcard_upload_btn'><HiOutlinePhotograph className='flashcard_upload_icon_btn' /><div className="flashcard_upload_text_btn">Foto</div></div> </label>
                  <label htmlFor="upload-video"> <div className='flashcard_upload_btn'><BsCameraVideo className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Video</div></div></label>
                  <label htmlFor="upload-audio"> <div className='flashcard_upload_btn'><HiOutlineMicrophone className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Audio</div></div> </label>
               </div>
              </div>    


              {/* list of items for upload */}
              {files.map((file: any, index: any) => (                
              <div key={file.id} className="flashcard_media_container">
                      {file.type.split("/")[0] === 'image' ? <img src={URL.createObjectURL(file)} alt="Avatar" className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'video' ? <BsCameraVideo className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'audio' ? <HiOutlineMicrophone className="upload_media_img" /> :null}

                      <div className="upload_media_text_container">
                        <div className="upload_media_name">{file.name}</div>
                        <div className="upload_media_info">{file.type.split("/")[0]} - {file.size} - {file.type.split("/")[1]} </div>

                      </div>
                      <div className="delete_cont">
                        <div className="upload_delete_btn" onClick={(event:any)=>{removeItem(file)}}><GrClose /></div>
                      </div>
        
                </div>
              ))}
              
     
                 <div className="flashcard_add_media_btn_container">

                <div onClick={async (e)=>{ 
                  await add_media()}}
                  className="flashcard_media_btn"><div className='flashcard_text_btn'>{btnloading ? <CircularProgress color='secondary' size={30}/>:<>Voeg de media toe</>} </div>  <BsArrowRight className='flashcard_icon_btn' /></div>
                  
                </div>
            </div>



          {/* Logic for input file buttons */}
            <input
                type="file"
                name="photo"
                accept="image/*"
                multiple
                id="upload-photo"
                style={{ display: "none" }}
                onChange={(event: any) => {
                  // setFieldValue("photo", event!.currentTarget!.files!);
                  handleChangeAantal(event);                  
                }}
              />

              <input
                type="file"
                name="photo"
                placeholder="deel videos"
                accept="video/*"
                id="upload-video"
                style={{ display: "none" }}
                multiple
                onChange={(event: any) => {
                  // setFieldValue("photo", event!.currentTarget!.files![0]);
                  handleChangeAantal(event);
                 
                }}
              />

              <input
                type="file"
                name="photo"
                accept="audio/*"
                id="upload-audio"
                multiple
                style={{ display: "none" }}
                onChange={(event: any) => {
                  // setFieldValue("photo", event!.currentTarget!.files![0]);
                  handleChangeAantal(event);
                 
                }}
              />



  
    </>
  );
};

export default WithApollo({ ssr: false })(Demo_AddMedia);

