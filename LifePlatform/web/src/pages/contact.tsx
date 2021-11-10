import React, { useState } from "react";
import { FaFacebookF,FaInstagram,FaLinkedin,FaTwitter,FaYoutube } from "react-icons/fa";
import { Box, Button } from "@chakra-ui/core";
import { BiMap } from "react-icons/bi";
import { WithApollo } from "../utils/withApollo";
import {
  useSubscribeMutation
} from "../generated/graphql";
import { MdLocationOn } from "react-icons/md";
import { TextField } from "@material-ui/core";
import JsonData from '../../assets/static_text.json';
import Navigation from "../components/landing_page/navigation";
import Header from "../components/landing_page/header";
import { BsFileText } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import MetaTags from "../components/general/MetaTags";
import About_header from "../components/landing_page/about_header";




export const ContactPagina: React.FC<{}> = ({}) => {
  
  const [subscribe,] = useSubscribeMutation();
  const [naam, setnaam] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState("");
  const [boodschap, setboodschap] = useState("");

  let subscribe_value =null;


  let handleSubmit = (e: any) => {    
    subscribe({
      variables: {
        name: naam,
        email: email ,
        tel: tel ,
        boodschap: boodschap ,
      },
    });
    alert('Bedankt voor uw inschrijving');
    setnaam('');
    setemail('');
    settel('');
    setboodschap('');
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
    return (
      <>
        <div>
        <MetaTags title={'Contact'} type_of_page={''} description={''} mediaUrl={''} />

        <Navigation dark_nav={false} />
      <About_header data={JsonData.Contact_header} />

      <div className="contact_container">

        <div className="contact_general_box">
              <div className="contact_general_title">Contact Informatie</div>
              <div className="contact_general_subtitle">Contacteer ons of vul het formulier in en ons team contacteert jullie binnen de 24uur.</div>

              <div className="contact_general_item_box">
                <MdLocationOn  className='contact_general_item_icon'/>
                <div className="contact_general_item_text">{JsonData.Contact.address}</div>
              </div>
              <div className="contact_general_item_box">
                <AiOutlineMail  className='contact_general_item_icon'/>
                <a className="contact_general_item_text" href={`mailto:${JsonData.Contact.email}`}>{JsonData.Contact.email}</a>
              </div>
              <div className="contact_general_item_box">
                <FiPhone  className='contact_general_item_icon'/>
                <div className="contact_general_item_text">{JsonData.Contact.phone}</div>
              </div>
              <div className="contact_general_item_box">
                <BsFileText  className='contact_general_item_icon'/>
                <div className="contact_general_item_text">{JsonData.Contact.btw}</div>
              </div>

                <div className="contact_social_icon_container">
                      <a
                        href={JsonData.Contact.facebook} target="_blank">
                        <FaFacebookF className='footer_icon_social' />
                      </a>
                      <a href={JsonData.Contact.instagram} target="_blank">
                        <FaInstagram className='footer_icon_social'/>
                      </a>
                      <a href={JsonData.Contact.youtube} target="_blank">
                        <FaYoutube className='footer_icon_social'/>
                      </a>
                      <a href={JsonData.Contact.linkedin} target="_blank">
                        <FaLinkedin className='footer_icon_social'/>
                      </a>        
                  </div>
               


        </div>
        <div className="contact_general_submit_box">
              <div className="contact_general_title">Uw bericht of vraag:</div>

              <TextField label="Voor- en Achternaam"  className="contact_general_submit_field" value={naam} onChange={handlenaam}></TextField >
              <TextField label="Emailadres"  className="contact_general_submit_field" value={email} onChange={handleemail}></TextField >
              <TextField label="Telefoonnummer"  className="contact_general_submit_field" value={tel} onChange={handletel}></TextField >
              <TextField label="Bericht"  className="contact_general_submit_field" multiline  rows={6} id="filled-multiline-flexible" value={boodschap} onChange={handleboodschap}> </TextField >

              <div className="contact_general_submit_btn_box">
                <button type='submit' onClick={(e:any)=>handleSubmit(e)} className='contact_general_submit_btn'> Verzenden</button>
              </div>

        </div>
      </div>


      </div>

      </>
    );
  }

export default WithApollo({ssr: false})(ContactPagina);















































