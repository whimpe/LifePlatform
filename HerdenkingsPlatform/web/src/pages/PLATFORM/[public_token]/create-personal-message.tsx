import { useMutation } from "@apollo/client";
import { Flex, Spinner } from "@chakra-ui/core";
import { Chip, Input, MenuItem, Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import InputBase from '@material-ui/core/InputBase';
import { CircularProgress } from "@material-ui/core";

import router from "next/router";
import { toNamespacedPath } from "node:path";
import React, { Fragment, useEffect, useState } from "react";
import { BiCalendar, BiCalendarHeart, BiChevronDown } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { Layout } from "../../../components/general/Layout";
import { AMOUNT_OF_PERSONAL_MESSAGES_PLAN, MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC, MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE, MAX_UPLOAD_SIZE, PAYMENT_PLAN } from "../../../constants";
import {
  useCreateMediaPersonalMessageMutation,
  useCreatePersonalMessageAccessMutation,
  useCreatePersonalMessageMutation,

  useHerdenkingspaginaQuery, useRequestsByPaginaIdQuery
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { createMediaFunction } from "../../../utils/upload_functions/createAndUploadMedia";
import { MUTIPLE_UPLOAD } from "../../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";
import { createStyles, withStyles } from "@material-ui/styles";
import { STATUS } from "../../../types";
import ErrorModal from "../../../components/modal_components/ErrorModal";


const styles:any = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex"
  },  
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    },
  chip: {
      margin: 2,
    },
  formControl: {
    margin: '5px',
    width:'100%',
  },
};
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: 48 * 4.5 + 8,
      width: '100%',
    },
  },
};


const useStyles = makeStyles(styles);



const CreatePersonalMessage: React.FC<{}> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");

  
  const classes = useStyles();

  useIsAuth(STATUS.Owner );

  const [createPersonalMessage,] =  useCreatePersonalMessageMutation();
  const [createMediaPersonalMessageMutation,] = useCreateMediaPersonalMessageMutation();
  const [allowAcces] = useCreatePersonalMessageAccessMutation();

  const [mutateUpload, { loading, error, data }] = useMutation(MUTIPLE_UPLOAD);
  const [allowSend, setallowSend] = useState(true);
  const [totalMB, settotalMB] = useState(0);  
  const [files, setfiles] = useState<Array<any>>([]);
  const [aantalMB, setaantalMB] = useState(0);
  const [files_raw, setfiles_raw] = useState<Array<any> | any>([]);
  const [aantal, setaantal] = useState(0);
  const [userIdList, setuserIdList] = useState<Array<any>>([]);
  const [nameList, setnameList] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [Isloading, setIsloading] = useState(false)

  const [selectedDate, setselectedDate] = useState(null)
  let DateHandler = (date:any) => {setselectedDate(date) } 

  let [Text, setText] =useState("");
  let [Title, setTitle] =useState("");
  const [Error_value, setError_value] = useState(false)


  const handleClose = () => {setOpen(false);};
  const handleOpen = () => {setOpen(true);};

  //TODO: in components steken en dit laten gebruiken
  const { data: PaginaData, loading: paginaLoading, } = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  });

  const { data: requestsData, error:errorRequestQuery, loading:loadingrequests } = useRequestsByPaginaIdQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });

  if (loading || loadingrequests) {
    return (
      <div>
        <Flex align="center" justify="center">
         <CircularProgress color="primary"  size={30}/>
        </Flex>
      </div>
    );
  }
 



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

  const handleChangeMultiple = (options:any) => {
    const id_value: string[] = [];
    const name_value: string[] = [];    
    // niewe data vullen
    for (let i = 0; i< userIdList.length; i += 1) {      
      id_value.push(userIdList[i])
      name_value.push(nameList[i])
    }
    for (let i = 0; i< options.length; i += 1) { 
      if(!userIdList.includes(options[i].split('$')[0])  && (options[i].includes('$'))){
        id_value.push(options[i].split('$')[0]);
        name_value.push(options[i].split('$')[1]);
      }      
    }
    setuserIdList(id_value);
    setnameList(name_value);
    handleClose()
  };
  
  const handleDelete = (value:string) => {
    const id_value: string[] = [];
    const name_value: string[] = [];    
    // niewe data vullen
    for (let i = 0; i< userIdList.length; i += 1) {      
      id_value.push(userIdList[i])
      name_value.push(nameList[i])
    }
    const index = name_value.indexOf(value);
    name_value.splice(index, 1);
    id_value.splice(index, 1);

    setuserIdList(id_value);
    setnameList(name_value);
    // denyAccess({ variables: {userThatHasAccessId:'',paginaId:public_token,personalMessageId: personalMessageId })
  };



  



  const SubmitLastMesssage = async (e:any) =>{

    if(PaginaData!.herdenkingspagina!.number_of_personal_messages >= AMOUNT_OF_PERSONAL_MESSAGES_PLAN[PaginaData!.herdenkingspagina!.Payment_plan]){
      setError_value(true);

    }else{
      setIsloading(true);
    let result=null;
    if (totalMB > 100000000 ) {
      // 100MB
      alert("het aantal bestanden is te groot, maximaal 100MB");
      throw new Error("het aantal bestanden is te groot");
    }

    const personalmessage = await createPersonalMessage({
      variables: { input: { title: Title, text: Text, dateAvailable: selectedDate }, paginaId: public_token },
      update: (cache: any) => {
        cache.evict({ fieldName: "personalMessages" }); /// nog deftig updaten 
      },
    });
   
    try {
      let response = await createMediaFunction(files, public_token, "persoonlijkeboodschap",personalmessage.data!.createPersonalMessage.id, mutateUpload,createMediaPersonalMessageMutation);
      for(let i=0; i<userIdList.length; i++){
        const allowacces = await allowAcces({
          variables: {
            userId: userIdList[i], // Heel belangrijk hier moet er een inputfield (nu is dit gewoon 1)
            //    komen waardat de persoon kan invoeren wie hij wil die toestemming krijgt
            // dit via email of user maar uiteindelijk geven we hier userId mee
            personalMessageId: personalmessage!.data!.createPersonalMessage.id,
            paginaId:public_token,
          },
          update: (cache: any) => {
            cache.evict({
              fieldName: "personalMessagesAccessForCurrentPage",
            }); /// nog deftig updaten
          },
        });  
      
      }
      if(response===true){
        router.push(`/PLATFORM/${public_token}/personal-messages-owner-view`)
      }
  
  
    }catch(error:any){
      console.log(error.message)
      console.log("error while adding personal_message",error)
    }
    setIsloading(false);
    router.push(`/PLATFORM/${public_token}/personal-messages-owner-view`);

    }
  
  }


  

  

  //TODO: component voor maken?
  if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Free ){
    if (PaginaData?.herdenkingspagina.number_of_memories >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE) {
      return (<div>{"Kan geen berichten meer toevoegen limiet is bereikt"}</div>);
    }
  }
  if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Basic ){
    if (PaginaData?.herdenkingspagina.number_of_memories >= MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC) {
      return (<div>{"Kan geen berichten meer toevoegen limiet is bereikt"}</div>);
    }
  }


  return (
    <>
    <Layout variant="small">
      <div className="background_platform">

                <div className='edit_personal_message_container'>
       

                <div className="edit_personal_message_header">Laatste Boodschap  </div>  
                      
                    <div className="edit_personal_message_text_container">   
                      <div className="flashcard_label">Onderwerp laatste Boodschap</div>   
                        <input type='text' name="title" onChange={(event:any)=>setTitle( event.target.value)} className='edit_personal_message_title' />                                  
                        
                      <div className="flashcard_label"> Laatste boodschap verhaal</div>                                 
                        <textarea  name="text"  onChange={(event:any)=>setText(event.target.value)} className='edit_personal_message_text'/>
                  </div>
      
                  
                  <div className="flashcard_options_box">
                      <div className="flashcard_label"> Datum wanneer dit bericht mag verzonden worden</div>  
                        <Fragment>
                            <div className="edit_personal_message_date_container">
                                      
                                      <KeyboardDatePicker
                                        keyboardIcon={<BiCalendar/>}  invalidDateMessage={'ongeldige datum'}
                                        className='datepicker_ui'
                                        InputProps={{
                                          disableUnderline: true,
                                        }}
                                        minDate={new Date('1700-01-01')}
                                        minDateMessage='datum kan niet voor dit jaartal datum. '
                                        openTo="year"
                                        clearable
                                        value={selectedDate}        
                                        placeholder="01/01/2021"
                                        views={["year", "month", "date"]}
                                        onChange={(date:any) => {DateHandler(date);}}
                                        format="dd/MM/yyyy"
                                      /> 
                                    </div>
                            </Fragment>
                      </div>
      
                      <div className="flashcard_container">   
                      <div className="flashcard_title">Voeg media toe aan je laatste boodschap: </div>  
                      
                    <div className="flashcard_text_container">   
                      {/* <div className="flashcard_label"> Laad bestanden in</div>  */}
                      <div className="flashcard_upload_btn_container">
                      <label htmlFor="upload-photo"> <div className='flashcard_upload_btn'><HiOutlinePhotograph className='flashcard_upload_icon_btn' /><div className="flashcard_upload_text_btn">Foto</div></div> </label>
                      <label htmlFor="upload-video"> <div className='flashcard_upload_btn'><BsCameraVideo className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Video</div></div></label>
                      <label htmlFor="upload-audio"> <div className='flashcard_upload_btn'><HiOutlineMicrophone className='flashcard_upload_icon_btn'/><div className="flashcard_upload_text_btn">Audio</div></div> </label>
               </div>
                    </div>    
      
      
                    {/* list of items for upload */}
                    {files.map((file: any, index: any) => (                
                    <div className="flashcard_media_container">
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
                    </div>
      
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
      
      
      
      
      
      
      
      
                  <div className="flashcard_title">Personen die deze laatste boodschap mogen ontvangen:</div>    
                  {nameList.map((name: any, index: any) => (                            
                      <div className="flashcard_chip_container">
                      <Chip 
                                      key={name} 
                                      label={name}
                                      onDelete={(event:any)=>{handleDelete(name)}}
                                      deleteIcon={<IoIosCloseCircle />}
                                      className={classes.chip} />
                        </div>
                    ))}                              
      
                      <div className='personal_message_contact_table_input'>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-mutiple-chip-label">Ontvangers van laatste boodschap</InputLabel>
                              <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={nameList}
                                onChange={(event:any)=> handleChangeMultiple(event.target.value)}
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                input={<Input id="select-multiple-chip" />}
                               // renderValue={(selected) => (
                                  // <div className={classes.chips}>
                                  //   {(selected as string[]).map((value) => (
                                  //     <Chip 
                                  //         key={value} 
                                  //         label={value} 
                                  //         onDelete={(e:any) => handleDelete(value)}
                                  //         deleteIcon={<IoIosCloseCircle />}
                                  //         className={classes.chip} />
                                  //   ))}
                                  // </div>
                               // )}
                                MenuProps={MenuProps}
                              >

                            {requestsData!.requestsByPaginaId.map((request) =>(
      
                              <MenuItem key={request.requestor.id+'$'+request.requestor.username} value={request.requestor.id+'$'+request.requestor.username} >{request.requestor.username}</MenuItem>
                                ))}

                              </Select>
                            </FormControl>

                     

                    
                      </div>    

                      {/* <div className="flashcard_title">Personen die deze laatste boodschap zonder toegang:</div>     */}

                      {/* <div className="personal_message_add_email_box">
                                <input className='personal_message_add_receiver' id='email_input' placeholder='Voeg een email toe van de ontvanger'></input>
                                <button className=''>Dierbare toevoegen</button>                  
                      </div> */}

             
      
                 <button type='submit' className='edit_personal_message_btn' 
                    onClick={(e:any)=>{if(selectedDate===null){
                                  alert('Je bent de datum vergeten');
                                  }else{
                                    SubmitLastMesssage(e);}}}><BiCalendarHeart className='edit_personal_message_btn_icon'/> { Isloading ? <CircularProgress color="secondary"  size={30}/> :'Laatste boodschap Opslaan'}</button>
        
      
               
      
              </div>
      
      
        
        



      </div>
    </Layout>


{Error_value ?            
  <ErrorModal  active={Error_value} setactive={setError_value} error_type={'max_personal_messages'}  link={`/PLATFORM/${public_token}/settings`}/>
      :null}
      </>
  );
};
export default WithApollo({ ssr: false })(CreatePersonalMessage);