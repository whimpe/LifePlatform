import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
// convention in next js that the []-part of the route is going to be variable
// in order to enable variable's in url
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MeDocument, MeQuery, useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import { WithApollo } from "../../utils/withApollo";
import JsonData from "../../components/landing_page/data/data.json";
import { MdLock } from "react-icons/md";

const ChangePassword: NextPage<{ token: string }> = ({token}) => {
  
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <>
   <Flex
    flexDir="column"
    width={["100%"]}
    marginX="auto"
    alignContent="center"
    align='center'
     mt={35}
  >
        <div className='nav_logo_big' onClick={()=>{router.push(`/`)}}>
                aeterna    
                </div>      
        <Formik
          initialValues={{ newPassword: "" , newPassword2: ""  }}
              onSubmit={async (values, { setErrors }) => {
                    if(values.newPassword !== values.newPassword2){alert('Uw wachtwoorden moeten overeenkomen.')
                    }else{
                    const response = await changePassword({
                      variables: {
                        newPassword: values.newPassword,
                        token:
                          typeof router.query.token === "string"
                            ? router.query.token
                            : "",
                      },
                  
                    });
                    if (response.data?.changePassword===false) {                    
                        router.push("/forgot-password")   
                    } else if (response.data?.changePassword ===true) {
                      alert("Wachtwoord is vernieuwd");
                      router.push("/account");
                    }
              }}}

        >
          {({ setFieldValue,isSubmitting }) => (
            <Form>          
            <div className="login_label"> Vul uw nieuw wachtwoord in:</div>
              <div className="login_input_box" onClick={()=>document.getElementById('newPassword')?.focus()} > <MdLock className="input_login_icon" /> <input name="newPassword" id='newPassword' placeholder="Nieuw wachtwoord" className="login_input_field" type="password" onChange={(e: any) => setFieldValue('newPassword',e.target.value)} ></input> </div>

              <div className="login_label"> Herhaal nieuw wachtwoord:</div>
              <div className="login_input_box" onClick={()=>document.getElementById('newPassword2')?.focus()}> <MdLock className="input_login_icon" /> <input name="newPassword2" id='newPassword2' placeholder="herhaal wachtwoord" className="login_input_field" type="password" onChange={(e: any) => setFieldValue('newPassword2',e.target.value)} ></input> </div>

                      
              <Flex align='center' flexDir='column' mt={10}>
                <button className='change_password_btn'   type= "submit">{isSubmitting ? 'laden...':'Stel nieuw wachtwoord in'}</button>
              </Flex>

              <a href={'/forgot-password'}>Indien uw aanvraag meer dan 3 dagen geleden is klik hier.</a>

            </Form>
          )}
          </Formik>
      </Flex>
     </>
  );
  }

  ChangePassword.getInitialProps= ({query}) => {
  return{
    token:query.token as string
  }
}

export default WithApollo({ ssr: true })(ChangePassword);

