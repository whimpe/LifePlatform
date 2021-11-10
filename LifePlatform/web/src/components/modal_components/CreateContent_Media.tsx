
import { useMutation } from "@apollo/client";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { BsArrowRight, BsCameraVideo, BsQuestionCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { AMOUNT_OF_BYTES_PLAN, MAX_UPLOAD_SIZE } from "../../constants";
import { useCreateHerinneringMutation, useCreateMediaHerinneringMutation, useHerdenkingspaginaQuery, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { MUTIPLE_UPLOAD } from "../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import * as gtag from '../../utils/googleanalytics/gtag';







interface CreateContent_MediaProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
  Content:any;
  on_timeline:boolean;
}

export const CreateContent_Media: React.FC<CreateContent_MediaProps> = ({ setModelclick, setContent,setmodalState,Content,on_timeline }) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();

  const [files_raw, setfiles_raw] = useState<Array<any> | any>([]);
  const [showcategories, setshowcategories] = useState(true);
  const [selectedDate, handleDateChange] = useState(null); 
  const [OnTimeline, setOnTimeline] = useState(on_timeline);
  const [acces_status_memory, setacces_status_memory] = useState(2);
  const [createHerinnering] = useCreateHerinneringMutation();
  const [createMediaHerinnering] = useCreateMediaHerinneringMutation();
  const [mutateUpload, { loading, error, data }] = useMutation(MUTIPLE_UPLOAD);

  const [files, setfiles] = useState<Array<any>>(Content.media);
  const [aantalMB, setaantalMB] = useState(Content.totalMB);
  const [Error_value, setError_value] = useState(false);
  const [Error_type, setError_type] = useState('default_error');
  const [loading_state, setloading] = useState(false)


  const { data: meData, loading: meloading } = useMeQuery({variables: {paginaId: public_token,},skip: isServer(), });
  const { data: PaginaData, loading: paginal } = useHerdenkingspaginaQuery({
    skip: isServer(),
    variables: {
      paginaId: public_token
    }
    
  });

  if(meloading){
    return (<>..laden</>)
  }

  if(meData?.me?.status===undefined){
    return (<></>)
  }

  //function for removal items of list

  let handleChangeAantal = async (event: any) => {

    for (let i = 0; i < event.target.files.length; i++) {
      if((Content.totalMB + event.target.files[i].size)>MAX_UPLOAD_SIZE){
        alert("Uw media is te groot om te uploaden")
        } 
      else if((PaginaData!.herdenkingspagina!.number_of_bytes+aantalMB+(event.target.files[i].size)) >= AMOUNT_OF_BYTES_PLAN[PaginaData!.herdenkingspagina!.Payment_plan] ){
        setError_type('max_bytes');
        setError_value(true);
        break;

      }else{
        
        files.push(event.target.files[i]);
        console.log(event.target.files[i].size);
        setaantalMB(aantalMB+(event.target.files[i].size));          
      }
    }
      setContent((prevState: any) => {
        // add file size to total MB            
        return { ...prevState, media:files,totalMB:aantalMB }
        });
    
  }
  let removeItem = async (file: any) => {

    setfiles(files.filter((item: any) => item.name !== file.name));
    setaantalMB(aantalMB - file.size);

    setContent((prevState: any) => {
      return { ...prevState, media:files,totalMB:aantalMB }
      });
  }

    let TitleHandler = (e:any) => {
      setContent((prevState:any) => {
        return { ...prevState, title: e.target.value }
      });  
      return 
    } 

  


  return (
    <>        
        <div className="flashcard_container">   
                <div className="flashcard_title">Leg herinnering vast </div>  
                {Content.inspiration ? <div className="flashcard_subtitle_question">"{Content.inspiration}"</div> : null}
                
              <div className="flashcard_text_container">   
                <div className="flashcard_label"> Titel van herinnering</div>   
                  <input className="flashcard_title_input" placeholder='Titel...' value={Content.title} onChange={(e)=>{TitleHandler(e)}} id="textarea"></input>  
   
          
              </div>  

              <div className="flashcard_text_container">   
                <div className="flashcard_label"> Laad media in</div> 
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
                        <div className="upload_media_name">{`foto ${index+1} van ${PaginaData?.herdenkingspagina?.name_of_page} `}</div>
                        <div className="upload_media_info">{file.type.split("/")[0]} - {file.size} - {file.type.split("/")[1]} </div>

                      </div>
                      <div className="delete_cont">
                        <div className="upload_delete_btn" onClick={(event:any)=>{removeItem(file)}}><GrClose className='upload_delete_btn_icon' /></div>
                      </div>
        
                </div>
              ))}

      

     
                 <div className="flashcard_btn_container">
                  <div onClick={(e)=>{
                      setmodalState('question') ;
                      gtag.event({ action: 'Inspiration button', category: 'Inspiration btn', label: 'memory', value: 0, });
                    }}
                      className="flashcard_inspiration_btn" ><BsQuestionCircle className='flashcard_icon_btn' /> <div className='flashcard_text_btn'>inspiratie nodig?</div></div>

                  <div onClick={(e)=>{
                    if(Content.title===null){alert('Elke herinnering bevat best een titel.')}                    
                    else{setmodalState('content');}
                  }} 
                    className="flashcard_media_btn"><div className='flashcard_text_btn'>Voeg een datum toe</div>  <BsArrowRight className='flashcard_icon_btn' /></div>
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

export default WithApollo({ ssr: false })(CreateContent_Media);


