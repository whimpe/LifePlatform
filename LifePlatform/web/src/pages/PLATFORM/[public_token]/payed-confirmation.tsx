import React from "react";
import ReactDOM from "react-dom";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";
import {  useRouter } from 'next/router'


function Payedconfirmation() {
    const router= useRouter();
    const public_token = useGetStringFromUrl("public_token");

    return (
        <>




       
    <div className='succes_page_container'>
    <div className="error_page_box">

        <div className="error_page_img_container">
            <img src="/img/logos/logo_black.svg" alt="Aeterna"  onClick={()=>{router.push("/#home")}}className="error_page_footer_img"/>       
        </div>

        <div className="error_page_return_text">De betaling is gelukt vanaf nu heeft u premium.</div> 
        
        <div className="error_page_btn_box">
          <div className='error_page_return_btn' onClick={(e:any)=>router.push(`/PLATFORM/${public_token}`)}> Start het verhaal</div>
        </div>
    </div>
        
        
    </div>
       </>
    )
}

export default Payedconfirmation


