import { useRouter } from 'next/router';
import React from 'react'

interface Funeral_TestimonialProps {
    
  }
  
  export const Funeral_Testimonial: React.FC<Funeral_TestimonialProps> = ({}) => {
    const router = useRouter();

    return (
        <div className='ourstory_container'>
            <img src={'/img/landing_page/Funeral_example.png'} className='funeral_testimonial_img'/>
            <div className="ourstory_text_box">
                <div className="funeral_testimonial_title">"Kinderen en kleinkinderen herontdekten prachtige verhalen van hun dierbare door de ogen van vrienden en familie. 
                    <div className='ourstory_title_bold'> Begrafenis Zwevegem</div>
                </div>
              
            </div>
        </div>
    )
}

export default Funeral_Testimonial
