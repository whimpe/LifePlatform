import { createWithApollo} from './createWithApollo';
import { ApolloClient, InMemoryCache,createHttpLink ,from } from "@apollo/client";
import { NextPageContext } from 'next';
import {createUploadLink} from 'apollo-upload-client';
import { Herinnering, MediaHerinnering, PaginatedCondolaties, PaginatedHerinneringen, PaginatedMediaHerinneringen } from '../generated/graphql';
import { getAccessToken, setAccessToken } from '../accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from 'apollo-link-context';
import jwtDecode from "jwt-decode";

const uploadlink = createUploadLink({uri: process.env.NEXT_PUBLIC_API_URL, credentials: "include"});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();


  
  
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    },
  }
})

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true
    }

    

    try {
     
      const decoded_token = jwtDecode(token);     

      if (Date.now() >= (((decoded_token as any).exp) as number) * 1000) {
        return false
      } else {
        return true
      }
    } catch (err:any) {
      return false
    }
  },
  fetchAccessToken:  () => {
    return fetch(process.env.NEXT_PUBLIC_REFRESH_URL!, { method: 'POST', credentials: 'include', })
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin')
  },
})


const createClient = (ctx: NextPageContext) => new ApolloClient({


    link: from([tokenRefreshLink,authLink,uploadlink]),
    

    
    cache: new InMemoryCache({
      typePolicies: {
        Herinnering: {
          fields: {
            media: {
              read(media) {
                return media;
              },

              merge: false, }
          }

         
        },


        // fieldresolver? -> field van herinnering als er writefragment wordt geschreven
      

        Query: {
          fields: {
     


            herinneringen: {

              merge: true,
              // keyArgs: [], // ?????
              // merge(
              //   existing: PaginatedHerinneringen | undefined,
              //   incoming: PaginatedHerinneringen
              //   ):PaginatedHerinneringen {
              //     // console.log("paginated:" ,existing, incoming);
              //   return {
              //     ...incoming,
              //     herinneringen: [...(existing?.herinneringen || []) , ...incoming.herinneringen],
                  
              //   };
              // },
            },
            // herinneringenByDate: {
            //   keyArgs: [], // ?????
            //   merge(
            //     existing: PaginatedHerinneringen | undefined,
            //     incoming: PaginatedHerinneringen
            //     ):PaginatedHerinneringen {
            //       console.log("paginated:" ,existing, incoming);
            //     return {
            //       ...incoming,
            //       herinneringen: [...(existing?.herinneringen || []) , ...incoming.herinneringen],
            //     };
            //   },
            // },
            herinneringen_gallerij: {
              keyArgs: [], // ?????
              merge(
                existing: PaginatedMediaHerinneringen | undefined,
                incoming: PaginatedMediaHerinneringen
                ):PaginatedMediaHerinneringen {
                  console.log("paginated:" ,existing, incoming);
                return {
                  ...incoming,
                  mediaHerinneringen: [...(existing?.mediaHerinneringen || []) , ...incoming.mediaHerinneringen],
                };
              },
            },
            condolaties: {
              keyArgs: [], // ?????              
              merge(existing: PaginatedCondolaties | undefined, incoming: PaginatedCondolaties
                ):PaginatedCondolaties {
                return {
                  ...incoming,
                  condolaties: [...(existing?.condolaties || []) , ...incoming.condolaties],
                  
                };
              },
            },
            
            
          },
        },

       
    }
    
    
    ,
    }),
  });

export const WithApollo = createWithApollo(createClient);