import { Button, Flex, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from "react";
import { FiMail } from 'react-icons/fi';
import { MdLock } from 'react-icons/md';
import { useForgotPasswordMutation } from "../generated/graphql";
import { WithApollo } from "../utils/withApollo";

const ForgotPassword: React.FC<{}> = ({}) => {

  const [complete, setComplete] = useState(false);
  const [email, setemail] = useState('');
  
  const [forgotPassword,] = useForgotPasswordMutation();

  const result =()=>{  
    forgotPassword({variables :{email:email}});
    setComplete(true);
  }

  console.log(email);
  
  return (
    <>
    {/*  <Flex
    // flexDir="column"
    // width={["100%"]}
    // marginX="auto"
    // alignContent="center"
    // align='center'
    //  mt={35}>

        <a href="/"><img alt="stack overflow"   className="logo_img_login" src={JsonData.Failure.img}></img></a> */}
              
    
        {complete ? (
            
            <Text mb="8px" mt={20} fontSize='14px' textAlign='center'> 
            Wij hebben u een email verzonden met een reset link voor uw wachtwoord.            
            </Text>
          ) : (

              <>
          <Flex
            flexDir="column"
            width={["100%",'70%','50%']}
            marginX="auto"
            alignContent="center"
            align='center'
            mt={35}
            
          >
          <div className="login_label"> Vul uw emailadres van uw account in:</div>
              <div className="login_input_box">           
                <FiMail className="input_login_icon" />
                <input
                 name="newPassword"
                 placeholder="Emaliadres"
                  className="login_input_field"
                  type="text"
                  onChange={(e: any) => setemail(e.target.value)}
                ></input>
                
              </div>
        
             
              <button className='change_password_btn' type= "submit" onClick={(e:any)=>result()}>Nieuw wachtwoord aanvragen</button>
              </Flex>

              </>
          )
        }
  </>
  );
};

export default WithApollo({ ssr: true })(ForgotPassword);
