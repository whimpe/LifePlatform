import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



interface ConfirmationModalProps {
  data: any;
  validate_function:any;
  cancel_function:any;
  confirmed:boolean;
  setconfirmed:any
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({data,validate_function,confirmed,setconfirmed,cancel_function}) => {

  // {"status":2,"state":false,"accessrequest_id":'',"person_name":''}
  const [open, setOpen] = useState(confirmed);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };


  return (
    <div>
   
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {data.text}
           </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e:any)=> {setconfirmed(false);handleClose()}} color="primary">
            terugkeren 
          </Button>
          <Button onClick={(e:any)=>{
                if(data.accessrequest_id===''){
                  cancel_function()
                  setconfirmed(false)
                }else{
                  validate_function(data.status,data.accessrequest_id);
                  setconfirmed(false);
                if(data.status===5){
                    location.reload()
                  }
                  handleClose();
                }                  
          }} color="primary">
            Akkoord


          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}