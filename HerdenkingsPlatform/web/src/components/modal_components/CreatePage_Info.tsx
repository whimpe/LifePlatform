import { KeyboardDatePicker } from "@material-ui/pickers";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { BsArrowRight, BsQuestionCircle } from "react-icons/bs";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MAX_UPLOAD_SIZE } from "../../constants";
import { ACCOUNT_STATUS } from "../../constants";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const access_status =['Wie mag dit verhaal zien','Openbaar','Enkel Intieme kring','enkel mezelf en overleden']

interface CreatePage_InfoProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
  Content:any;
}

export const CreatePage_Info: React.FC<CreatePage_InfoProps> = ({ setModelclick, setContent,setmodalState,Content }) => {
  const router = useRouter();
  const [DoB, setDoB] = useState(new Date()); 
  const [DoD, setDoD] = useState(new Date()); 
  const [title, settitle] = useState(undefined);
  const [text, settext] = useState(undefined);

  const { data: Medata, loading: Meloading } = useMeQuery({skip: isServer(),});
 

   let TextHandler = (e:any) => {
     settext(e.target.value)
     setContent((prevState:any) => {
      return { ...prevState, text: e.target.value }
      });  
      return 
    } 
    let TitleHandler = (e:any) => {
      settitle(e.target.value)
      setContent((prevState:any) => {
        return { ...prevState, title: e.target.value }
      });  
      return 
    } 
    let DoBHandler = (date:any) => {
      setDoB(date);
      setContent((prevState:any) => {
        return { ...prevState, dob: date }
      });  
      return 
    } 
    let DoDHandler = (date:any) => {
      setDoD(date);
      setContent((prevState:any) => {
         return { ...prevState, dod: date }
       });  
       return 
     } 
 
 

  

  return (
    <>        
        <div className="flashcard_container">   
                <div className="flashcard_title">Levenstijdlijn aanmaken</div>  
                <div className="flashcard_text_container">             
                <div className="flashcard_label"> Naam van Levenstijdlijn</div>   
                  <textarea className="flashcard_title_input" 
                        placeholder={'Voor - en Achternaam'} 
                        maxLength={50}
                        value={Content.title} onChange={(e:any)=>{TitleHandler(e)}}
                        id="textarea"></textarea>  
                 
              {/* <div className="flashcard_label"> Korte Inleiding</div>   
              {/* {Content.inspiration ? <div className="flashcard_subtitle_question">"{Content.inspiration}"</div> : null} 
                <textarea className="flashcard_message_input"   
                        placeholder='Bericht ...' value={''}                     
                        id="textarea"></textarea>   */}

                <Fragment>
                <div className="flashcard_date_container">
                    <div className="flashcard_date_box">                                      
                            <div className="flashcard_label"> Geboortedatum</div>  
                            <KeyboardDatePicker
                            keyboardIcon={<BiCalendar/>}  
                            invalidDateMessage={'ongeldige datum'}
                            className='datepicker_ui'
                            InputProps={{
                                disableUnderline: true,
                            }}
                            minDate={new Date('1700-01-01')}
                            minDateMessage='datum kan niet voor dit jaartal datum. '                             
                            openTo="year"
                            clearable
                            placeholder="01/01/1980"
                            value={Content.dob}                                  
                            views={["year", "month", "date"]}
                            onChange={(date:any) => {setDoB(date);DoBHandler(date);}}
                            format="dd/MM/yyyy"
                            /> 
                        </div>
                        
                    {/* <div className="flashcard_date_box">                                      
               
                        <div className="flashcard_label">Overlijdensdatum </div>                          
                        <KeyboardDatePicker
                        keyboardIcon={<BiCalendar/>}  
                        className='datepicker_ui'
                        InputProps={{ disableUnderline: true, }}
                        minDate={new Date('1700-01-01')}
                        minDateMessage='datum kan niet voor dit jaartal datum. '
                        openTo="year"
                        clearable
                        placeholder="--/--/----"
                        value={Content.dod}        
                        invalidDateMessage={'ongeldige datum'}                             
                        views={["year", "month", "date"]}
                        onChange={(date:any) => {setDoD(date);DoDHandler(date);}}
                        format="dd/MM/yyyy"
                        okLabel="Selecteer"
                        cancelLabel='Annuleer'
                        clearLabel='Geen Datum'

                      />                                                                                         
                        </div> */}
                    </div>
                </Fragment>
            </div>    
     
                 <div className="flashcard_btn_container">
                  {/* <div onClick={(e)=>{setmodalState('inspiration')} } className="flashcard_inspiration_btn" ><BsQuestionCircle className='flashcard_icon_btn' /> <p className='flashcard_text_btn'>inspiratie voor korte inleiding?</p></div> */}
                  <div onClick={(e)=>{
                      if(Content.dob===null || Content.title===undefined ){alert('De volledige naam en geboortedatum zijn verplicht')}
                      else{setmodalState('media');}                      
                      }} className="flashcard_media_btn"><div className='flashcard_text_btn'>Voeg profielfoto toe </div>  <BsArrowRight className='flashcard_icon_btn' /></div>
                </div>
        </div>         
        

    </>
  );
};

export default WithApollo({ ssr: false })(CreatePage_Info);
