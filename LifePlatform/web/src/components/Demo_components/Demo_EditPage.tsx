import { Checkbox, CircularProgress, Switch, Tooltip } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { default as React, Fragment, useState } from 'react';
import { BiCalendar, BiImageAdd } from "react-icons/bi";
import { BsFileCheck } from "react-icons/bs";
import Tooltipdata from '../../../assets/tooltips_text.json';
import { MediaDisplay } from "../general/MediaDisplay";
import { WithApollo } from "../../utils/withApollo";


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      display: 'flex',
      justifyContent:'center',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root:{
      width:500,
    }
  }),
);



interface Demo_EditPageProps {
  data:any;
}

const Demo_EditPage: React.FC<Demo_EditPageProps> = ({data}) => {

   
  
    const [name_of_page, setname_of_page] = useState(data.herdenkingspaginaprivatetoken.name_of_page);
    const [text_page, settext_page] = useState(data.herdenkingspaginaprivatetoken.text);
    const [newMedia, setnewMedia] = useState<File>();
    const [mediaUrl, setmediaUrl] = useState(data.herdenkingspaginaprivatetoken.mediaUrl);
    const [selectedDoB, handleDoBChange] = useState(data.herdenkingspaginaprivatetoken.DoB); 
    const [selectedDoD, handleDoDChange] = useState(data.herdenkingspaginaprivatetoken.DoD);
    const [condolenceActive, setcondolenceActive] = useState(data.herdenkingspaginaprivatetoken.condoleance_active)
    const [controle_before, setcontrole_before] = useState(data.herdenkingspaginaprivatetoken.control_before)
    const [loading_state, setloading] = useState(false);
    const [IsAlive, setIsAlive] = useState(data.herdenkingspaginaprivatetoken.DoD===null);
    const classes = useStyles();

    const add_image = (event:any) =>{


      
      if (window.File && window.FileReader && window.FormData) {
          var file = event.target.files[0];      
          if (file) {
            if (/^image\//i.test(file.type)) {
              setnewMedia(file)
            } else {
              alert('Not a valid image!');
            }
          
        }
      }else {
        alert("File upload is not supported!");
      }

    }
    


    const  update_Page = async (event:any) => {      
        alert("Je kan een voorbeeld levensverhaal niet wijzigen."); // niet voldoende opgelost nog steed een uncaught error
    }



    return (
    <>
    <form>
    <div className="edit_page_info_container">  

        <div className="edit_page_text_container">
          <div className="flashcard_label"> Naam levenstijdlijn</div>   
            <input className="edit_page_title_input" placeholder={name_of_page} maxLength={50} value={name_of_page} onChange={(event:any)=>{setname_of_page(event.target.value)}} id="title"></input>        
          <div className="flashcard_label"> Korte welkoms- of afscheidsboodschap</div>   
            <textarea className="edit_page_message_input" value={text_page}onChange={(event:any)=>{settext_page(event.target.value)}} id="textarea"></textarea> </div>

        <div className="edit_page_media_container">
        <MediaDisplay awsUrl={mediaUrl} type={'image'} designclass="chosen_image_preview" />    
        <label htmlFor="upload-photo"><div className='edit_page_upload_btn' ><div className='edit_page_upload_text_btn'>Nieuwe foto uploaden</div><BiImageAdd className='edit_page_icon_btn'/></div></label>                             
        </div>
      
    </div>


    <Fragment>
    <div className="edit_page_info_btn_container">
          <div className="edit_page_date_container">
            <div className="flashcard_label"> Geboortedatum</div>   
            <KeyboardDatePicker
              keyboardIcon={<BiCalendar />}
              className='datepicker_ui'
              InputProps={{
                disableUnderline: true,
              }}
              openTo="year"
              clearable
              value={selectedDoB}        
              views={["year", "month", "date"]}
              onChange={handleDoBChange}
              format="dd/MM/yyyy"
            /> 
          </div>
        
          <div className="edit_page_date_container"> 
            <div className="flashcard_label"> {IsAlive ?  'Levensverhaal van uw leven?':'Overlijdensdatum'} </div>   
           {IsAlive ?            
              <Checkbox
              
              checked={IsAlive}
              onChange={(e:any)=>setIsAlive(e.target.checked)}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            :
            <KeyboardDatePicker
            keyboardIcon={<BiCalendar/>}
            className='datepicker_ui'
            InputProps={{ disableUnderline: true, }}
            openTo="year"
            clearable
            value={selectedDoD}         
            views={["year", "month", "date"]}
            onChange={handleDoDChange}
            format="dd/MM/yyyy"
          />
         
        }

        </div>

          <div className="edit_page_date_container">

            <Tooltip title={Tooltipdata["activate_condolances"].text}>
            <div className="flashcard_label"> Condeleren aan?</div> 
            </Tooltip>
        
            <FormControl className={classes.formControl}>
              <FormGroup aria-label="position" row>          
                  <Switch 
                    color="primary"
                    checked={condolenceActive}
                    onChange={(e:any)=>{setcondolenceActive(e.target.checked)}} 
                    />                   
              </FormGroup>
            </FormControl>
            </div>
            <div className="edit_page_date_container">

            <Tooltip title={Tooltipdata["explain_control_before"].text}>
             <div className="flashcard_label"> Alles eerst controleren?</div> 
            </Tooltip>

            <FormControl className={classes.formControl}>
              <FormGroup aria-label="position" row>          
                  <Switch 
                    color="primary"
                    checked={controle_before}
                    onChange={(e:any)=>{setcontrole_before(e.target.checked)}} 
                    />                   
              </FormGroup>
            </FormControl>
            </div>



        <div className="edit_page_submit_container">
          <div className='droplet_btn' onClick={(event:any)=> {update_Page(event)}}>
              <div className="droplet_btn_text">{loading_state ?<CircularProgress color='secondary' size={30}  />:'AANPASSINGEN OPSLAAN'}</div> <BsFileCheck className='droplet_btn_icon' />
          </div>
        </div>

    </div>
    </Fragment>


      {/* input image element */}
      <input
      multiple 
      type="file"
      name="photo"
      accept="image/*"
      style={{display:'none'}}
      id="upload-photo"
      onChange={(event: any) => {
      
      add_image(event)
      setmediaUrl(URL.createObjectURL(event.target.files[0]));                             
      }}
      />
              

    </form>

    </>

    )
}
export default WithApollo({ ssr: false })(Demo_EditPage);