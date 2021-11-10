import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { BsArrowRight } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi';
import { useEmail_CollecterMutation, useSubscribeMutation } from '../../generated/graphql';

function FreeTrialBanner() {
    const router = useRouter();
    const [email, setemail] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(["MailGiven"]);
  
    const [email_collector,] = useEmail_CollecterMutation();
    const send_email_value = () => {
      email_collector({ variables: {  email: email, sheet_index:3, }, });
        setemail('');

        setCookie(
            "MailGiven",
            {
                emailClicked:true,
            },
            {
              path: "/",
              maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years
              sameSite: true,
            }
          );
    
  
        alert('Bedankt voor je inschrijving!');
      }
    return (
        <>
               <div className="footer_start_container">
                  <div className="footer_title_start">5 Tips om je levensverhaal te starten</div>
                  <div className="footer_subtitle_start">Vul je email in, en wij versturen je deze handleiding </div>
                  <div className="footer_email_container">
                  <div className="login_input_box"  onClick={()=>document.getElementById('email')?.focus()}> <FiMail className="input_login_icon" /> <input placeholder="Email" id='email' value={email} autoComplete="username" className="login_input_field" onChange={(e: any) => setemail(e.target.value)} ></input> </div>
                </div>               
                <div className="footer_start_btn" onClick={(e:any)=> {send_email_value()}}>verzenden <BsArrowRight /></div>
            </div>
        </>
    )
}

export default FreeTrialBanner
