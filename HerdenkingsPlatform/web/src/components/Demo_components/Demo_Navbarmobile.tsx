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
import { BsChevronDown } from 'react-icons/bs';
import { BiBookHeart, BiHome, BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { GoSettings } from 'react-icons/go';
import { useMeQuery } from '../../generated/graphql';

type Anchor = 'top' | 'left' | 'bottom' | 'right';


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  interface Demo_NavBar_mobileProps {    
    public_token:string;
  }
  
  export const Demo_NavBar_mobile: React.FC<Demo_NavBar_mobileProps> = ({public_token}) => {
    
    const classes = useStyles();
    const router = useRouter();

    const {
      data: meData,
      loading: MeLoading,
      error: Meerror,
    } = useMeQuery({ variables: { paginaId: public_token }});


    if(MeLoading){
      return(<div>loading</div>);
    }
      
  

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


        
          <div onClick={(e:any)=>router.push(`/VOORBEELD/${public_token}/settings`)}>
              <ListItem button key={'Paginabeheer'}>
                <ListItemIcon><GoSettings /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Paginabeheer'} />
              </ListItem>
              </div>
        

            <div onClick={()=>{              
              if(meData?.me?.user?.username){ router.push("/register") }else{
                router.push("/account")
              }
              }} >
              <ListItem button key={'Start nu je levensverhaal'}>
                <ListItemIcon><BiBookHeart /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Levensverhalen'} />
              </ListItem>
              </div>
              <div onClick={(e:any)=>{router.push("/")}} >
              <ListItem button key={'Hoofdmenu'}>
                <ListItemIcon><BiHome /> </ListItemIcon>
                <ListItemText className={'mobile_menu_text'} primary={'Hoofdmenu'} />
              </ListItem>
              </div>
          
         
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

export default Demo_NavBar_mobile
