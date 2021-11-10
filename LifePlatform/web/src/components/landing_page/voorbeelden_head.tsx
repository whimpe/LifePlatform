import { Button } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface Vb_HeaderProps {
  data: any;

}

const Vb_Header: React.FC<Vb_HeaderProps> = ({data}) => {

    const router = useRouter();
    const { data: meData, loading: Meloading } = useMeQuery({
      skip: isServer(),
      // we only want this query to run when in the browser!
    });

    return (
   

      <header id="header" >
        <div className="vb_intro">                
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
                  
                  <div className='header_start_button'
                   onClick={()=>{
                    if (!meData?.me){
                      router.push("/login");
                    }else{
                      router.push("/account");               
                    }                   
                   }}>
                   {data.btn_text}
                  </div>
               
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>
     

    );
  }


export default Vb_Header;
