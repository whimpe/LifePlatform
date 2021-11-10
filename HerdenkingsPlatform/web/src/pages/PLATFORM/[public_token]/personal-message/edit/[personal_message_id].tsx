import { useMutation } from "@apollo/client";
import { Flex } from "@chakra-ui/core";
import { Chip, CircularProgress, FormControl, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { BiCalendar, BiCalendarHeart } from "react-icons/bi";
import { BsArrowLeft, BsCameraVideo } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { HiOutlineMicrophone, HiOutlinePhotograph } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { Layout } from "../../../../../components/general/Layout";
import { RemoveModal } from "../../../../../components/modal_components/RemoveModal";
import { MAX_UPLOAD_SIZE } from "../../../../../constants";
import {
  useCreateMediaPersonalMessageMutation, useCreatePersonalMessageAccessMutation,
  useDeleteMediaMutation, useDeletePersonalMessageAccessMutation, usePersonalMessageQuery,
  usePersonalMessagesAccessForPersonalMessageQuery, useRequestsByPaginaIdQuery, useUpdatePersonalMessageMutation
} from "../../../../../generated/graphql";
import { STATUS } from "../../../../../types";
import { isServer } from "../../../../../utils/isServer";
import { createMediaFunction } from "../../../../../utils/upload_functions/createAndUploadMedia";
import { MUTIPLE_UPLOAD } from "../../../../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../../../utils/useIsAuth";
import { WithApollo } from "../../../../../utils/withApollo";




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
    minWidth: '100%',
    maxWidth:'100%',
  },
};
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: 48 * 4.5 + 8,
      width: '100%',
    },
  },
}

const useStyles = makeStyles(styles);






const EditPersonalMessage: React.FC<{}> = ({})=>{

  const public_token = useGetStringFromUrl("public_token");
  const personalMessageId = useGetStringFromUrl("personal_message_id");
  const router = useRouter();  
  const classes = useStyles();

  useIsAuth(STATUS.Approved);

  const { data, error, loading } = usePersonalMessageQuery({variables: { id: personalMessageId, paginaId: public_token },});
  const {data: pmaData,error:pmerror,loading: pmaLoading,} = usePersonalMessagesAccessForPersonalMessageQuery({variables: {paginaId: public_token,personalmessage_id: personalMessageId},skip: isServer(),});

  //Data for list of people they can chose from
  const { data: requestsData, error:errorRequestQuery, loading:loadingrequests } = useRequestsByPaginaIdQuery({
    variables: {
      paginaId: public_token,
    },
    skip: isServer(),
  });




  const [mutateUpload] = useMutation(MUTIPLE_UPLOAD);
  const [deleteMediaPersonalMessage] = useDeleteMediaMutation();
  const [updatePersonalmessage] = useUpdatePersonalMessageMutation();    
  const [allowAcces] = useCreatePersonalMessageAccessMutation();
  const [denyAccess] = useDeletePersonalMessageAccessMutation();
  const [createMediaPersonalMessageMutation,] = useCreateMediaPersonalMessageMutation();  
  const [files, setfiles] = useState<Array<any>>([]); //TODO: voeg de media array hier in
  const [aantalMB, setaantalMB] = useState(0);
  const [SelectedName, setSelectedName] = useState('')
  const [nameList, setnameList] = useState<Array<string>>([]);
  const [userIdList, setuserIdList] = useState<Array<string>>([])
  const [RemoveMediaClick, setRemoveMediaClick] = useState(false);
  const [removeMediaId, setremoveMediaId] = useState('')
  const [state, setstate] = useState( pmaData?.personalMessagesAccessForPersonalMessage);
  const [open, setOpen] = useState(false);

  
  const handleClose = () => {setOpen(false);};
  const handleOpen = () => {setOpen(true);};

  let handleChangeName = (event:any) => {
      setSelectedName(event.target.value)
    }
    let handleChangeAantal = async (event: any) => {
      for (let i = 0; i < event.target.files.length; i++) {
        //check how much MB 
        if((aantalMB + event.target.files[i].size)>MAX_UPLOAD_SIZE){
          alert("Uw media is te groot om te uploaden")
          }    
        else{
          files.push(event.target.files[i]);
          setaantalMB(aantalMB+(event.target.files[i].size));          
        }
      }        
    }
    let removeItem = async (file: any) => {

      setfiles(files.filter((item: any) => item.name !== file.name));
      setaantalMB(aantalMB - file.size);

    }
    const handleChangeMultiple = (options:any) => {
      const id_value: string[] = [];
      const name_value: string[] = [];       
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

    let remove_old_mediaItem = async (event: any,id:string) => {
      setremoveMediaId(id);
      setRemoveMediaClick(true);
    }

    const handleDelete = (id:string,username:string) => {
        pmaData?.personalMessagesAccessForPersonalMessage?.map((user: any, index: any) => {        
        if (id===user.userThatHasAccess?.id){
          const result  = denyAccess({ variables: {userThatHasAccessId:user.userThatHasAccess?.id,personalMessageId: personalMessageId,paginaId:public_token }});
        }
      })
      alert('Deze ontvanger is verwijdert. ');
      location.reload();
    };
  

    const handleNewPersonDelete = (value:string) => {
      const id_value: string[] = [];
      const name_value: string[] = [];    
      for (let i = 0; i< userIdList.length; i += 1) {      
        id_value.push(userIdList[i])
        name_value.push(nameList[i])
      }
      const index = name_value.indexOf(value);
      name_value.splice(index, 1);
      id_value.splice(index, 1);
  
      setuserIdList(id_value);
      setnameList(name_value);
    };

    


  if (loading || loadingrequests || pmaLoading) {
    return (
      <div>
        <Flex align="center" justify="center">
         <CircularProgress color="primary"  size={30}/>
        </Flex>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  return (
    <>
      <Layout>

      <div className="memory_return_container" >
        <BsArrowLeft className='memory_return_icon' onClick={(e:any)=> router.push(`/PLATFORM/${public_token}/personal-messages-owner-view`)} />
      </div>

      <Formik
      initialValues={{ title: data!.personalmessage.title,  text: data!.personalmessage.text,media: data?.personalmessage.media, dateAvailable: new Date(parseInt(data?.personalmessage.dateAvailable as string))}} 
      onSubmit={async (values) => {

        await updatePersonalmessage({ variables: { id:personalMessageId , title: values.title, text: values.text, dateAvailable:values.dateAvailable,paginaId: public_token } 
          ,
          // update: (cache) => cache.writeFragment({ id: "PersonalMessages:" + data.herinnering.id })
        });
          try {
            let response = await createMediaFunction(files, public_token, "persoonlijkeboodschap",personalMessageId, mutateUpload,createMediaPersonalMessageMutation);
            for(let i=0; i<userIdList.length; i++){
              const allowacces = await allowAcces({
                variables: {
                  userId: userIdList[i], // Heel belangrijk hier moet er een inputfield (nu is dit gewoon 1)
                  //    komen waardat de persoon kan invoeren wie hij wil die toestemming krijgt
                  // dit via email of user maar uiteindelijk geven we hier userId mee
                  personalMessageId: personalMessageId,
                  paginaId:public_token,
                },
                update: (cache: any) => {
                  cache.evict({
                    fieldName: "personalMessagesAccessForCurrentPage",
                  }); /// nog deftig updaten
                },
              });  
            
            }
           
        
        
          }catch(error:any){
          }
          try{
            for(let i=0; i<userIdList.length; i++){
              const allowacces = await allowAcces({
                variables: {
                  userId: userIdList[i], // Heel belangrijk hier moet er een inputfield (nu is dit gewoon 1)
                  //    komen waardat de persoon kan invoeren wie hij wil die toestemming krijgt
                  // dit via email of user maar uiteindelijk geven we hier userId mee
                  personalMessageId: personalMessageId,
                  paginaId:public_token,
                },
                update: (cache: any) => {
                  cache.evict({
                    fieldName: "personalMessagesAccessForCurrentPage",
                  }); /// nog deftig updaten
                },
              });  
            
            }
            alert('laatste boodschap is gewijzigd')

          }catch(errror){alert('er is iets fout gelopen probeer later opnie')}
          
          router.push(`/PLATFORM/${public_token}/personal-messages-owner-view`);



    }}

    >
      {({ isSubmitting,setFieldValue,values }) => (

        <Form className='edit_personal_message_container'>       
          <div className="edit_personal_message_header">Laatste Boodschap wijzigen  </div>  

            <button type='submit' className='edit_personal_message_btn' ><BiCalendarHeart className='edit_personal_message_btn_icon'/>Wijzigingen opslaan</button>
                
              <div className="edit_personal_message_text_container">   
                <div className="flashcard_label">Onderwerp laatste Boodschap</div>   
                  <input type='text' name="title"  value={values.title} onChange={(event:any)=>setFieldValue("title", event.target.value)} className='edit_personal_message_title' />                                  
                  
                <div className="flashcard_label"> Laatste boodschap verhaal</div>                                 
                  <textarea  name="text" value={values.text}  onChange={(event:any)=>setFieldValue("text", event.target.value)} className='edit_personal_message_text'/>
            </div>

            
            <div className="flashcard_options_box">
                <div className="flashcard_label"> Datum wanneer dit bericht mag verzonden worden</div>  
                  <Fragment>
                      <div className="edit_personal_message_date_container">
                                
                                <KeyboardDatePicker
                                  keyboardIcon={<BiCalendar/>}  invalidDateMessage={'ongeldige datum'}
                                  className='datepicker_ui'
                                  InputProps={{disableUnderline: true,}}                                  
                                  minDate={new Date('1700-01-01')}
                                  minDateMessage='datum kan niet voor dit jaartal datum. '
                                  openTo="year"
                                  clearable
                                  value={values.dateAvailable}        
                                  placeholder="01/01/2021"
                                  views={["year", "month", "date"]}
                                  onChange={(date:any) => {
                                    setFieldValue('dateAvailable',date);
                                    }}
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


              {/* list of old items for upload */}
              {data?.personalmessage?.media.map((file: any, index: any) => (                
              <div className="flashcard_media_container">
                      {file.mediaType === 'image' ? <img src={file.urlFile} alt="Avatar" className="upload_media_img" /> :null}
                      {file.mediaType === 'video' ? <BsCameraVideo className="upload_media_img" /> :null}
                      {file.mediaType === 'audio' ? <HiOutlineMicrophone className="upload_media_img" /> :null}
                      <div className="upload_media_text_container">
                        <div className="upload_media_name">{file.name}</div>
                        <div className="upload_media_info">{file.mediaType} - </div>
                      </div>
                      <div className="delete_cont">
                        <div className="upload_delete_btn" onClick={(event:any)=>{remove_old_mediaItem(event,file.id)}}><GrClose /></div>
                      </div>
        
                </div>
              ))}   

              {/* list of new items for upload */}
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

  
                <div className="flashcard_title">Personen die deze laatste boodschap mogen ontvangen:</div>  


                {pmaData?.personalMessagesAccessForPersonalMessage?.map((user: any, index: any) => (                            
                      <div className="flashcard_chip_container">
                      <Chip 
                                      key={user.userThatHasAccess.username} 
                                      label={user.userThatHasAccess.username}
                                      onDelete={(event:any)=>{handleDelete(user.userThatHasAccess?.id, user.userThatHasAccess?.username )}}
                                      deleteIcon={<IoIosCloseCircle />}
                                      className={classes.chip} />
                           
                        </div>
                     
              ))} 

                {nameList.map((name: any, index: any) => (                            
                      <div className="flashcard_chip_container">
                      <Chip 
                                      key={name} 
                                      label={name}
                                      onDelete={(event:any)=>{handleNewPersonDelete(name)}}
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
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          onChange={(event:any)=> handleChangeMultiple(event.target.value)}
                          input={<Input id="select-multiple-chip" />}            
                          MenuProps={MenuProps}
                        >

                      {requestsData!.requestsByPaginaId.map((request) =>(
                        <MenuItem key={request.requestor.id+'$'+request.requestor?.username} value={request.requestor.id+'$'+request.requestor?.username} >{request.requestor?.username}</MenuItem>
                          ))}

                        </Select>
                      </FormControl>
                </div>       
        </Form>
      )}
    </Formik>   


    {RemoveMediaClick ? <RemoveModal public_token={public_token}
                      Modalclick={RemoveMediaClick} setmodalclick={setRemoveMediaClick} 
                      title={'Bent u zeker dat u deze media wilt verwijderen?'} media_id={removeMediaId} />
      :null}
 

      </Layout>
    </>
  );
};
export default WithApollo({ ssr: false })(EditPersonalMessage);



