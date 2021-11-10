import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { ErrorModal } from "../../../components/modal_components/ErrorModal";
import { MAX_AMOUNT_OF_CONDOLANCES_BASIC, MAX_AMOUNT_OF_CONDOLANCES_FREE, PAYMENT_PLAN } from "../../../constants";
import {
  useCreateCondolatieMutation,
  useCreateMediaCondolatieMutation,
  useHerdenkingspaginaQuery
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { createMediaFunction } from "../../../utils/upload_functions/createAndUploadMedia";
import { MUTIPLE_UPLOAD } from "../../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";
import JsonData from '../../../../assets/error_text.json';
import { CircularProgress } from "@material-ui/core";
import { STATUS } from "../../../types";


interface CreateCondolanceProps {
  setclick: any; 
}


export const CreateCondolance: React.FC<CreateCondolanceProps> = ({setclick}) => {
  const public_token = useGetStringFromUrl("public_token");



  const { data: PaginaData, loading: paginal } = useHerdenkingspaginaQuery({
    skip: isServer(),
    variables: {
      paginaId: public_token
    }
    
  });

  const router = useRouter();
  useIsAuth(STATUS.Pending, true);  
  
  const [createCondolance] = useCreateCondolatieMutation();
  const [createMediaCondolance] = useCreateMediaCondolatieMutation(); 

  const [mutateUpload, { loading, error, data }] = useMutation(MUTIPLE_UPLOAD);
  let handleInputChangeText = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const maxNumber = 50;
  let [valueText, setValue] = useState("");
  const [files_raw, setfiles_raw] = useState<Array<any> | any>([]);  
  const [aantal, setaantal] = useState(0);
  const [totalMB, settotalMB] = useState(0);
  const [allowSend, setallowSend] = useState(true);
  const [Error_value, setError_value] = useState(false);
  const [Error_type, setError_type] = useState<keyof typeof JsonData>('default_error');
  const [Isloading, setIsloading] = useState(false)

  let handleChangeAantal = async (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {      
      files_raw.push(event.target.files[i]);
      console.log(event.target.files[i]);
      settotalMB(totalMB + event.target.files[i].size);
      if (totalMB > 100000000) {       
        files_raw.pop();
        alert("uw media bestanden zijn te groot voor deze herinnering");
      }
    }

    setaantal(aantal + event.target.files.length);
  };

  let removeItem = (name: any, files_pre_index: any) => {
    files_raw.filter((item: any) => settotalMB(totalMB - item.size));
    setfiles_raw(files_raw.filter((item: any) => item.name !== name));   
   
    if (totalMB < 100000000) {
      setallowSend(true);
    }
  };
  

  //TODO: component voor maken?
  if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Free ){
    if (PaginaData?.herdenkingspagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_FREE) {
      return (<div>{"Kan geen condolaties meer toevoegen, limiet is bereikt"}</div>);
    }
  }
  if(PaginaData?.herdenkingspagina?.Payment_plan === PAYMENT_PLAN.Basic ){
    if (PaginaData?.herdenkingspagina.number_of_condolances >= MAX_AMOUNT_OF_CONDOLANCES_BASIC) {
      return (<div>{"Kan geen condolaties meer toevoegen, limiet is bereikt"}</div>);
    }
  }


  const condolance_submit= async()=> {
    setIsloading(true);
    try{
      const condolance = await createCondolance({variables: { input: { text: valueText }, paginaId: public_token },
      update: (cache) => {
        cache.evict({ fieldName: "condolaties" });
      },
    
    });

    try {
      const response = await createMediaFunction(files_raw , public_token, "condolatie",condolance.data!.createCondolatie.id, mutateUpload,createMediaCondolance);
    }catch(err){
      console.log("error while adding mediaHerinneringen",err)
      setIsloading(false);

    }

    if(condolance.errors){
      console.log("errors",condolance.errors)
    }else {
      setIsloading(false);
      await router.push(`/PLATFORM/${public_token}/condolances`);
      setclick(false);
    }
   }catch(error:any){
    setError_type(error.message)
    setError_value(true)
    setIsloading(false);

}
} 


  return (
  <>
          <div className="share_condo_container">
            <div className="share_condo_title">Laat een condolatie achter</div>
            <textarea className="share_condo_text_area" placeholder='Uw boodschap...' value={valueText} onChange={(e:any)=>{setValue(e.target.value)}} ></textarea>

            {/* <div className="flashcard_text_container">   
                <div className="flashcard_label"> Of vertel een mooi verhaal </div> 
                <div className="flashcard_upload_btn_container">
                  <label htmlFor="upload-photo"> <div className='flashcard_upload_btn'><HiOutlinePhotograph className='flashcard_upload_icon_btn' />Foto</div> </label>
                  <label htmlFor="upload-video"> <div className='flashcard_upload_btn'><BsCameraVideo className='flashcard_upload_icon_btn'/>Video</div></label>
                  <label htmlFor="upload-audio"> <div className='flashcard_upload_btn'><HiOutlineMicrophone className='flashcard_upload_icon_btn'/>Audio</div> </label>
                </div>
              </div>  */}
          


                <input
                  type="file"
                  name="photo"
                  accept="image/*"                  
                  id="upload-photo"
                  style={{ display: "none" }}
                  onChange={(event: any) => {                                
                    handleChangeAantal(event);
                  }}
                />

              <button type="submit" className="send_message_btn" onClick={(e:any)=> condolance_submit()}> { Isloading ? <CircularProgress color="secondary"  size={30}/> :'Condolatie Verzenden'}<BiSend className="send_message_btn_icon" /> </button>      
            </div>

            {Error_value ?            
             <ErrorModal  active={Error_value} setactive={setError_value} error_type={Error_type} link={`/PLATFORM/${public_token}/settings`}/>
             :null}
  
  </>
  );
};

export default WithApollo({ ssr: false })(CreateCondolance);


     {/* </Form> */}
        // )}
      {/* </Formik> */}