import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

    
export const useStyles = makeStyles((theme: Theme) =>
createStyles({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    display: 'flex',
    justifyContent:'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root:{
    width:500,
  }
}),
);




interface CookiePreferencesProps {
    cookies: any;
    setCookie:any;
    open:any;
    onClose:any;
    setOpen:any;
}

export const CookiePreferences: React.FC<CookiePreferencesProps> = ({
    cookies,
    setCookie,
    open,
    onClose,
    setOpen
}) => {

    // const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();

    const [accessClicked, setaccessClicked] = useState(cookies["ConsentCookie"].cookieClicked);
    const [analytical, setanalytical] = useState(cookies["ConsentCookie"].analytical);
    const [marketing, setmarketing] = useState(cookies["ConsentCookie"].marketing);
    const [socialmedia, setsocialmedia] = useState(cookies["ConsentCookie"].socialmedia);



    let handleChangeAnalytical = (e: any) => {
        setanalytical(!analytical); // switch van true - false
      };
    
      let handleChangeMarketing = (e: any) => {
        setmarketing(!marketing); // switch van true - false
      };
    
      let handleChangeSocialMedia = (e: any) => {
        setsocialmedia(!socialmedia); // switch van true - false
      };


      const accepteerAlles = (e:any) => {
        setCookie(
          "ConsentCookie",
          {
            cookieClicked: true,
            analytical: true,
            marketing: true,
            socialmedia: true, //pixel om te zien van waar traffic komt
          },
          {
            path: "/",
            maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years
            sameSite: true,
          }
        );
        setOpen(false);

      };

      const bevestigVoorkeuren = (e:any) => {
        setCookie(
          "ConsentCookie",
          {
            cookieClicked: true,
            analytical: analytical,
            marketing: marketing,
            socialmedia: socialmedia, //pixel om te zien van waar traffic komt
          },
          {
            path: "/",
            maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years
            sameSite: true,
          }
        );
        setOpen(false);

      };

// https://www.interpedia.nl/analytics/beheer/google-analytics-instellen-cookiewetgeving

        return (
        <>
  
      <div className={classes.formControl}>
          <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

                <div><b>neccesary cookies</b></div>          
                <div> Noodzakelijke cookies gebruiken we om de basisfuncties van de site te kunnen laten draaien. Deze cookies verzamelen nooit persoonsgegevens.</div>
                <Switch color="primary" checked={true} name="checked_neccc"  />

                <div><b>analytical cookies</b></div>
                <div> Deze cookies verzamelen anoniem gegevens zodat we onze website verder kunnen verbeteren.</div>           
                <Switch color="primary" checked={analytical} onChange={(e:any)=>setanalytical(e.target.checked )} name="checked analytical"/>

                <div><b>marketing cookies</b></div>
                <div> Deze cookies verzamelen anoniem gegevens zodat we onze website verder kunnen verbeteren.</div>
                <Switch color="primary" checked={marketing} onChange={(e:any)=>setmarketing(e.target.checked )} name="checked marketing" />

                <div><b>sociale media cookies</b></div>
                <Switch color="primary" checked={socialmedia} onChange={(e:any)=>setsocialmedia(e.target.checked )} name="checked marketing" />

            </DialogContentText>
          </DialogContent>
          <DialogActions>

            
            <Button onClick={(e:any)=> bevestigVoorkeuren(e)} color="primary">{'Bevestig voorkeuren'}</Button>
            <Button onClick={(e:any)=>accepteerAlles(e)} color="primary" autoFocus>{'Accepteer alles'}</Button>


          </DialogActions>
        </Dialog>
      </div>
        
        </>
        );
      }


