import { Box,Flex,Image , Link} from '@chakra-ui/core';
import path from 'path';
import React, { useState } from 'react'
import { BsArrowsFullscreen } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useGetStringFromUrl } from '../../utils/useGetIntFromUrl';

interface MediaDisplayProps {
    awsUrl?: string
    width?:string
    type?:string
    designclass?:string;
    memory_id?:string;   

    
}

export const MediaDisplay: React.FC<MediaDisplayProps> = ({awsUrl,width,type,designclass,memory_id}) => {

        if(!awsUrl){ return(null); }
        let extName = path.extname(awsUrl).split('.')[1];      
        if(extName==='quicktime' || extName==='mov'){ extName='mp4'; }
        if(type === 'audio'){
          return(                      
                <audio controls className='audio_controls' >
                    <source src={awsUrl} type={`audio/${extName}`} />
                </audio>              
        )}
        

        if(type === 'video'){
          return(
                <div className="video_mediadisplay" >
                  <video width={width} controls className={designclass} preload={'metadata'}>
                    <source src={awsUrl} type={`video/${extName}`}   />
                  </video>
                </div>
        )}
        if(type === 'video_static'){
          return(
                <div className="video_mediadisplay" >
                  <video width={width} className={designclass} controls muted preload={'metadata'}>
                    <source src={awsUrl} type={`video/${extName}`}   />
                  </video>
                </div>
        )}


        
        if(type === 'image'){
          return(            
                <img src={awsUrl} id={memory_id} width={width} className={designclass} />
        )}
        
      return(
      // TO DO: default media
      <> </>
      )
    }