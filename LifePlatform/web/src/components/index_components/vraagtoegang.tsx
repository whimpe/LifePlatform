import { createMuiTheme, makeStyles, TextareaAutosize, } from '@material-ui/core';
import React, { useState } from 'react'
import { BiMailSend } from 'react-icons/bi';
import { RiHandHeartLine } from 'react-icons/ri';
import { useCreateAccesRequestMutation } from '../../generated/graphql';
import ErrorModal from '../modal_components/ErrorModal';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FaBookOpen } from 'react-icons/fa';

interface VraagtoegangProps {
    public_token: string;
    shareable:boolean;
    username_requestor:string;
    name_of_page?:string;
}


export const Vraagtoegang: React.FC<VraagtoegangProps> = ({public_token,shareable,username_requestor,name_of_page}) => {
        
    
  const [request_access_view, setrequest_access_view] = useState(false)
    const [requestAcces] = useCreateAccesRequestMutation();
    let [RequestText, setRequestText] = useState(`Aanvraag indienen in naam van ${username_requestor}. `);
    const [Status, setStatus] = useState<string | null>('familie');

    let handleInputChange = (e: any) => { setRequestText(e.target.value); };
    const handleStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string | null) => { setStatus(newStatus) };    

    console.log(public_token,shareable,username_requestor);
    const [Error_value, setError_value] = useState(false);
    const [Error_type, setError_type] = useState('default_error');


    const useStyles = makeStyles({
      root: { /* … */ },
      label: { /* … */ },
      outlined: {
        /* … */
        '&$disabled': { /* … */ },
      },
      selected: {
        backgroundColor:'#fff',
        '&:hover': { /* … */ },
      },
      disabled: {},
    }, { name: 'ToggleButton' });


    if(shareable){
      return (

            
      <>
        <div className="ask_permission_box">

        {request_access_view?
          <>   
              <div className='no_account_title'>{`Toestemming aanvragen als ${username_requestor}: `}</div>
          
              {/* <ToggleButtonGroup value={status} exclusive onChange={handleStatus} aria-label="Relatie met dierbare:"   >
                <ToggleButton classes={{label:'toggle_button'}} value="left" aria-label="familie"> familie </ToggleButton>
                <ToggleButton classes={{label:'toggle_button'}} value="center" aria-label="vrienden"> vrienden </ToggleButton>
                <ToggleButton classes={{label:'toggle_button'}} value="right" aria-label="kennissen"> kennissen </ToggleButton>              
              </ToggleButtonGroup> */}

              <div className='no_account_title'>{`Persoonlijke boodschap: `}</div>

            <TextareaAutosize className="ask_permission_text" aria-label="empty textarea" 
                              placeholder='' value={RequestText} onChange={(e:any)=> {handleInputChange(e)}} />

              <div className="index_btn_container" > 
                <div className='index_btn_small'  
                    onClick={async () => {
                      try{
                        await requestAcces({ variables: { requesttext: `${RequestText} + ${Status}`, paginaId: public_token, requestor_username:username_requestor, }, });
                        window.location.reload();
                      }catch(error:any){
                        setError_value(true);
                        setError_type("max_authors");
                      }
                      
                  }}
                > <BiMailSend className='index_icon_btn'  />Versturen </div>
                </div>
          {/* TODO: ook hier is de link niet ideaal -> zou moeten kunnen teruggan naar home ofzo */}
          {Error_value ? <ErrorModal  active={Error_value} setactive={setError_value} error_type={Error_type}  link={`/account`}/> :null}
      
        </>
        :
        <div className="index_btn_container" > 
          <div className='index_btn_small' onClick={(e:any) => {setrequest_access_view(!request_access_view)}} > <FaBookOpen className='index_icon_btn'  />Herinneringen herbeleven </div>
         </div>
        
        
        
        }
      </div>   
      </>
      );
      
    }
    else{
      return (
      <>
        <p className='no_account_title'>De pagina is enkel zichtbaar voor de beheerder.</p>
      </> 
      )
    }


       
}