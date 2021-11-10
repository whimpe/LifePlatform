import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { HiMail } from 'react-icons/hi';
import { AiOutlineMenu, AiOutlineUser,AiOutlineHome } from 'react-icons/ai';
import { BsChevronDown, BsCollection } from 'react-icons/bs';
import { BiBookHeart, BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import ShareModal from '../modal_components/ShareModal';
import { FaShare } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';

type Anchor = 'top' | 'left' | 'bottom' | 'right';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  interface Navbar_LP_mobileProps {
    meData: any;
    uitloggen:any;
    ShareModalClick:any;
    setShareModalClick:any;
    PaginaData:any;
  }
  
  export const Navbar_LP_mobile: React.FC<Navbar_LP_mobileProps> = ({meData,uitloggen,PaginaData,ShareModalClick,setShareModalClick}) => {
    
    const classes = useStyles();
    const router = useRouter();

    const [state, setState] = useState({top: false, left: false, bottom: false, right: false,});
    
      const toggleDrawer = (anchor: Anchor, open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent, ) => {
        if ( event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
      const list = (anchor: Anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {router.query.public_token ? 
            <div onClick={()=>router.push(`/PLATFORM/${router.query.public_token}`)} >
            <ListItem button key={'Naar Hoofdpagina '}>
              <ListItemIcon><BiBookHeart /> </ListItemIcon>
              <ListItemText primary={'Naar Hoofdpagina'} />
            </ListItem>
            </div>
            :null}          
            <div onClick={()=>router.push("/account")} >
              <ListItem button key={'Overzicht Levensverhalen'}>
                <ListItemIcon><BsCollection /> </ListItemIcon>
                <ListItemText primary={'Overzicht Levensverhalen'} />
              </ListItem>
              </div>
              
              {meData?.me?.partner_type! >=0 ? 
              <div onClick={()=>router.push("/dashboard")} >
              <ListItem button key={'Partner dashboard'}>
                <ListItemIcon><RiDashboardFill /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Partner dashboard'} />
              </ListItem>
              </div>
              :null}  

            <Divider />
              <div onClick={()=>router.push("/edit-account")} >
              <ListItem button key={'wijzig account'}>
                <ListItemIcon><AiOutlineUser /> </ListItemIcon>
                <ListItemText primary={'wijzig account'} />
              </ListItem>
              </div>
              <div onClick={(e:any)=>{uitloggen()}} >
              <ListItem button key={'uitloggen'}>
                <ListItemIcon><BiLogOut /> </ListItemIcon>
                <ListItemText primary={'uitloggen'} />
              </ListItem>
              </div>

              <Divider />


              <div onClick={()=>router.push("/")} >
              <ListItem button key={'Hoofdmenu'}>
                <ListItemIcon><AiOutlineHome /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Hoofdmenu'} />
              </ListItem>
              </div>
          </List>       
        </div>
      );
    


      return (
          <>
            <React.Fragment key={'right'}>
                
            {router.query.public_token ? <div onClick={()=>setShareModalClick(true)} className='nav_dashboard_share_icon_container' > <FaShare className='nav_dashboard_share_icon' /> Verhaal Delen </div>:null}
            <div onClick={toggleDrawer('right', true)} > <AiOutlineMenu className='nav_dashboard_menu_icon' /></div>
              <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
              </Drawer>
            </React.Fragment>
            
            
            <ShareModal ShareModalClick={ShareModalClick} setShareModalClick={setShareModalClick} name_of_page={PaginaData?.herdenkingspaginaprivatetoken?.name_of_page} public_link={`https://aeterna.be/PLATFORM/${PaginaData?.herdenkingspaginaprivatetoken?.id}`} private_link={`https://aeterna.be/PLATFORM/${PaginaData?.herdenkingspaginaprivatetoken?.private_token}`} />
            </>
  
      )
 
}

export default Navbar_LP_mobile
