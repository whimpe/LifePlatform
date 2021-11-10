import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useEmail_CollecterMutation, useSubscribeMutation } from "../../generated/graphql";
import { delay } from "../../utils/TimeFunction";
import { useCookies } from "react-cookie";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FiMail } from "react-icons/fi";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "fit-content",
      display:"flex",
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      margin:" 5% auto",
      outline:'none',
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)

    }
  })
);


interface Email_Pop_upProps {
    // usePopUp:boolean;
}

export const Email_Pop_up: React.FC<Email_Pop_upProps> = ({}) => {

  const classes = useStyles();
  const [email_collecter] = useEmail_CollecterMutation();

  const [email, setemail] = useState("");
  const [open, setOpen] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(["MailGiven"]);
  

  const handleClose = () => { setOpen(false); };
  const handleemail = (event: any) => { setemail(event.target.value); };
  let handleSubmit = () => {
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


      email_collecter({
      variables: { email: email, sheet_index:3, },
    });
    alert("De handleiding wordt verzonden naar uw email. Veel succes!");
  };

    useEffect(() => {
        async function wait5sec() {
            await delay(6000);
            if(!cookies["MailGiven"]){
                setCookie(
                    "MailGiven",
                    {
                        emailClicked:false,   
                    },
                    {
                      path: "/",
                      maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years
                      sameSite: true,
                    }
                  );
                //   location.reload();
            }else if(cookies["MailGiven"]?.emailClicked === true){
              setOpen(false);
            }else{ 
              setOpen(true); }
        }
        wait5sec();
      }, []);
  
  
  return (
      <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div  className={classes.paper}>           
        <div className='footer_title_start'>5 Tips om je levensverhaal te starten</div>
        <div className="footer_subtitle_start">Vul je email in, en wij versturen je deze handleiding </div>
        <div className="footer_email_container">
            <div className="login_input_box" onClick={()=>document.getElementById('email')?.focus()}> <FiMail className="input_login_icon" /> <input placeholder="Email" id='email' value={email} autoComplete="email" className="login_input_field" onChange={(e:any)=>{handleemail(e)}} ></input> </div>
        </div>
        <div className='footer_start_btn' onClick={()=>{handleSubmit();handleClose();}}> verzenden</div>
        </div>
    </Modal>
    </>
  );
};
