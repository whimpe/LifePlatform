import { Flex } from "@chakra-ui/core";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { GoMailRead } from "react-icons/go";
import { Demo_Layout } from "../../../components/Demo_components/Demo_Layout";
import ErrorPage from "../../../components/general/ErrorPage";
import Demo_StackPersonalMessageElement from "../../../components/Demo_components/Demo_StackPersonalMessageElement";
import { PersonalMessage, useHerdenkingspaginaQuery, usePersonalMessages_DemoQuery } from "../../../generated/graphql";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { WithApollo } from "../../../utils/withApollo";


const PersonalMessages: React.FC<{}> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();

  
  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({
    variables: {
      paginaId: public_token,
    },
  })

    

  const { data, error, loading, fetchMore, variables } = usePersonalMessages_DemoQuery({
    variables:{
      paginaId: public_token
    },
        notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>you got query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  if(!data?.personalmessages_demo){
    return (<Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex>);
      
  }

  return (
<>

  


    <Demo_Layout>
    <div className="background_platform">



 {!data && loading ? (
       <Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex>
     ) : (

      <>
            {data?.personalmessages_demo.length===0 ? 
              <>
              <div className="personal_message_default_box" onClick={(e:any)=>{router.push(`/VOORBEELD/${public_token}/messages`)}}>
                <div className="memories_default_text">{`Er is geen laatste boodschap achtergelaten voor u. Indien u graag een laatste boodschap had achtergelaten voor ${herdenkingspagina?.herdenkingspagina?.name_of_page}, dan kan dit bij berichten`}</div>
                <GoMailRead className='memories_default_icon'/> 
              </div>
              </>
          :

            <div className="personal_message_container">
              <div className="personal_message_columns">
                {data?.personalmessages_demo.map((p:any) =>                       
                  <div key={p.id}>
                    <Demo_StackPersonalMessageElement personalmessage={p as PersonalMessage}  />
                    </div>
                )}
              </div>
            </div>
            }
      </>
    )}


</div>
</Demo_Layout>

</>
  
  );
};

export default WithApollo({ ssr: false })(PersonalMessages);