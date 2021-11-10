import {
  Flex,
  Spinner
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { Layout } from "../../../components/general/Layout";
import StackPersonalMessageElementOwner from "../../../components/grid_blocks/StackPersonalMessageElementOwner";
import {
  PersonalMessage,
  PersonalMessageAccess,
  useCreatePersonalMessageAccessMutation,
  useDeletePersonalMessageAccessMutation,
  useHerdenkingspaginaQuery,
  useMeQuery,
  usePersonalMessagesAccessForCurrentPageQuery,
  usePersonalMessagesQuery
} from "../../../generated/graphql";
import { STATUS } from "../../../types";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";

const PersonalMessagesOwner: React.FC<{}> = ({}) => {
  useIsAuth(STATUS.CoOwner);

  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();
  const [scroll_state, setscroll_state] = useState(false);
  const [Emailvalue, setEmailValue] = useState("");
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setscroll_state(window.pageYOffset > 100)
      );
    }
  }, []);


  const { data: meData, loading: Meloading } = useMeQuery({
      variables:{ paginaId: public_token,},skip: isServer(), });

  const {data: pmaData,loading: pmaLoading,} = usePersonalMessagesAccessForCurrentPageQuery({
    variables: { paginaId: public_token },
    skip: isServer(),
  });

  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  })


  const {data ,error,loading,fetchMore,variables} = usePersonalMessagesQuery({
    variables: {limit: 10,cursor: null,paginaId: public_token },
    notifyOnNetworkStatusChange: true,
  });

  const [allowAcces] = useCreatePersonalMessageAccessMutation();
  const [denyAccess] = useDeletePersonalMessageAccessMutation();
  const handleEmailChange = (event:any) => {setEmailValue(event.target.value)};

  if ( loading || pmaLoading) {
    return <div>...loading</div>;
  }

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if (!pmaLoading && !pmaData) {
    return (
      <div>
        <div>geen personal message data</div>
      </div>
    );
  }



 


  return (
    <Layout>
       <div className="background_platform">

      {/* create personal message btn */}
       <div className="timeline_btn_container">
              <div className='timeline_droplet_btn'>
                  <div className="timeline_droplet_btn_text" onClick={(e:any)=>router.push(`/PLATFORM/${public_token}/create-personal-message`)}>{!scroll_state ?'MAAK EEN LAATSTE BOODSCHAP':''}</div> <GrAddCircle onClick={(e:any)=>router.push(`/PLATFORM/${public_token}/create-personal-message`)} className={!scroll_state ?'droplet_btn_icon': 'droplet_btn_icon_scroll'} />
              </div>
        </div>

 

    {!data && loading ? (
          <Flex align="center" >
            <Spinner  />
          </Flex>
        ) : (
  <>
        {data!.personalMessages.PersonalMessages.length ===0 ? 
          <div className="memories_default_box" onClick={(e:any)=>{router.push(`/PLATFORM/${public_token}/create-personal-message`)}}>

          <div className="memories_default_container_box">
            <img className="memories_default_view_img"  src={herdenkingspagina?.herdenkingspagina?.mediaUrl} />
            <div className="memories_default_text">{`Maak een laatste boodschap voor een vriend of familielid.`}</div>
            <IoMdAdd className='memories_default_icon'/> 
          </div>
         </div>

:
          <div className="personal_message_container">
            <div className="personal_message_columns">
                {data?.personalMessages.PersonalMessages.map((p:any) =>                       
                  <div key={p.id}>
                    <StackPersonalMessageElementOwner personalmessage={p as PersonalMessage} personalmessageaccess={pmaData?.personalMessagesAccessForCurrentPage as PersonalMessageAccess[]} />                
                  </div>  
                   )}               

            </div>
          </div>
          }
</>          
        )}


            {data && data.personalMessages.hasMore ? (
              <Flex>
                <button
                  onClick={() => {
                    fetchMore({
                      variables: {
                        limit: variables?.limit,
                        cursor:
                          data.personalMessages.PersonalMessages[
                            data.personalMessages.PersonalMessages.length - 1
                          ].createdAt,
                      },
                    
                    });
                  }}
             
                >
                  meer laden
                </button>
              </Flex>
            ) : null}

  </div>
  </Layout>
  )

};

export default WithApollo({ ssr: false })(PersonalMessagesOwner);
