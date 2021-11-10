import { useMutation } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { BiChevronDown, BiSend } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { MAX_UPLOAD_SIZE } from "../../../constants";
import { MessageInput, useCreateMediaMessageMutation, useCreateMessageMutation } from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { CreateMessage } from "../../../utils/createFunctions/createMessage";
import { createMediaFunction } from "../../../utils/upload_functions/createAndUploadMedia";
import { MUTIPLE_UPLOAD } from "../../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";



interface CreateMessage_ModalProps {
  setclick: any; 
  Type:number;
  setType:any;
  name_of_page:string
}


export const CreateMessage_Modal: React.FC<CreateMessage_ModalProps> = ({setclick,Type,setType,name_of_page}) => {
  const public_token = useGetStringFromUrl("public_token");



  const router = useRouter();
  useIsAuth(STATUS.Pending, true);  
  
  const [createMessageFunction] = useCreateMessageMutation();
  const [createMediaMessage] = useCreateMediaMessageMutation()
  const [mutateUpload, { loading, error, data }] = useMutation(MUTIPLE_UPLOAD);

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
  const [status, setStatus] = useState(STATUS.Approved);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [Isloading, setIsloading] = useState(false)
  var share_options = ['','',"iedereen","enkel intieme kring","enkel met beheerders herdenkingsplaats",`${name_of_page} en mezelf`];


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

  //TODO: component voor maken?
  // if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Free ){
  //   if (PaginaData?.herdenkingspagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_FREE) {
  //     return (<div>{"Kan geen condolaties meer toevoegen, limiet is bereikt"}</div>);
  //   }
  // }
  // if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Basic ){
  //   if (PaginaData?.herdenkingspagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_BASIC) {
  //     return (<div>{"Kan geen condolaties meer toevoegen, limiet is bereikt"}</div>);
  //   }
  // }


const message_submit = async (e:any) =>{
  setIsloading(true);
  const messageId = await CreateMessage(files, public_token ,inputObject,mutateUpload, createMessageFunction,createMediaMessage);
  setType(2);
  setStatus(STATUS.Approved);
  console.log(messageId);
  try {
    let response = await createMediaFunction(files, public_token, "boodschap",messageId, mutateUpload,createMediaMessage);  

  }catch(error:any){
    console.log(error.message)
    console.log("error while adding personal_message",error)
  }
  setclick(false);
  setIsloading(false);
  location.reload();
    // router.push(`/PLATFORM/${public_token}/personal-messages-owner-view`)

}


const inputObject: MessageInput = { text: text, status: status };
console.log(Type);


  return (

          <div className="share_message_container">
            <div className="share_message_title">Laat een boodschap achter voor 
                      <div className="share_message_group" aria-controls="simple-menu" aria-haspopup="true" onClick={(event:any)=>handleClick(event)} >{share_options[status]} <BiChevronDown className='share_message_group_icon' /> </div>
            </div>
            <textarea className="share_message_text_area" placeholder='Uw boodschap...' value={text} onChange={(e:any)=>{setText(e.target.value)}} ></textarea>
            {/* <TextareaAutosize className="share_message_text_area" aria-label="empty textarea"placeholder='Uw boodschap...' value={valueText} onChange={(e:any)=>{setValue(e.target.value)}} /> */}

            {/* <input
              name="text"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
            <input
              name="status"
              value={status}
              onChange={(e) => setStatus(e.currentTarget.valueAsNumber)}
              type="number"
            /> */}



                <div className="send_message_upload_btn_container">
                  <label htmlFor="upload-photo"> <div className='send_message_upload_btn'><HiOutlinePhotograph className='send_message_upload_icon_btn' />Foto</div> </label>
                  <label htmlFor="upload-video"> <div className='send_message_upload_btn'><BsCameraVideo className='send_message_upload_icon_btn'/>Video</div></label>
                  <label htmlFor="upload-audio"> <div className='send_message_upload_btn'><HiOutlineMicrophone className='send_message_upload_icon_btn'/>Audio</div> </label>
                </div>

                {files.map((file: any, index: any) => (                
              <div className="send_message_media_container">
                      {file.type.split("/")[0] === 'image' ? <img src={URL.createObjectURL(file)} alt="Avatar" className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'video' ? <BsCameraVideo className="upload_media_img" /> :null}
                      {file.type.split("/")[0] === 'audio' ? <HiOutlineMicrophone className="upload_media_img" /> :null}

                      <div className="upload_media_text_container">
                        <div className="upload_media_name">{file.name} <div className="upload_media_delete_btn" onClick={(event:any)=>{removeItem(file)}}> verwijderen</div></div>
                        <div className="upload_media_info">{file.type.split("/")[0]} - {file.size} - {file.type.split("/")[1]} </div>


                      </div>
                      {/* <div className="delete_cont">
                        <div className="upload_delete_btn" onClick={(event:any)=>{removeItem(file)}}><GrClose /></div>
                      </div>
         */}
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
                  <MenuItem  onClick={(e:any)=>{handleClose();setType(4);setStatus(STATUS.CoOwner);}}>{share_options[4]}</MenuItem>
                  <MenuItem  onClick={(e:any)=>{handleClose();setType(5);setStatus(STATUS.Owner );}}>{share_options[5]}</MenuItem>
                </Menu>

       
           


              <button type="submit" className="send_message_modal_btn" onClick={(e:any)=> message_submit(e)}> { Isloading ? <CircularProgress color="secondary"  size={30}/> :'Boodschap Verzenden'}<BiSend className="send_message_modal_btn_icon" /> </button>

      
            </div>
      
  );
};

export default WithApollo({ ssr: false })(CreateMessage_Modal);


     {/* </Form> */}
        // )}
      {/* </Formik> */}