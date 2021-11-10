import {
  Box
} from "@chakra-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, styled, Theme } from '@material-ui/core/styles';
import { default as React, useEffect, useState} from "react";
import { useCookies } from "react-cookie";
import { CookiePreferences } from "./CookiePreferences";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";




function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyAlert = styled(Alert)({
  background: "rgba(255,255,255,1)",
  // backdrop-filter: blur(15px),
  border: 0,
  borderRadius: 3,
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  color: "black",
  padding: "0 30px",
  fontSize: "12px"
});
const MyButton = styled(Button)({
  background: "#3dd791",
  border: 0,
  borderRadius: 5,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  "&:hover": {
    background: "#3dd791"
  }
});


interface cookieconsentProps {

}

export const CookieConsent: React.FC<cookieconsentProps> = ({ children }) => {

  const [cookies, setCookie, removeCookie] = useCookies(["ConsentCookie"]);
  const [open, setOpen] = useState(false);
  const [pref_open, setpref_open] = useState(false);

  useEffect(() => {
    async function wait5sec() {
      await delay(8000);
      if(cookies["ConsentCookie"].cookieClicked===false){
        setOpen(true);
      }
    }
    wait5sec()
  }, [])




const handleClick = () => { setOpen(true); }; 
const handleClose = (event?: React.SyntheticEvent, reason?: string) => {setpref_open(false); };


  //Als nog niet ingesteld is ,stel in
  if (!cookies["ConsentCookie"]) {
    setCookie(
      "ConsentCookie",
      {
        cookieClicked: false,
        analytical: false,
        marketing: false,
        socialmedia: false,        
        
      },
      {
        path: "/",
        maxAge: 3600 * 24 * 30 * 12 * 5, // Expires after 5 years
        sameSite: true,
      }
    );
    location.reload();
  }



  const accepteerAlles = () => {
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
  };


  return (
    <>
      <Box hidden={cookies["ConsentCookie"].cookieClicked}>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MyAlert>
          <div> Deze website maakt gebruik van cookies. Meer info  <a href={`/privacy-policy`}>privacy policy</a></div>
          <Button onClick={(e:any)=> {handleClose(e);setpref_open(true);}}> Voorkeur instellen </Button>
          <MyButton onClick={accepteerAlles}>  Accepteer cookies </MyButton>
        </MyAlert>
      </Snackbar>


      <CookiePreferences cookies={cookies} open={pref_open} setOpen={setpref_open} setCookie={setCookie} onClose={handleClose} />

      </Box>


{/* TODO: Ik licht de betrokkene duidelijk in voor wat en voor welke doeleinden toestemming wordt
gegeven (cfr. recht op informatie). -> moet nog deftig gebeuren */}


      
    </>
  );
};
