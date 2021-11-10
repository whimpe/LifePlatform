import { Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { WithApollo } from '../../../utils/withApollo';

let send_list:Array<string> = [];



interface Demo_InviteModalProps {
    handleCloseInvite:any;
    handleOpenInvite:any;
    open:boolean;
    public_token:string;
    username:string;
}

export const Demo_InviteModal: React.FC<Demo_InviteModalProps> = ({handleCloseInvite,handleOpenInvite,open,public_token,username}) => {

  


  return (
    <div>
      <Dialog open={open} onClose={handleCloseInvite} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nodig vrienden en familie uit </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Plaats het e-mailadres van de persoon die toegelaten is om het levensverhaal te bezoeken en herinneringen te delen.
          </DialogContentText>
          <TextField margin="dense" id="name" label="Emailadres" type="email" value="mail" fullWidth onChange={(e:any)=> alert("kan niet uitnodigen in demo-omgeving")}/>

          {send_list.map((email_value)=> (
                    <Chip label={email_value} />
          ))}

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInvite} color="primary">
            sluiten
          </Button>
          <Button onClick={(e:any)=>alert("kan niet uitnodigen in demo-omgeving")} color="primary">
            Versturen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default WithApollo({ ssr: false })(Demo_InviteModal);
