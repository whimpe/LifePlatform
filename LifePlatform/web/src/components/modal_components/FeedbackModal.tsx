import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFeedbackMutation, useMeQuery } from "../../generated/graphql";
import { WithApollo } from '../../utils/withApollo';
import { isServer } from '../../utils/isServer';


interface FeedbackModalProps {
    setOpenFeedbackModal: any;
    OpenFeedbackModal:boolean; 
    userid:string;
  }

const FeedbackModal: React.FC<FeedbackModalProps> = ({setOpenFeedbackModal,OpenFeedbackModal,userid})=>{

  const { data: meData, loading: Meloading } = useMeQuery({skip: isServer(),});


  const [open, setOpen] = useState(OpenFeedbackModal);
  const handleClickOpen = () => { setOpen(true);setOpenFeedbackModal(true); };
  const handleClose = () => { setOpen(false);setOpenFeedbackModal(false);  };


  const [feedback] = useFeedbackMutation();
  const [feedback_text, setfeedback_text] = useState("");



  let handleSubmit = (e: any) => {
    feedback({ variables: { userId: userid, feedback: feedback_text, }, });
    handleClose();
    setfeedback_text("");
    alert("bedankt voor de feedback!");
  };

  const handlefeedback = (event: any) => { setfeedback_text(event.target.value); };

  return (
    <div>
  
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vertel ons wat er beter kan aan ons platform. Of is er iets misgelopen met uw levensverhaal?
          </DialogContentText>


          {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth /> */}
          <TextField label="Bericht"  className="contact_general_submit_field" multiline  rows={3} id="filled-multiline-flexible" value={feedback_text} onChange={handlefeedback}> </TextField >

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuleren
          </Button>
          <Button onClick={(e:any)=>{handleSubmit(e);}} color="primary">
            Feedback versturen 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default WithApollo({ ssr: false })(FeedbackModal);






