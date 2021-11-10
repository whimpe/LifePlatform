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
import { AiOutlineHome, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { BiBookHeart, BiHome, BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { GoSettings } from 'react-icons/go';
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

  interface Navbar_mobileProps {
    meData: any;
    uitloggen:any;
    public_token:string;
    OpenLoginModal:any;
  }
  
  export const Navbar_mobile: React.FC<Navbar_mobileProps> = ({meData,uitloggen,public_token,OpenLoginModal}) => {
    
    const classes = useStyles();
    const router = useRouter();

    const [state, setState] = useState({top: false, left: false, bottom: false, right: false,});
    
      const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
      ) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
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



        {meData.me? 
        <>
        {/* WITH LOGIN */}
        {meData.me.status>=4  ?
          <div onClick={(e:any)=>router.push(`/PLATFORM/${public_token}/settings`)}>
              <ListItem button key={'Paginabeher'}>
                <ListItemIcon><GoSettings /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Paginabeheer'} />
              </ListItem>
              </div>
        :null}

            <div onClick={()=>router.push("/account")} >
              <ListItem button key={'Levensverhalen'}>
                <ListItemIcon><BiBookHeart /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Levensverhalen'} />
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

              <div onClick={()=>router.push("/edit-account")} >
              <ListItem button key={'Wijzig account'}>
                <ListItemIcon><AiOutlineUser /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Wijzig account'} />
              </ListItem>
              </div>
              <div onClick={(e:any)=>{uitloggen()}} >
              <ListItem button key={'uitloggen'}>
                <ListItemIcon><BiLogOut /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Uitloggen'} />
              </ListItem>
              </div>
              <Divider />
              <div onClick={(e:any)=>{router.push("/")}} >
              <ListItem button key={'Hoofdmenu'}>
                <ListItemIcon><BiHome /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Hoofdmenu'} />
              </ListItem>
              </div>
          </>
          :
          <>
          {/* WITHOUT LOGIN */}
          <div onClick={()=>OpenLoginModal(true)} >
              <ListItem button key={'Inloggen'}>
                <ListItemIcon><AiOutlineUser /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Inloggen'} />
              </ListItem>
              </div>
              <div onClick={()=>OpenLoginModal(false)} >
              <ListItem button key={'Registreren'}>
                <ListItemIcon><AiOutlineUser /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Registreren'} />
              </ListItem>
              </div>
              <div onClick={(e:any)=>{router.push("/")}} >
              <ListItem button key={'Hoofdmenu'}>
                <ListItemIcon><BiHome /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Hoofdmenu'} />
              </ListItem>
              </div>
          </>}


       
              
          </List>

       
        </div>


      );
    



      return (
            <React.Fragment key={'right'}>
               <div onClick={toggleDrawer('right', true)} > <AiOutlineMenu className='nav_dashboard_menu_icon' /></div>
              <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                {list('right')}
              </Drawer>
            </React.Fragment>
  
      )

}

export default Navbar_mobile
