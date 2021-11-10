import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { useDeleteMediaMutation } from '../../generated/graphql';
import { WithApollo } from '../../utils/withApollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface RemoveModalProps {
    public_token:string;
    Modalclick: boolean;
    setmodalclick:any;
    title:string;
    media_id:string
  }

export const RemoveModal: React.FC<RemoveModalProps> = ({ public_token,Modalclick, setmodalclick,title,media_id }) => {

    const [deleteMediaHerinnering] = useDeleteMediaMutation();

      const remove_media = async (e:any,id:string)=>{
      const delete_media = await deleteMediaHerinnering({
        variables: { id,paginaId: public_token, },
        update: (cache: any) => {
          cache.evict({ id: "MediaHerinnering:" + id });
        },
      });    
      await location.reload();
  }



    return (
        <>



      <Dialog
        open={Modalclick}
        onClose={(e:any) => {setmodalclick(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Media verwijderen</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setmodalclick(false)} color="primary">
            Annuleren
          </Button>
          <Button onClick={(event: any) => remove_media(event,media_id)} color="primary" autoFocus>
            Media verwijderen
          </Button>
        </DialogActions>
      </Dialog>



   


        </>
    )
};
export default WithApollo({ ssr: false })(RemoveModal);





