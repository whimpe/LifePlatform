import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { WithApollo } from '../../utils/withApollo';
import { useInvite_PeopleMutation,useDigitize_ConfirmationMutation } from '../../generated/graphql';
import { Chip } from '@material-ui/core';

let send_list:Array<string> = [];



interface OrderDigitizationProps {
 customerdata:any;
 open:boolean;
 handleClose:any;
}

export const OrderDigitization: React.FC<OrderDigitizationProps> = ({customerdata,open,handleClose}) => {

  const [digitize_confirmation] = useDigitize_ConfirmationMutation();

    const sendEmail = async (e:any) => {
     //Digitize_Confirmation
      const result = await digitize_confirmation({ variables:{name_of_page:customerdata.name, page_id:customerdata.page_id,},});
      if(result){
        alert('De digitalisatie is besteld. Wij contacteren u de partner wanneer de digitalisatiedoos wordt afgehaald.')
      }else{
        alert('Er liep iets mis')
      }       
      handleClose();
    }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Digitalisatie voor {customerdata.name} </DialogTitle>
        <DialogContent>
          <DialogContentText>  
            Wij contacteren u wanneer de digitalisatiedoos wordt opgehaald binnen de 24u. De herinneringen worden gedigitaliseerd aan de hoogste kwaliteit. Indien u nog vragen heeft kan u gerust bellen op het nummer 0478/436579.     
          </DialogContentText>

 
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"> sluiten </Button>
          <Button onClick={(e:any)=>sendEmail(e)} color="primary"> Bevestigen </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default WithApollo({ ssr: false })(OrderDigitization);
