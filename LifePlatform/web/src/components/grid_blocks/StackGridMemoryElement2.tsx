import { Badge, Button, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { BsCardImage, BsEnvelope, BsFileText, BsFillLockFill, BsImages } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Herinnering } from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";
import {theme_aeterna} from "../../pages/_app";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);



const styles = (theme_aeterna:any) => ({
  lightColor: {
    color: theme_aeterna.palette.primary.light // or theme.palette.primary.main
  } 
})



  interface StackGridMemoryElement2Props {
    herinnering: Herinnering;
  }
  
  const StackGridMemoryElement2: React.FC<StackGridMemoryElement2Props> = ({
    herinnering: herr,
  }) => {
  
    const public_token = useGetStringFromUrl("public_token");
    const router = useRouter();
    const classes = useStyles();


    if(herr.status===undefined|| herr.status===null){
      return (<></>);
    }

  
    return (

  <>
     <div key={herr.id} className='stackgrid_memory_box' >   
     

            {!herr.media[0] ? null : (
                <>
                <div className="memory_grid_image">
                  {herr.media[0].mediaType ==='video' ?
                    <MediaDisplay awsUrl={herr.media[herr.media.length-1].urlFile} width={'100%'} type={'video_static'}  />                                                    
                    :<MediaDisplay awsUrl={herr.media[herr.media.length-1].urlFile} width={'100%'} type={herr.media[herr.media.length-1].mediaType} designclass={'memory_grid_image'}  /> }                    
                    <div className="gradient_bottom_high"></div>                    

                    {/* <div className="text_on_image">test</div> */}
                    <div className='memory_textpreview_box'>          
                      <div className="memory_title_box"> <div className='memory_title'> {herr.title}</div> </div>
                      {/* <div className="memory_text_box"> <div className='memory_text'>{!herr.media[0] ? <>{herr?.text?.slice(0,200)}{''}</>: <>{herr?.text?.slice(0,300)}{''}</> }</div></div> */}
                    </div>


               </div>


                </>
                )}   

                <div className="notification_memory_box">
                  {herr.status>=3 ? 
                  <Tooltip                
                    title="Deze herinnering staat prive. Klik op de herinnering en ga naar wijzigen om publiek te maken"
                    aria-label="Deze herinnering staat prive. Klik op de herinnering en ga naar wijzigen om publiek te maken"
                    placement="top"
                    color="white">

                  <div  className='notification_memory_icon'> <BsFillLockFill  /></div>
                  </Tooltip>
                  :null}

                 {/*  {herr.media.length>0 ?<div className='notification_memory_icon' > {herr.media.length}  <BsImages /> </div>:null}
                  {herr.comments.length>0 ? <div className='notification_memory_icon' >  {herr.comments.length}<BsEnvelope  /> </div>:null} */}

                </div>

          
            {/* text and features of memory */}
            {/* <div className='memory_textpreview_box'>          
              <div className="memory_title_box"> <div className='memory_title'> {herr.title}</div> </div>
              <div className="memory_text_box"> <div className='memory_text'>{!herr.media[0] ? <>{herr?.text?.slice(0,800)}{''}</>: <>{herr?.text?.slice(0,300)}{''}</> }</div></div>
        

              <div className="memory_item_btn_container">
                <div className="memory_item_btn" onClick={()=>router.push(`/PLATFORM/${public_token}/memory/${herr.id}`)}>Bekijk het Verhaal</div>  

            </div>
 */}

        </div>


</>
  
    );
  };
  
  export default WithApollo({ ssr: false })(StackGridMemoryElement2);

