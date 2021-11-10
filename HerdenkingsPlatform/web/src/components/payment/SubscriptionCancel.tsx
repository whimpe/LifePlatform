import { Box, Flex, Spinner } from '@chakra-ui/core';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { PAYMENT_PLAN } from '../../constants';
import { useCancelMollieSubscriptionMutation, useGetMollieSubscriptionForPageQuery } from '../../generated/graphql';
import { SubscriptionButtons } from './SubscriptionButtons';

interface SubscriptionCancelProps {
    public_token: string;
}

export const SubscriptionCancel: React.FC<SubscriptionCancelProps> = ({public_token}) => {

    const {data:SubscriptionData, loading: load, error: errors} = useGetMollieSubscriptionForPageQuery({
        variables:{
            public_token:public_token
        }
    })

    const [cancelSubscription] = useCancelMollieSubscriptionMutation();

    console.log("SubscriptionData :", SubscriptionData);

    if(load){
        return(<Flex align="center" justify="center"><CircularProgress color="primary"  size={30}/></Flex> )
 
    }

    

    //ofwel zie je er is geen subscriptie -> maak een aan
    //ofwel zie je je huidige subscriptie en kan je die cancelen

    

    return (


        <>
        NO SUBSCRIPTION
        <Box hidden={!!SubscriptionData?.getMollieSubscriptionForPage.mollieSubscriptionId}>

        <div>
            {"Nog geen subscriptie"}
        </div>


        <SubscriptionButtons public_token={public_token} payment_plan={PAYMENT_PLAN.Premium}/>
        </Box>

        {/* HAS SUBSCRIPTIUON */}

        <Box hidden={!SubscriptionData?.getMollieSubscriptionForPage.mollieSubscriptionId }>
        
        <div>
        {"Start Date: "}
        {SubscriptionData?.getMollieSubscriptionForPage.startDate}
        </div>


        <div>
        {"Next payment date: "}
        
        {SubscriptionData?.getMollieSubscriptionForPage.nextPaymentDate}
        </div>

        <div>

        </div>
        {"  Andere manier om te displayen? ->  "}
        {new Date(SubscriptionData?.getMollieSubscriptionForPage.nextPaymentDate!).toDateString()}
        
        <div>
        {"Description: "}
        {SubscriptionData?.getMollieSubscriptionForPage.description}
        </div>

       
        <div>
        {"plan: "}
        {SubscriptionData?.getMollieSubscriptionForPage.payment_plan}
        </div>

        <div>
        {"status: "}
        {SubscriptionData?.getMollieSubscriptionForPage.status}
        </div>

        

            <button onClick={async ()=> {
                await cancelSubscription({variables:{
                    public_token:public_token,
                    MollieSubscriptionId:SubscriptionData!.getMollieSubscriptionForPage!.mollieSubscriptionId!

                }});
                window.location.reload();
            }}>
                {"Cancel Subscription"}

            </button>

        </Box>
</>


    );
}