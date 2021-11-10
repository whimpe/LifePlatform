import { Box, Flex, Spinner } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { BsFillLockFill } from "react-icons/bs";
import Navbar_LP from "../components/landing_page/Navbar_LP";
import { useMeQuery, useRequestToVerifyAccountMutation, useUpdatePasswordMutation, useUpdateUserMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useIsLogin } from "../utils/useIsLogin";
import { WithApollo } from "../utils/withApollo";


import * as gtag from "../utils/googleanalytics/gtag";
export const EditAccount: React.FC<{}> = ({}) => {
    
    useIsLogin();
    const router = useRouter();
    const { data: meData, loading: Meloading, error: MeError } = useMeQuery({
      skip: isServer(),
      // we only want this query to run when in the browser!
    });


    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [old_pass, setold_pass] = useState("")
    const [new_pass, setnew_pass] = useState("")
    const [new_pass2, setnew_pass2] = useState("")
    const [view_pass, setview_pass] = useState(false)


    const [updateUser] = useUpdateUserMutation();
    const [updatePassword] = useUpdatePasswordMutation();    
    const [PasswordBtn, setPasswordBtn] = useState(false);
    const [requestToVerifyAccount] = useRequestToVerifyAccountMutation();
    
    if(Meloading){
      return (<CircularProgress color="primary"  />);
    }
    if(meData?.me?.user?.email===undefined){
      return (<></>)
    }

    const SendVerifyEmail = (verified:boolean,email_input:string) =>{
      if(verified){
        alert("U heeft uw email al bevestigd")
      }else{      
      alert(" Een bevestigings email is verzonden naar uw e-mailadres.")
      gtag.event({action:"verifyAccount",category:"User",label:"user",value:0});
      requestToVerifyAccount({variables: { email: email_input }});
      //send email with verify code
      }
    }


    return (
        <>
        <Navbar_LP   PaginaData={null} share_btn={false} />
       
          <Formik
            initialValues={{username: meData?.me?.user?.username, email : meData?.me?.user?.email ,new_pass:"",new_pass2:"",old_pass:""}}
            onSubmit={async (values) => {

            let response=null; 
            let response1=null; 
            let response2=null; 
            response = await updateUser({ variables: { username: values.username, email: values.email } , });
            response1 = response?.data?.updateUser;

            if(PasswordBtn && (values.new_pass!=="")) {           
                response = await updatePassword({ variables: {oldpassword: values.old_pass, newPassword:values.new_pass }, });     
                response2 = response?.data?.UpdatePassword;   
              }else if(response1===true){
                alert("Uw account is gewijzigd");
                router.push(`/account`);              
            }     

            if (!response2) {              
                alert("Uw oud wachtwoord is niet correct ");           
            }       
            if(response1 )   
            if(response1 && response2){
              alert("Uw account is gewijzigd");
              router.push(`/account`);              
            } }}>

        {({ isSubmitting,setFieldValue,values }) => (

          <Form>
              <Box  mt={25} pb={125}>
            <div className="flashcard_title">Wijzig Account gegevens  </div>    
                <button type='submit' className='edit_account_submit_btn' ><BiSave className='edit_personal_message_btn_icon'/>{isSubmitting ? 'laden':'Wijzigingen opslaan'}</button>
 

                <div className="edit_account_text_container">   
                <div className="flashcard_label">Voor- en Achternaam</div>   
                  <input type='text' value={values.username} onChange={(event:any)=>setFieldValue('username',event.target.value)} className='edit_account_input' />     
                <div className={meData?.me?.user?.account_status===0 ?'edit_account_label_fail' :'edit_account_label_succes'}> {meData?.me?.user?.account_status===0 ? 
                  <div onClick={(e:any)=> SendVerifyEmail(false,values.email)}>Email nog niet bevestigd - klik hier </div>: <div onClick={(e:any)=> SendVerifyEmail(true,values.email)}>E-mailadres bevestigd </div>}
                  </div>  

                <input type='text' value={values.email} onChange={(event:any)=>setFieldValue('email',event.target.value)} className='edit_account_input'/>

              </div>

            {PasswordBtn ?
                <div className="edit_account_text_container">   
                  <div className="flashcard_label">Oud wachtwoord</div>  
                  
                            <input type='password' value={values.old_pass} onChange={(event:any)=>setFieldValue('old_pass',event.target.value)} className='edit_account_input' />                                  
                  <div className="flashcard_label">Nieuw wachtwoord   <AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)}/>  </div>  

                  <div className="edit_account_input_box"> 
                            <input type={view_pass ? "text" :"password"} value={values.new_pass} onChange={(event:any)=>setFieldValue('new_pass',event.target.value)} className='edit_account_input' />
                           
                            </div>                                  
                  <div className="flashcard_label">Herhaal Nieuw wachtwoord   <AiFillEye className='view_password_icon' onClick={()=>setview_pass(!view_pass)} />  </div>   
                  <div className="edit_account_input_box">
                            <input type={view_pass ? "text" :"password"} value={values.new_pass2} onChange={(event:any)=>setFieldValue('new_pass2',event.target.value)} className='edit_account_input' />
                    </div>                                                                    
                  {/* <button type='submit' className='edit_personal_message_btn' onClick={()=>setPasswordBtn(false)}><BiSave className='edit_personal_message_btn_icon'/>Oud</button> */}
                </div>

         
            :
                <button type='submit' className='edit_personal_message_btn' onClick={()=>setPasswordBtn(true)}><BsFillLockFill className='edit_personal_message_btn_icon'/>{isSubmitting ? 'laden':'Wachtwoord vernieuwen'}</button>

                }

            </Box>

          </Form>



        )}
      </Formik>


        </>
    )
}

export default WithApollo({ ssr: false })(EditAccount);




