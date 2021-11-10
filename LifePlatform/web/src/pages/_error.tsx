import { useRouter } from 'next/router';
import React from 'react'


export default function Error() {
  const router = useRouter();

    return (
    <>
 
 <div className='error_page_container'>
    <div className="error_page_box">

        <div className="error_page_img_container">
            <img src="/img/logos/logo_black.svg" alt="Aeterna"  onClick={()=>{router.push("/#home")}}className="error_page_footer_img"/>       
        </div>

        <div className="error_page_return_text">Deze pagina bestaat jammer genoeg niet</div> 
        
        <div className="error_page_btn_box">
          <div className='error_page_return_btn' onClick={(e:any)=>router.back()}> terugkeren</div>
          <div className='error_page_return_btn' onClick={(e:any)=>router.push("/")}> home</div>
        </div>
    </div>
        
        
    </div>      
        </>
    );
  }