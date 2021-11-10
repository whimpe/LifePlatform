import { CircularProgress } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { default as React, useState } from "react";
import { BiChevronDown, BiSend } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { MAX_UPLOAD_SIZE } from "../../../constants";
import { MessageInput } from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";



interface Demo_CreateMessageProps {
  setclick: any; 
  Type:number;
  setType:any;
  name_of_page:string;
  has_passed_away:boolean;
}


export const Demo_CreateMessage: React.FC<Demo_CreateMessageProps> = ({setclick,Type,setType,name_of_page,has_passed_away}) => {
  const public_token = useGetStringFromUrl("public_token");




  let handleInputChangeText = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const maxNumber = 50;
  let [valueText, setValue] = useState("");
  const [files, setfiles] = useState<Array<any> | any>([]);  
  const [aantal, setaantal] = useState(0);
  const [aantalMB, setaantalMB] = useState(0);
  const [allowSend, setallowSend] = useState(true);
  const [text, setText] = useState("");
  const [status, setStatus] = useState(Type);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [IsLoading, setIsLoading] = useState(false);
  var share_options = ['','',"Alle bezoekers van deze pagina","Intieme kring",`enkel met beheerders herdenkingsplaats`,`${name_of_page} en mezelf`];


  let handleChangeAantal = async (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      //check how much MB 
      if((aantalMB + event.target.files[i].size)>MAX_UPLOAD_SIZE){
        alert("Uw media is te groot om te uploaden")
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
  console.log(file.size);
}
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




const message_submit = async (e:any) =>{
  alert('Dit is een voorbeeld levensverhaal, u kan geen berichten verzenden.')


}


const inputObject: MessageInput = { text: text, status: status };


  return (

          <div className="share_message_container">
            <div className="share_message_title">Een boodschap aan 
                      <div className="share_message_group" aria-controls="simple-menu" aria-haspopup="true" onClick={(event:any)=>handleClick(event)} >{share_options[status]} <BiChevronDown className='share_message_group_icon' /> </div>
            </div>
            <textarea className="share_message_text_area" placeholder='Uw boodschap...' value={text} onChange={(e:any)=>{setText(e.target.value)}} ></textarea>
           



                <div className="send_message_upload_btn_container">
                  <label htmlFor="upload-photo"> <div className='flashcard_upload_btn'><HiOutlinePhotograph className='flashcard_upload_icon_btn' /><div className="flashcard_upload_text_btn">Foto</div></div> </label>
                  <label htmlFor="upload-video"> <div className='flashcard_upload_btn'><BsCameraVideo className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Video</div></div></label>
                  <label htmlFor="upload-audio"> <div className='flashcard_upload_btn'><HiOutlineMicrophone className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Audio</div></div> </label>
           </div>

                {files.map((file: any, index: any) => (                
              <div key={file.id} className="send_message_media_container">
                      {file.type.split("/")[0] === 'image' ? <img src={URL.createObjectURL(file)} alt="Avatar" className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'video' ? <BsCameraVideo className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'audio' ? <HiOutlineMicrophone className="upload_media_img" /> :null}

                      <div className="upload_media_text_container">
                        <div className="upload_media_name">{file.name} <div className="upload_media_delete_btn" onClick={(event:any)=>{removeItem(file)}}> verwijderen</div></div>
                        <div className="upload_media_info">{file.type.split("/")[0]} - {file.size} - {file.type.split("/")[1]} </div>


                      </div>
      
                </div>
                ))}
          


                 {/* Logic for input file buttons */}
                 <input
                type="file"
                name="photo"
                accept="image/*"
                multiple
                id="upload-photo"
                style={{ display: "none" }}
                onChange={(event: any) => {
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
                  handleChangeAantal(event);
                 
                }}
              />
               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
              <MenuItem onClick={(e:any)=>{handleClose();setType(2);setStatus(STATUS.Approved);}}>{share_options[2]}</MenuItem>
                  <MenuItem  onClick={(e:any)=>{handleClose();setType(3);setStatus(STATUS.Intimate);}}>{share_options[3]}</MenuItem>
                  {has_passed_away ? <MenuItem  onClick={(e:any)=>{handleClose();setType(5);setStatus(STATUS.Owner );}}>{share_options[5]}</MenuItem>: null}
                  </Menu>

       
           
O

              <button type="submit" className="send_message_modal_btn" onClick={(e:any)=> message_submit(e)}> {IsLoading ?<CircularProgress color='secondary' size={30}  />: "Boodschap Verzenden"}  <BiSend className="send_message_modal_btn_icon" /> </button>

      
            </div>
      
  );
};

export default WithApollo({ ssr: false })(Demo_CreateMessage);


     {/* </Form> */}
        // )}
      {/* </Formik> */}