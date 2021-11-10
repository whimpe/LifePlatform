import { Button } from "@chakra-ui/core";
import { Fade } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface Partner_HeaderProps {
 

}

const Partner_Header: React.FC<Partner_HeaderProps> = ({}) => {

    const router = useRouter();
    const { data: meData, loading: Meloading } = useMeQuery({ skip: isServer(), });
    return (
    
      <header id="header" >
      <div className="intro_partner">                
        <div className="overlay">          
                  <div className="home_text_container">
                <Fade  in={true}  timeout={2500}>
                <div className='home_title_text'>
                    Word Partner om <br/>levensverhalen waardevol te bewaren       
                      <span></span>
                    </div>
                </Fade>
                <div className="home_container_btn">
                    <a className="home_main_btn" href={'#benefits'} >Bekijk de voordelen</a>
                    <div className="home_main_btn_right" onClick={(e:any)=>router.push('/register-partners')}>Word partner</div>
                  </div> 
                </div>                  
                <div className="read_more_box">
                <div className="read_more_text">hoe werkt het </div>
                  <div className="read_more_vertical_line"></div>
                </div>            
          </div>
        </div>

    </header>



  
    
    );
  }


export default Partner_Header;
