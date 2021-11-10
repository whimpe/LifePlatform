import { useRouter } from "next/router";
import React from 'react';
import { PAYMENT_PLAN, Payment_Term } from '../../constants';
import { useCreateLevenstijdlijnDomicilieringMutation } from '../../generated/graphql';

interface SubscriptionButtonsProps {
    payment_plan: PAYMENT_PLAN;   
    public_token: string;
}

// const Price_display = [
//     "One Year",
//     "Two Years",
//     "Five Years",
//     "Ten Years",
//   ];
  
//   const icon_options = [
//     <AiFillCloseCircle color="red" className="icon_status_change" />,
//     <FaHandHoldingHeart color="#bdb486" className="icon_status_change" />,
//     <IoHandLeftSharp color="#bdb486" className="icon_status_change" />,
//     <FaCheck color="green" className="icon_status_change" />,
//     <HiUserGroup color="#bdb486" className="icon_status_change" />,
//     <BsFillPersonFill color="#bdb486" className="icon_status_change" />,
//     <BsFillPersonFill color="#bdb486" className="icon_status_change" />,
//   ];
  


export const SubscriptionButtons: React.FC<SubscriptionButtonsProps> = ({
  payment_plan,
  public_token,
    
}) => {
        
    const [createdomiciliering,] = useCreateLevenstijdlijnDomicilieringMutation();

      const router = useRouter();
    
    return (
        <div>
          <button onClick={async () => {
            
            const pay = await createdomiciliering({
            variables: {
              payment_plan:payment_plan,
              public_token: public_token,
              payment_term:Payment_Term.Recurring
                  
            }
            })

            router.push(pay?.data?.createLevenstijdlijnDomiciliering?.pay_link!);

          }} >
            {"Druk hier om subscriptie aan te maken"}
          </button>
          </div>
    );
}