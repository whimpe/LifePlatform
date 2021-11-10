import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import JsonData from '../../assets/static_text.json';
import MetaTags from "../components/general/MetaTags";
import Digitize_options from "../components/landing_page/digitize_options";
import Features from "../components/landing_page/features";
import Footer from "../components/landing_page/footer";
import Navigation from "../components/landing_page/navigation";
import { Price_TableDigitize } from "../components/landing_page/Price_TableDigitize";
import { useDigitize_RequestMutation } from "../generated/graphql";
import { WithApollo } from "../utils/withApollo";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        fontSize: '18px',
      },
    },
  }),
);


export const DigitizeService: React.FC<{}> = ({}) => {
  const router = useRouter();
  const classes = useStyles();
  const [digitize_request,] = useDigitize_RequestMutation();
  const [naam, setnaam] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState("");
  const [adres, setadres] = useState("");
  const [boodschap, setboodschap] = useState("");
  const [selectedDate, setselectedDate] = useState(new Date());
  const [selected_option, setselected_option] = useState('basis') //basis - premium - custom
  const [list, setlist] = useState([null,null,null,null,null,null,null,null])

  let subscribe_value =null;


  let handleSubmit = (e: any) => {   
    if (email==="" || tel===""  ){
      alert("Vergeet niet je email en gsm-nummer toe te voegen.")
      return null;
    }
    digitize_request({
      variables: {
        name: naam,
        email: email ,
        tel: tel ,
        address:adres,
        boodschap: ('Date: '+selectedDate.toString()+'---[foto,vhs,fotoboek,cassette,vinyl,cds/dvd/floppy,dis,document]: '+list.toString()+'--- boodschap: '+boodschap.toString()) ,
      },
    });
    alert('Bedankt voor je aanvraag. Je ontvangt binnen de 24uur een e-mail en sms met de prijs.');
    setnaam('');
    setemail('');
    settel('');
    setadres('');
    setboodschap('');
    setlist([null,null,null,null,null,null,null,null]);
    setselectedDate(new Date());    
    router.push('/')
    return null;
}
  const handlenaam = (event:any) => {
    setnaam(event.target.value);
  }
  const handleemail = (event:any) => {
    setemail(event.target.value);
  }
  const handletel = (event:any) => {
    settel(event.target.value);
  }
  const handleboodschap = (event:any) => {
    setboodschap(event.target.value);
  }  
  const handleadres = (event:any) => {
    setadres(event.target.value);
  }
  const handleaantallen = (event:any, index:any) => {
    const change_list = list 
    change_list[index] =event.target.value;
    setlist(change_list)
    console.log(list.toString())
  }
  
    return (
      <>
        <MetaTags title={'Digital service'} type_of_page={''} description={''} mediaUrl={''} />
        {/* <div style={{backgroundColor:"#fff"}}> */}

        <Navigation dark_nav={true} />
        {/* <About_header data={JsonData.Digitize_service} /> */}

        <div className="main_quote_container">
                <div className="main_quote_digitize_title">
                Heb je ook een doos vol oude foto's, videocasettes en andere media?  
                Nu vangen die mooie herinneringen stof in de kast. Door ze te digitaliseren, 
                blaas je ze nieuw leven in en kunnen kinderen en kleinkinderen ze altijd bekijken en herbeleven.              
                <br/><br/>
                </div>                                
                </div>                                
        <Digitize_options />
        <span className="anchor_digitize_container" id="anchor_digitize_container"></span>
        <div className="digitize_container" >
              {/* <div className="contact_general_title">{'Geselecteerd pakket:'}{selected_option} </div> */}
              <div className="contact_general_title">{`Maak een afspraak en prijs aanvraag voor de digitalisatie `}</div>
              <TextField label="Voor- en Achternaam"  className="contact_general_submit_field" value={naam} onChange={handlenaam}></TextField >
              <TextField label="Emailadres"  className="contact_general_submit_field" value={email} onChange={handleemail}></TextField >
              <TextField label="Telefoonnummer"  className="contact_general_submit_field" value={tel} onChange={handletel}></TextField >
              <TextField label="Adres van ophaling"  className="contact_general_submit_field" value={adres} onChange={handleadres}></TextField >
              <div className="digitize_general_input_container">
              {JsonData.digitize_options.map((value,index) => (

              <div className="digitize_general_input_block">
                <img className="digitize_general_input_img"   src={value.img} />
                <TextField id={'index'} value={list[index]} onChange={(e:any)=>{handleaantallen(e,index)}} className="digitize_general_submit_field" label={value.text_select} type="number" InputLabelProps={{ shrink: true, }}/>
              </div>
              ))}
              </div>

              <TextField label="Andere media of informatie dat je ons wilt vertellen ..."  className="contact_general_submit_field" multiline  rows={6} id="filled-multiline-flexible" value={boodschap} onChange={handleboodschap}> </TextField >
              <div className="contact_general_date_field"> Voorkeur datum voor ophaling</div>                    
                  <Fragment>
                      <div className="flashcard_date_container">                                            
                      <KeyboardDatePicker
                              keyboardIcon={<BiCalendar/>}  
                              className='timepicker_ui'
                              InputProps={{ disableUnderline: true, }}
                              minDate={new Date('1700-01-01')}
                              invalidDateMessage={'ongeldige datum'}
                              variant="inline"
                              ampm={false}
                              value={selectedDate}
                              onChange={(date:any) => {setselectedDate(date);}}
                              onError={console.log}
                              disablePast
                              format="dd/MM/yyyy"
                            />
                        </div>
                    </Fragment>

              <div className="contact_general_submit_btn_box">
                <button type='submit' onClick={(e:any)=>handleSubmit(e)} className='contact_general_submit_btn'> Prijs aanvragen</button>
              </div>
      </div>
     

     

        <Features data={JsonData.Features_blocks.digitize_step_1} textleft={true} />   
        <Features data={JsonData.Features_blocks.digitize_step_2} textleft={false} />   
        <Features data={JsonData.Features_blocks.digitize_step_3} textleft={true} />   
        
        
        {/* <Price_TableDigitize selected_option={selected_option} setselected_option={setselected_option} /> */}

      <Footer />
      {/* </div>                                 */}


      </>
    );
  }

export default WithApollo({ssr: false})(DigitizeService);















































