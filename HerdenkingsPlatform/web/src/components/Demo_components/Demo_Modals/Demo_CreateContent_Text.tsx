
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { Fragment, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsArrowRight, BsQuestionCircle } from "react-icons/bs";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";



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






interface Demo_CreateContent_TextProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
  Content:any;
  on_timeline:boolean;
}

export const Demo_CreateContent_Text: React.FC<Demo_CreateContent_TextProps> = ({ setModelclick, setContent,setmodalState,Content,on_timeline }) => {
  const public_token = useGetStringFromUrl("public_token");


  const [files_raw, setfiles_raw] = useState<Array<any> | any>([]);
  const [showcategories, setshowcategories] = useState(true);
  const [selectedDate, handleDateChange] = useState(null); 
  const [OnTimeline, setOnTimeline] = useState(on_timeline);
  const [acces_status_memory, setacces_status_memory] = useState(2);
  const access_status_opties =['none','waiting','Vrienden en Familie','Intieme kring','medebeheerders en mezelf','beheerder en mezelf'];

  const classes = useStyles();

  //function for removal items of list
  let removeItem = async (name: any, files_pre_index: any) => {
    await setfiles_raw(files_raw.filter((item: any) => item.name !== name));
    setContent((prevState :any ) => {
      return { ...prevState, media: files_raw}
    });
  };

 

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


  return (
    <>        
        <div className="flashcard_container">   
                <div className="flashcard_title">Leg herinnering vast </div>  
                {Content.inspiration ? <div className="flashcard_subtitle_question">"{Content.inspiration}"</div> : null}
                
              <div className="flashcard_text_container">   
                <div className="flashcard_label"> Titel van herinnering</div>   
                  <input className="flashcard_title_input" placeholder='Titel...' value={Content.title} onChange={(e)=>{TitleHandler(e)}} id="textarea"></input>  
                 
              <div className="flashcard_label"> Vertel over de herinnering</div>   
                <textarea className="flashcard_message_input" placeholder='Verhaal...' value={Content.message} onChange={(e)=>{MessageHandler(e)}} id="textarea"></textarea>  
          
              </div>  

              <div className="flashcard_options_container">
                <div className="flashcard_options_box">
                <div className="flashcard_label"> Datum van herinnering</div>  
                  <Fragment>
                      <div className="flashcard_date_container">
                                
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
                                  value={Content.date}        
                                  placeholder="01/01/2021"
                                  views={["year", "month", "date"]}
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
            <div className="flashcard_options_container_2">
            <div className="flashcard_options_box">
            {/* <div className={classes.root}> <Tooltip title={"herinnering wordt op tijdlijn geplaats wanneer deze knop aanstaat"} placement="top"> </Tooltip> </div>*/}
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

     
                 <div className="flashcard_btn_container">
                  <div onClick={(e)=>{setmodalState('question')} } className="flashcard_inspiration_btn" ><BsQuestionCircle className='flashcard_icon_btn' /> <div className='flashcard_text_btn'>inspiratie nodig?</div></div>
                  <div onClick={(e)=>{
                    if(OnTimeline && selectedDate===null){alert('U bent de datum vergeten voor op de tijdlijn.')}                    
                    else if(Content.title===null){alert('Elke herinnering bevat best een titel.')}                    
                    else{setmodalState('media');}
                  }} 
                    className="flashcard_media_btn"><div className='flashcard_text_btn'>Voeg media toe</div>  <BsArrowRight className='flashcard_icon_btn' /></div>
                </div>
        </div>         
        

    </>
  );
};

export default WithApollo({ ssr: false })(Demo_CreateContent_Text);
