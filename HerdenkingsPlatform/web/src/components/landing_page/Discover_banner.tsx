import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../../generated/graphql";



function Discover_banner( boolean_2btn:any) {
    const router = useRouter();
    const { data: meData } = useMeQuery();

    
    return (
        <div className='discover_container'>
            <div className="discover_img_container">
                <img src={'/img/landing_page/discover.jpg'} className='discover_img'  />
                    <div className="discover_text_container">
                        <div className="discover_text">Leg je eerste herinnering vast</div>
                        <div className="discover_btnbox">
                            <div className="discover_btn_yellow" onClick={(e:any)=> {!meData?.me?.user?.id ? router.push('/register'): router.push('/account')}}>Start jouw verhaal</div>
                            {boolean_2btn===true ? <div className="discover_btn" onClick={(e:any)=> {router.push('/aan-de-slag')}}>Hoe werkt het</div> : null}
                        </div>
                   
                    </div>

                    
            </div>

            
        </div>
    )
}

export default Discover_banner
