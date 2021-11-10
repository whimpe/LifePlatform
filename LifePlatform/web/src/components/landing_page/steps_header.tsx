import { Button } from "@chakra-ui/core";
import { Fade } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface Steps_headerProps {
 

}

const Steps_header: React.FC<Steps_headerProps> = ({}) => {

    const router = useRouter();
    const { data: meData, loading: Meloading } = useMeQuery({
      skip: isServer(),
      // we only want this query to run when in the browser!
    });

    return (
    
      <header id="header" >
      <div className="intro_steps">                
        <div className="overlay">


          
                  <div className="home_text_container">
                <Fade  in={true}  timeout={2500}>
                <div className='home_title_text'>
                    Start een levenstijdlijn <br/>  voor uzelf of een dierbare          
                      <span></span>
                    </div>
                </Fade>
                <div className="home_container_btn">
                    <div className="home_main_btn" onClick={(e:any)=>router.push('/VOORBEELD/d32b99a9-3583-4f61-a04f-dd6d5ffab20b')}>Bekijk een voorbeeld</div>
                    <div className="home_main_btn_right" onClick={(e:any)=>router.push('/register')}>Start jouw verhaal</div>
                  </div> 

                </div>

                
            
   

                
                  
                <div className="read_more_box">
                <div className="read_more_text">aan de slag</div>
                  <div className="read_more_vertical_line"></div>
                </div>

             


          </div>
        </div>

    </header>



  
    
    );
  }


export default Steps_header;

{/* 
<header id="header" >
        <div className="vb_intro2">                
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {data ? data.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>
                    {data ? data.paragraph : "Loading"}
                  </p>
              
                  <a className='header_start_button'
                              
                              href={'https://docs.google.com/forms/d/e/1FAIpQLSdp4rmDrov8xybAppluA-9BeNi4oRXr3Sw1y4xJWyzTFEjKFA/viewform'}   
                              target="_blank">
                   {data.btn_text}
                  </a>
               
                </div>
              </div>
            </div>
          </div>
        </div>

      </header> */}
     