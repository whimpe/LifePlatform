import React from 'react';
import { GrClose } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { useDeleteHerinneringMutation, useDeleteMediaMutation } from '../../generated/graphql';
import { WithApollo } from '../../utils/withApollo';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRouter } from 'next/router';

interface RemoveMemoryModalProps {
    public_token:string;
    Modalclick: boolean;
    setmodalclick:any;
    memory_id:string
  }

export const RemoveMemoryModal: React.FC<RemoveMemoryModalProps> = ({ public_token,Modalclick, setmodalclick,memory_id }) => {
  const router = useRouter();
  const [deleteHerinnering] = useDeleteHerinneringMutation();

    let remove_memory = async (event: any) => {
      await deleteHerinnering({
        variables: { id: memory_id, paginaId: public_token },
        update: (cache) => {
          cache.evict({ id: "Herinnering:" + memory_id });
        },
      });
      await router.push(`/PLATFORM/${public_token}/memories`);
    };


    return (
        <>

      <Dialog
        open={Modalclick}
        onClose={(e:any) => {setmodalclick(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Herinnering verwijderen</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'Bent u zeker dat u deze herinnering wenst te verwijderen?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setmodalclick(false)} color="primary">
            Annuleren
          </Button>
          <Button onClick={(event: any) => remove_memory(event)} color="secondary" autoFocus>
            Herinnering verwijderen
          </Button>
        </DialogActions>
      </Dialog>

      </>
    )
};
export default WithApollo({ ssr: false })(RemoveMemoryModal);





