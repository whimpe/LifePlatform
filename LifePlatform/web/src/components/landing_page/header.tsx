import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useToast } from "@chakra-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Slide,Fade } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


interface HeaderProps {
  data: any;

}

const Header: React.FC<HeaderProps> = ({data}) => {

    const router = useRouter();
    const { data: meData, loading: Meloading } = useMeQuery({
      skip: isServer(),
      // we only want this query to run when in the browser!
    });
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
            

    return (
   


<>

      <header id="header" >
        {/* <div className="header_gradient_overlay"> */}
          <video autoPlay muted loop  playsInline disablePictureInPicture id="myVideo" poster='/img/landing_page/main.jpg'>
            <source src={"/videos/main_video.mp4"} type="video/mp4" />
          Your browser does not support HTML5 video.
          </video>  
        {/* </div> */}
        <div className="intro">                
          <div className="overlay">

        

            
                <div className="home_text_container">
                    <Fade  in={true}  timeout={2500}>
                      <div className='home_title_text'>
                        Levensverhalen   <br/>
                        digitaal bewaard <br/>
                        voor altijd
                        <span></span>
                      </div>
                    </Fade>

                    <div className="home_container_btn">
                    <div className="home_main_btn" onClick={(e:any)=>router.push('/VOORBEELD/169f485d-a542-47ac-87b1-1d9bd5be569e')}>Bekijk een voorbeeld</div>
                    <div className="home_main_btn_right" onClick={(e:any)=>router.push('/register')}>Start jouw verhaal</div>
                    </div> 

                 
                  

                </div>
                <div className="read_more_box">
                    <div className="read_more_text">lees meer</div>
                    <div className="read_more_vertical_line"></div>
                  </div>  
                 
               


            </div>
          </div>

      </header>
      
      



     
</>
    );
  }


export default Header;
