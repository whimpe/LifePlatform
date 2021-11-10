import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/router";
import data from '../../../assets/static_text.json'
import * as gtag from "../../utils/googleanalytics/gtag";



function Footer() {
    const router = useRouter();

    return (
        <div className='footer_container'>
            

      

<div className="footer_information_container">

    <div className="contact_information_container">
        <div className="contact_information_box">
            <img src={"/img/logos/logo_black.svg"} className='footer_img_logo'/>
            <div className="footer_name">Aeterna BV</div>
            <a className="footer_email" href="mailto:info@aeterna.be">info@aeterna.be</a>
            <div className="footer_btw_information"> 0478/43.65.79</div>
            <div className="footer_address">Antoon Viaenestraat 8,<br/> 8200 Brugge</div>
            <div className="footer_btw_information"> BE0713.410.353</div>
        </div>

    </div>

    <div className="links_information_container">
        <div className='header_footer_link'>Meer links</div>

            <a className='footer_link' href="/aan-de-slag" >Ontdek Aeterna</a>
            <a className='footer_link' href="/digitaliseren">Digitaliseer media</a>
            <a className='footer_link' href="/partner-worden">Begrafenisondernemers</a>
            <a className='footer_link' href="/ons-verhaal">Over Ons</a>
            <a className='footer_link' onClick={() => {gtag.event({action:"gotocontact",category:"General_navigation",label:"test",value:0}); }} href="/contact">Contact</a>
            <a className='footer_link' href="/privacy-policy">Privacy Policy</a>
            <a className='footer_link' href="/terms-and-conditions" >Algemene Voorwaarden</a>


        </div>
    

    <div className="social_information_container">
        <div className="social_titel">sociale media</div>    
        <div className="social_icon_container">
                      <a
                        href={data.Contact.facebook} target="_blank">
                        <FaFacebookF className='footer_icon_social' />
                      </a>
                      <a href={data.Contact.instagram} target="_blank">
                        <FaInstagram className='footer_icon_social'/>
                      </a>
                      <a href={data.Contact.youtube} target="_blank">
                        <FaYoutube className='footer_icon_social'/>
                      </a>
                      <a href={data.Contact.linkedin} target="_blank">
                        <FaLinkedin className='footer_icon_social'/>
                      </a>

                      {/* <a href={data.Contact.twitter} target="_blank">
                        <FaTwitter className='footer_icon_social'/>
                      </a> */}
                
                      
        </div>
    </div>        
</div>


            {/* <div className="discover_img_container">
                <img src={'/img/landing_page/discover.jpg'} className='discover_img'  />
                    <div className="discover_text_container">
                        <div className="discover_text">Leg je eerste herinnering vast</div>
                        <div className="discover_btn">Ontdek Aeterna</div>
                    </div>
                </div> */}

            
        </div>
    )
}

export default Footer
