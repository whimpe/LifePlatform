import { useMutation } from "@apollo/client";
import { CircularProgress, TextareaAutosize } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useRouter } from "next/router";
import { default as React, Fragment, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AMOUNT_OF_BYTES_PLAN, MAX_UPLOAD_SIZE } from "../../constants";
import { useCreateHerinneringMutation, useCreateMediaHerinneringMutation, useHerdenkingspaginaQuery, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { createMediaFunction } from "../../utils/upload_functions/createAndUploadMedia";
import { MUTIPLE_UPLOAD } from "../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import ErrorModal from "./ErrorModal";
import * as gtag from '../../utils/googleanalytics/gtag';

const access_status_opties =['none','waiting','Vrienden en Familie','Intieme kring','medebeheerders en mezelf','beheerder en mezelf'];


 export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root:{
      width:500,
    }
  }),
);





interface CreateContent_TextProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
  Content:any;

}

export const CreateContent_Text: React.FC<CreateContent_TextProps> = ({ setModelclick, setContent,setmodalState,Content }) => { 

  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const classes = useStyles();
  const [createHerinnering] = useCreateHerinneringMutation();
  const [createMediaHerinnering] = useCreateMediaHerinneringMutation();
  const [mutateUpload, { loading, error, data }] = useMutation(MUTIPLE_UPLOAD);
  const [showcategories, setshowcategories] = useState(true);
  const [selectedDate, handleDateChange] = useState(null); 
  
  const [OnTimeline, setOnTimeline] = useState(true);
  const [acces_status_memory, setacces_status_memory] = useState(2);
  const [files, setfiles] = useState<Array<any>>(Content.media);
  const [aantalMB, setaantalMB] = useState(Content.totalMB);
  const [Error_value, setError_value] = useState(false);
  const [Error_type, setError_type] = useState('default_error');
  const [loading_state, setloading] = useState(false)

  const { data: PaginaData, loading: paginal } = useHerdenkingspaginaQuery({ skip: isServer(), variables: { paginaId: public_token } });
  const { data: meData, loading: meloading } = useMeQuery({variables: {paginaId: public_token,},skip: isServer(), });

  

  let MessageHandler = (e:any) => {
    setContent((prevState:any) => {
     return { ...prevState, message: e.target.value }
     });  
     return 
   } 
   let TitleHandler = (e:any) => {
     setContent((prevState:any) => {
       return { ...prevState, title: e.target.value }
     });  
     return 
   } 

   let DateHandler = (date:any) => {
     setContent((prevState:any) => {
       return { ...prevState, date: date }
     });  
     return 
   } 
    const handleCategory = (event:any) => {
     setContent((prevState:any) => {
     return { ...prevState, category: event.target.value  }
   });  
   return 
   };

   const handleStatus = (event:any) => {
     setacces_status_memory(event.target.value);
     setContent((prevState:any) => {
     return { ...prevState, accesstatus: event.target.value  }
   });  
   return 
   };
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     setOnTimeline(event.target.checked );
     setContent((prevState:any) => {
       return { ...prevState, ontimeline: event.target.checked}
     });  
     return 
   };


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

  //write memory to database
  const create_memory = async () =>{
    
    if(OnTimeline && selectedDate===null){
      alert('U bent de datum vergeten voor op de tijdlijn.')
      return(null)
  }                    
    setloading(true);
    if (Content.totalMB > 100000000) { //100MB threshold      
      throw new Error("het aantal bestanden is te groot");
      setloading(false);
      return(null);
    }
    try{
      const herinne = await createHerinnering({
        variables: {
          input: {
            title:Content.title,
            text: Content.message,
            categorie: Content.category, //TODO: fix categorie
            datumVanHerinnering: Content.date,                
            on_timeline: Content.ontimeline,
          },
            status: Content.accesstatus,  
            paginaId: public_token,        
        },
     
        update: (cache) => { //TODO: look why all the memories are suddenly double
          cache.evict({ fieldName: "herinneringen:{}" });
          
        },

      });
     
      let response;
      try{
          if(Content.media.length>0){
            response = await createMediaFunction(Content.media, public_token, "herinnering",herinne.data!.createHerinnering.id, mutateUpload,createMediaHerinnering);
          }
      }catch(error:any){
         
        if(error.message === "FileExtension not allowed"){
          alert( "File extensie mag niet gebruikt worden")  //TODO: better warning, toast?          
        }else{
          gtag.event({ action: 'create-memory', category: 'Memory', label: 'memory', value: Content.totalMB, });
          setError_type(error.message)
          setError_value(true)
          setloading(false);
        }      
      }

      if(herinne.errors ){ setloading(false); }
      if(response === false){ setloading(false); }        
        location.reload();   //TODO: dit werkt maar moet betere oplossing met cache
      }
      catch(error:any){
          gtag.event({ action: 'create-memory', category: 'Memory', label: 'Error', value: 0, });
          setError_type(error.message)
          setError_value(true)
          setloading(false);
      }
      setloading(false);
      return(null)

  } 
  
     

  return (
    <>

        
    
           <div className="flashcard_container">   
                <div className="flashcard_title">{Content.title} </div>  
                
                <div className="flashcard_text_container">               
                <div className="flashcard_label"> Vertel over de herinnering</div>   
                  <TextareaAutosize className="flashcard_message_input" aria-label="empty textarea" placeholder='Verhaal..' value={Content.message} onChange={(e:any)=> {MessageHandler(e)}} />          
                </div>  

                <div className="flashcard_options_container">
                  <div className="flashcard_options_box">
                  <div className="flashcard_label"> Datum van herinnering</div>  
                    <Fragment>
                        <div className="flashcard_date_container">
                                  
                                  <KeyboardDatePicker
                                    keyboardIcon={<BiCalendar/>}  invalidDateMessage={'ongeldige datum'}
                                    className='datepicker_ui'
                                    InputProps={{ disableUnderline: true, }}
                                    views={["day","year", "month"]} 
                                    minDate={new Date('1700-01-01')}
                                    minDateMessage='datum kan niet voor dit jaartal datum. '
                                    openTo="year"
                                    clearable
                                    value={Content.date}        
                                    placeholder="01/01/2021"
                                    // views={["year", "month", "date"]}
                                    onChange={(date:any) => {handleDateChange(date);DateHandler(date);}}
                                    format="dd/MM/yyyy"
                                  /> 
                                </div>
                        </Fragment>
                  </div>
                  <div className="flashcard_options_box">
                  <div className="flashcard_label"> Categorie</div>  
                  <FormControl className={classes.formControl}>
                  <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Content.category}
                        onChange={handleCategory}
                      >
                        <MenuItem value={1}>Familie</MenuItem>
                        <MenuItem value={2}>Vrienden</MenuItem>
                        <MenuItem value={3}>Sport</MenuItem>       
                        <MenuItem value={4}>Jeugd</MenuItem>
                        <MenuItem value={5}>Werk</MenuItem>
                        <MenuItem value={6}>Hobby</MenuItem>
                  </Select>
                  </FormControl>
                  </div>


                  <div className="flashcard_options_box">
                  <div className="flashcard_label"> Delen met:</div>  
                  <FormControl className={classes.formControl}>
                  <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={Content.accesstatus}
                        onChange={handleStatus}
                      >
                        <MenuItem value={2}>Vrienden en Familie</MenuItem>
                        <MenuItem value={3}>Intieme Kring</MenuItem>       
                        <MenuItem value={5}>{'Beheerder en mezelf'}</MenuItem>
                  </Select>
                  </FormControl>
                  </div>
                  </div>  
                  {/* TO DO: intieme kring mag ook dingen op tijdlijn plaatsen */}
                  {meData!.me!.status >=3  ?     
                  <div className="flashcard_options_container_2">
                  <div className="flashcard_options_box">
                  <div className="flashcard_label"> Op tijdlijn?</div> 
                  <FormControl className={classes.formControl}>
                  <FormGroup aria-label="position" row>          
                    <Switch 
                      color="primary"
                      checked={Content.ontimeline}
                      onChange={handleChange} />                   
                  </FormGroup>
                  </FormControl>
                  </div>
                  </div>
                  :null}               

     
                 <div className="flashcard_btn_container">

                <div onClick={(e)=>{setmodalState('media')} } className="flashcard_inspiration_btn" ><BsArrowLeft className='flashcard_icon_btn' /> <div className='flashcard_text_btn'>Media aanpassen</div></div>
                <div onClick={async (e)=>{ 
                                          try{
                                            await create_memory();
                                          }catch(error:any){
                                            if(error.message.includes("het aantal bestanden is te groot")){
                                              alert("het aantal bestanden is te groot");
                                            }else{ alert("er is iets misgegaan"); }                    
                                          }
                                          }}
                  className="flashcard_media_btn"><div className='flashcard_text_btn'>{loading_state ?<CircularProgress color='secondary' size={30}  />: "Maak een herinnering aan"}</div>  <BsArrowRight className='flashcard_icon_btn' /></div>
                  
                </div>
            </div>
              
              {Error_value ?            
              <ErrorModal  active={Error_value} setactive={setError_value} error_type={Error_type}  link={`/PLATFORM/${public_token}/settings`}/>
              :null}


  
    </>
  );
};

export default WithApollo({ ssr: false })(CreateContent_Text);

