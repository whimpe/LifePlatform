import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import JsonData from '../../../assets/error_text.json';
import { useMeQuery } from '../../generated/graphql';
import { STATUS } from '../../types';
import { isServer } from '../../utils/isServer';
import { useGetStringFromUrl } from '../../utils/useGetIntFromUrl';
import { WithApollo } from '../../utils/withApollo';


interface NoAuthorsAllowedModalProps {
    active: boolean; 
    setactive:any;
    link:string;
    error_type:keyof typeof JsonData;
  }
  

export const NoAuthorsAllowedModal: React.FC<NoAuthorsAllowedModalProps> = ({active, setactive,link,error_type }) => { 
    const public_token = useGetStringFromUrl("public_token");
    const router = useRouter()
    const [open, setOpen] = useState(active);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setactive(false);        
      setOpen(false);
    };

    const { data: meData, loading: meloading } = useMeQuery({
        variables: {
          paginaId: public_token,
        },
        skip: isServer(),
      });

      if(meloading){
        return (<>..laden</>)
      }
    
      if(meData?.me?.status===undefined){
        return (<></>)
      }

  return (
    <div>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="alert-dialog-title">{JsonData[error_type].title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {JsonData[error_type].text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={(e:any)=>{handleClose();router.back();}} color="primary">{JsonData[error_type].btn_left}</Button>
            {meData.me.status >= 4 ? <Button onClick={(e:any)=>{handleClose();router.push(link);}} color="primary">{JsonData[error_type].btn_right}</Button>:null}
             </DialogActions>
      </Dialog>
    </div>
  );
}
export default WithApollo({ ssr: false })(NoAuthorsAllowedModal);
