import React from 'react'
import JsonData from '../../assets/static_text.json';

function StepPage( data:any) {
    return (
        <div>
            
        <div className="step_container_img" >
            <img src={data.img_location} alt=""  className='step_img_box'/>

        </div>

        </div>
    )
}

export default StepPage
