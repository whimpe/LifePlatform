import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import React from 'react';
import JsonData from '../../../assets/error_text.json';
import { MeQuery } from '../../generated/graphql';
import { STATUS } from '../../constants';
import { useGetStringFromUrl } from '../../utils/useGetIntFromUrl';


interface Max_authors_warningProps {
  errorMessage: string;
  meData: any ;
}


//TODO: gebruiken we dit? -> anders verwijderen!

export const Max_authors_warning: React.FC<Max_authors_warningProps> = ({
  errorMessage,
  meData
}) => {


    //TODO: beter oplossen? ->
    //Mag geen state gebruiken anders vraag hij de indexquery opnieuw op 
    // rerendert de bovenliggende component ook?

    const public_token = useGetStringFromUrl("public_token");
    const router = useRouter()


  let error_type = "max_authors";

  if (
    errorMessage.includes(
      "Je hebt al het maximum aantal mensen op je pagina, schakel over"
    )
  ) {
    return (
        <div>
          {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Open alert dialog
          </Button> */}
          <Dialog
            open={true}
            onClose={() => router.push("/#home")}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{JsonData.max_authors.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              {JsonData.max_authors.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e:any)=>{router.push("/#home")}} color="primary">{JsonData.max_authors.btn_left}</Button>
                {meData?.me?.status>= STATUS.CoOwner ? <Button onClick={(e:any)=>{router.push("/#home")}} color="primary" autoFocus>{JsonData.max_authors.btn_right}</Button>:null}
            </DialogActions>
          </Dialog>
        </div>
      );
  }else{
      return(
        <>
        <div className="memory_id_title">Heeft u al een account?</div>
        <div className="selection_options">
          <div className="option_box">
            <div className="option_title">MAAK EEN ACCOUNT AAN </div>
            <div
              className="option_button"
              onClick={(e: any) => {
                router.push("/register");
              }}
            >
              {" "}
              REGISTREER
            </div>
          </div>
    
          <div className="option_box">
            <div className="option_title">
              INLOGGEN EN START MET HET DELEN VAN MEDIA EN VERHALEN
            </div>
            <div
              className="option_button"
              onClick={(e: any) => {
                router.push("/login");
              }}
            >
              {" "}
              INLOGGEN
            </div>
          </div>
        </div>
      </>
      )
     
  }

  console.log("errorMessage",errorMessage);



};
