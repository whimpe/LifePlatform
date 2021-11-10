import React, { createRef, useState } from "react";
import {FaFolderOpen} from "react-icons/fa";
import Icon from '@material-ui/core/Icon'
import { RiCollageLine, RiGroupFill } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { FcMultipleInputs, FcTimeline } from "react-icons/fc";
import { MdContacts } from "react-icons/md";
import { Box } from "@chakra-ui/core";
import JsonData from '../../../assets/static_text.json';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";




interface SlideshowProps {
    data: any;
  }
  
export const Slideshow: React.FC<SlideshowProps> = ({data}) => {

    

  

    return (

<>



<div className="slideshow_background">

    <div className="slideshow_text_container">
        <div className="slideshow_text">
            Met ons online platform overkom je de problemen die je hebt bij het fysiek verzamelen van herinneringen. <b>Één plek waar je foto’s, video’s en audiofragmenten bewaard</b> om jouw herinneringen nieuw leven in te blazen.

        </div>        
    </div>

    <div className="slideshow_navigation_container">
        <a href="#slide-1" className='slideshow_navigation_btn'>welkomspagina</a>
        <a href="#slide-2" className='slideshow_navigation_btn'>tijdljn</a>
        <a href="#slide-3" className='slideshow_navigation_btn'>herinnering</a>
        <a href="#slide-4" className='slideshow_navigation_btn'>boodschappen</a>
        <a href="#slide-5" className='slideshow_navigation_btn'>herinnering in detail</a>
        <a href="#slide-6" className='slideshow_navigation_btn'>paginabeheer</a>

    </div>

    <div className="slideshow_container">

        <div className="slider">

        <div className="slides">

            <div id="slide-1">
            <img src={'/img/slideshow/welcome.png'} className='slideshow_img'/>
            </div>
            <div id="slide-2">
                <img src={'/img/slideshow/timeline.png'} className='slideshow_img'/>

            </div>
            <div id="slide-3">
                <img src={'/img/slideshow/memory_detail.png'} className='slideshow_img'/>

            </div>
            <div id="slide-4">
                <img src={'/img/slideshow/boodschappen.png'} className='slideshow_img'/>

            </div>
            <div id="slide-5">
            <img src={'/img/slideshow/zoom_boodschappen.png'} className='slideshow_img'/>

            </div>
            <div id="slide-6">
            <img src={'/img/slideshow/auteurs.png'} className='slideshow_img'/>
            </div>

        </div>
        </div>


    </div>
</div>

  






</>


    );
  }


export default Slideshow;
