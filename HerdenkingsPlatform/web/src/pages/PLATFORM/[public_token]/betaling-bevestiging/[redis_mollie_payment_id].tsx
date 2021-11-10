import React, { useEffect, useState } from "react";
import { Layout } from "../../../../components/general/Layout";
import { WithApollo } from "../../../../utils/withApollo";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import { Layout_LP } from "../../../../components/landing_page/Layout_LP";
import Navbar_LP from "../../../../components/landing_page/Navbar_LP";
import { useRouter } from "next/router";
import { useCheckBetalingQuery } from "../../../../generated/graphql";
import { useGetStringFromUrl } from "../../../../utils/useGetIntFromUrl";

// const { createMollieClient } = require('@mollie/api-client');
// const mollieClient = createMollieClient({ apiKey: 'test_6sydGNE55KufrebD2Rmjzc8AcFrnDB' });

const arr = ['De betaling is gelukt! U ontvangt een bevestigingsmail',
'De betaling is mislukt, en u zal opnieuw moeten proberen',
'Er is iets misgegaan bij de betaling, controleer bij instellingen als het termijn gestegen is']

var confirmation_message = (<div className="memory_id_title">{arr[0]}</div>);  


const Confirmation: React.FC<{ token: string }> = ({token}) => {

  const public_token = useGetStringFromUrl("public_token");
  const redis_mollie_payment_id = useGetStringFromUrl("redis_mollie_payment_id");

  const router = useRouter();
  const [checkpayment, setcheckpayment] = useState(false);
  const [payed, setpayed] = useState(false);

  const {data, loading,error} = useCheckBetalingQuery({
    variables:{
      redis_payment_mollie_id:redis_mollie_payment_id
    }
  })


if(loading){
  return ( <div><Flex align="center" justify="center"><Spinner size="xl" mt={30} color="#BDB487" /> </Flex></div>)

}


if(checkpayment=== false){
    console.log("resultaat checkbetaling" , data);
    if(data?.checkBetaling?.status==='paid'){
    
     confirmation_message=(<div className="memory_id_title">{arr[0]}</div>);
      alert('het is betaald');
      setcheckpayment(true);
      //email send
      
    }else if(data?.checkBetaling?.status==='not paid'){
      setpayed(false);
      confirmation_message=(<div className="memory_id_title">{arr[1]}</div>);
     alert('er is iets misgegaan,betaling mislukt, controleer bij instellingen als het termijn gestegen is');
      setcheckpayment(true);
      //failed pay message
    }else{
      confirmation_message=(<div className="memory_id_title">{arr[2]}</div>);
      setcheckpayment(true);
     alert('er is iets misgegaan,betaling mislukt');


    }
}




  return (
    <>
          <Layout>

          {confirmation_message}


         <div className='selection_options'>

        <div className='option_box'>
        <div className='option_title'>GA NAAR DE HOOFDPAGINA </div>  
          <div className='option_button' 
          onClick={()=> router.push(`/PLATFORM/${public_token}`)}>PAGINA</div>  
        </div>


        <div className='option_box'>
        <div className='option_title'>GA NAAR DE INSTELLINGEN PAGINA </div>  
          <div className='option_button_settings' 
          onClick={()=> router.push(`/PLATFORM/${public_token}/settings`)}>INSTELLINGEN</div>  
          </div>

    </div>
    
    </Layout>

    </>
    
 
  );
};

export default WithApollo({ssr: false})(Confirmation);
