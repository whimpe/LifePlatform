import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WithApollo } from '../../utils/withApollo';
import { useInvite_PeopleMutation } from '../../generated/graphql';
import { Chip } from '@material-ui/core';

let send_list:Array<string> = [];



interface InviteModalProps {
    handleCloseInvite:any;
    handleOpenInvite:any;
    open:boolean;
    public_token:string;
    username:string;
}

export const InviteModal: React.FC<InviteModalProps> = ({handleCloseInvite,handleOpenInvite,open,public_token,username}) => {

  const [email, setemail] = useState('');
  const [sent_InviteEmail] = useInvite_PeopleMutation();

  const EmailHandler = (e:any)=>{ setemail(e.target.value) }

    const sendEmail =(e:any) => {
      if (email==='' || !email.includes('@')){
        alert('Dit is geen geldig een geldig e-mailadres.')
      }else{
        sent_InviteEmail({ variables:{email:email,username:username, public_token:public_token},})
        send_list.push(email);
        setemail('');
        alert('Uw uitnodiging is verzonden');
        
      }

        
    }

  return (
    <div>
      <Dialog open={open} onClose={handleCloseInvite} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nodig vrienden en familie uit </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Plaats het e-mailadres van de persoon die toegelaten is om jouw levensverhaal te bezoeken en herinneringen te delen.
          </DialogContentText>
          <TextField margin="dense" id="name" label="Emailadres" type="email" value={email} fullWidth onChange={(e:any)=> EmailHandler(e)}/>

          {send_list.map((email_value)=> (
                    <Chip label={email_value} />
          ))}

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvite} color="primary">
            sluiten
          </Button>
          <Button onClick={(e:any)=>sendEmail(e)} color="primary">
            Versturen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default WithApollo({ ssr: false })(InviteModal);
