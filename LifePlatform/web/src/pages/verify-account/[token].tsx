import { NextPage } from "next";
import { useRouter } from "next/router";
import { default as React, useEffect, useState } from "react";
import { BsFillLockFill, BsPersonCheckFill } from "react-icons/bs";
import { useChangePasswordMutation, useLoginMutation, useVerifyAccountMutation } from "../../generated/graphql";
import { useIsLogin } from "../../utils/useIsLogin";
import { WithApollo } from "../../utils/withApollo";


const VerifyAccount: NextPage<{ token: string }> = ({token}) => {
  

    useIsLogin();
    const router = useRouter();
    const [verify_result] =  useVerifyAccountMutation({variables: { token: `VERIFY_ACCOUNT${token}` }});
    const [tokenError, setTokenError] = useState("");


  
     const [mobMenu, setmobMenu] = useState(false);
  


    
    const account_verification = async () =>{
        const result = await verify_result()
        if(result.data?.verifyAccount===true){
            alert('uw account is geverifieerd')                        
            await router.push('/account');
        }
        else if(result.data?.verifyAccount===false){
         alert('uw verificatie link is verlopen probeer het opnieuw in account beheer')   
        }

    }

    useEffect(() => {
        account_verification()
        return () => {            
        }
    }, [])

  
  return (
    <>
        <div className="flashcard_title">Verifieer uw account   </div>     
        <div className="edit_account_text_container">
        <div className="verify_label"> Klik hieronder om uw account te verifieren </div>   
            <button type='submit' className='edit_personal_message_btn' onClick={()=>account_verification()}><BsPersonCheckFill className='edit_personal_message_btn_icon'/>Account Verifieren</button>
        </div>
     </>
  );
  }

  VerifyAccount.getInitialProps= ({query}) => {
  return{
    token:query.token as string
  }
}




export default WithApollo({ ssr: true })(VerifyAccount);

