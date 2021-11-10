import { Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface EnqueteProps {
  data: any;

}

const Enquete: React.FC<EnqueteProps> = ({data}) => {

    const router = useRouter();
    const { data: meData, loading: Meloading } = useMeQuery({
      skip: isServer(),
      // we only want this query to run when in the browser!
    });

    return (
   

      <header id="header" >
        <div className="vb_intro_main">                
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
                 href={"https://docs.google.com/forms/d/e/1FAIpQLSdp4rmDrov8xybAppluA-9BeNi4oRXr3Sw1y4xJWyzTFEjKFA/viewform"}  target="_blank">
                   Klik hier om ons te helpen
                  </a>
               
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>
     

    );
  }


export default Enquete;
