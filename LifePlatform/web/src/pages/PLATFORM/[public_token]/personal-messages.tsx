import { Flex, Spinner } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { Layout } from "../../../components/general/Layout";
import StackPersonalMessageElement from "../../../components/grid_blocks/StackPersonalMessageElement";
import { PersonalMessage, useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery, useHerdenkingspaginaQuery, useMeQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { useGetStringFromUrl } from "../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../utils/useIsAuth";
import { WithApollo } from "../../../utils/withApollo";
import { CircularProgress } from "@material-ui/core";
import { STATUS } from "../../../types";
import { IoMdAdd } from "react-icons/io";
import { GoMailRead } from "react-icons/go";
import ErrorPage from "../../../components/general/ErrorPage";


const PersonalMessages: React.FC<{}> = ({}) => {
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();

  useIsAuth(STATUS.Approved);

  //IMPORT DATA
  const { data: meData, loading: Meloading } = useMeQuery({ variables:{ paginaId: public_token, }, skip: isServer(), });
  const {data: herdenkingspagina, loading:hploading, error: hperror} = useHerdenkingspaginaQuery({ variables: { paginaId: public_token, }, })
  const { data, error, loading, fetchMore, variables } = useFindAllPersonalMessagesOfCurrentUserForCurrentPageQuery({ variables:{ paginaId: public_token },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return ( <div>Probleem probeer later opnieuw</div> );
  }

  if(!data?.findAllPersonalMessagesOfCurrentUserForCurrentPage){
      return (<Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex>);
      
  }

  return (
    <>
    <Layout>
    <div className="background_platform">
        {!data && loading ? (
          <Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex>
        ) : (
          <>
                {data?.findAllPersonalMessagesOfCurrentUserForCurrentPage.length===0 ? 
                  //DEFAULT PM VIEW
                  <>
                  <div className="personal_message_default_box" onClick={(e:any)=>{router.push(`/PLATFORM/${public_token}/messages`)}}>
                    <div className="memories_default_text">{`Er is geen laatste boodschap achtergelaten voor u. Indien u graag een laatste boodschap had achtergelaten voor ${herdenkingspagina?.herdenkingspagina?.name_of_page}, dan kan dit bij berichten`}</div>
                    <GoMailRead className='memories_default_icon'/> 
                  </div>
                  </>
              :
                  // PM GRID VIEW            
                  <div className="personal_message_container">
                    <div className="personal_message_columns">
                      {data?.findAllPersonalMessagesOfCurrentUserForCurrentPage.map((p:any) =>                       
                        <div key={p.id}>
                          <StackPersonalMessageElement personalmessage={p as PersonalMessage}  />
                          </div>
                      )}
                    </div>
                  </div>
                }
          </>
        )}

    {/* 
            {data && data.personalMessages.hasMore ? (
              <Flex>
                <Button
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
                  isLoading={loading}
                  m="auto"
                  my={8}
                >
                  meer laden
                </Button>
              </Flex>
            ) : null} */}

    </div>
    </Layout>
    </>
  
  );
};

export default WithApollo({ ssr: false })(PersonalMessages);