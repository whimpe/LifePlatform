import Modal from "@material-ui/core/Modal";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { FiMail } from 'react-icons/fi';
import { useEmail_CollecterMutation } from '../../generated/graphql';



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

interface LeadGeneratorProps {
    modal_state:boolean;
    setmodal_state:any;
}

export const LeadGenerator: React.FC<LeadGeneratorProps> = ({modal_state,setmodal_state}) => {
    const router = useRouter();
    const classes = useStyles();
    const [email_collecter] = useEmail_CollecterMutation();    
    const [email, setemail] = useState("");
    const [open, setOpen] = useState(true);
      
    
      const handleClose = () => { setmodal_state(false); };
      const handleemail = (event: any) => { setemail(event.target.value); };
      let handleSubmit = () => {           
        email_collecter({ variables: { email: email, sheet_index:4}, });
        setmodal_state(false); 
        alert("Bedankt, en wij houden je op de hoogte!");
      };



    return (
    <>
    <Modal
      open={modal_state}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
        <div  className={classes.paper}>           
        <div className="footer_title_start">Binnenkort beschikbaar</div>
        <div className="footer_subtitle_start">Vul je email in, en wij houden je op de hoogte wanneer deze service beschikbaar is.</div>
            <div className="footer_email_container">
                <div className="login_input_box" > <FiMail className="input_login_icon"  onClick={(e:any)=>document.getElementById('email_lead')?.focus()} /> <input placeholder="Email" id='email_lead' value={email} autoComplete="email" className="login_input_field" onChange={(e:any)=>{handleemail(e)}} ></input> </div>
            </div>
            <div className='footer_start_btn' onClick={()=>{handleSubmit();handleClose();}}> verzenden</div>
            </div>
    </Modal>
    </>
    )
}


export default LeadGenerator
