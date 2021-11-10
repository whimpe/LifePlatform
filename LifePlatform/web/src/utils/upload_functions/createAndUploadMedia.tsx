import { ApolloCache, FetchResult, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/core";
import imageCompression from "browser-image-compression";
import gql from "graphql-tag";
import { MUTIPLE_UPLOAD } from "./uploadUtils";

// const [mutateUpload] = useMutation(MUTIPLE_UPLOAD);


//TODO: maak algemaan voor elk soort upload
// verwijder height and width maak switch voor soort Media
export const createMediaFunction = async (
  files: any ,
  public_token: string,
  objectType: string,
  objectId: string /** Id of the object -> herinneringId, CondolanceId, ... */,
  mutateUpload: any /** Is de mutation die de upload naar amazon doet (niets met postgres) */,
  createMediaObject: any /** Is de mutation die het object aanmaakt en in de postgres steekt */,
  setprogress?:any
) => {

 
  
  const aws_files = [];
  //TODO: checken als een al slechte foto nog slechter word gemaakt -> niet de bedeling enkel hoge kwailiteit verminderen
  const options = {
    maxSizeMB: 0.5, // (default: Number.POSITIVE_INFINITY)
  };

  if (files.length === 0) { return false; }
  if (!files.length) { aws_files.push(files); }
  
  
  //Compressen (alleen fotos)
  for (let i1 = 0; i1 < files.length; i1++) {    
    if (files[i1].type.split("/")[0] === "image") {
      const compressedFile = await imageCompression(files[i1], options);
      aws_files.push(compressedFile);
      
    } else { aws_files.push(files[i1]); }
  }

  //opsturen
  

  // console.log("files in util", files[0].size);
  // console.log("aws_files in util", aws_files[0].size);

  // load alle the (confirmed images to amazon) to get their URL
  const resultMutateUploadMultiple = await mutateUpload({variables: { files: aws_files, folder: public_token },});  
  
  // //TODO: DRY
    for (var i2 = 0; i2 < resultMutateUploadMultiple.data.multipleUpload.length; i2++) {
      // Haal url eruit
      var awsUrl = resultMutateUploadMultiple.data.multipleUpload[i2].url;
      if(objectType === "herinnering"){
        const { errors } = await createMediaObject({
          variables: {    
            herinneringId: objectId,                   
            input: {
              urlFile: awsUrl,
              objectSize: (aws_files[i2] as File).size,
              // objectSize: 555,
              mediaType: files[i2].type.split("/")[0],  
            },
            paginaId: public_token,
          },
          update: (cache: any, result: any) => {
            cache.modify({
              id: "Herinnering:" + objectId,
              fields: {
                media(existingMediaRefs = [], {}) {
                  const newMediaRef = cache.writeFragment({
                    data: result.data.createMediaHerinnering,
                    fragment: gql`
                      fragment _ on MediaHerinnering {
                        id
                        text
                        title
                        urlFile
                        mediaType
                      }
                    `,
                  });
                  return [...existingMediaRefs, newMediaRef];
                },
              },
            });
          },
      
        });
      if (errors) {
        throw new Error('falt')
      }
    }

    if(objectType === "persoonlijkeboodschap"){
      const { errors } = await createMediaObject({
        variables: {  
          input: {
            urlFile: awsUrl,
            objectSize: (aws_files[i2] as File).size,
            mediaType: files[i2].type.split("/")[0],  
            },
            paginaId: public_token,
            pmessageId: objectId,                             
             
            },

            date: (cache: any, result: any) => {
            cache.modify({
            id: "personalMessage:" + objectId,
            fields: {
              media(existingMediaRefs = [], {}) {
                const newMediaRef = cache.writeFragment({
                  data: result.data.createMediaHerinnering,
                  fragment: gql`
                  fragment _ on MediapersonalMessage {
                      id
                      text
                      title
                      urlFile
                      mediaType
                    }
                  `,
                });
                return [...existingMediaRefs, newMediaRef];
              },
            },
          });
        },
    
      });
    if (errors) {
      throw new Error('falt')
    }
    }
     
    if(objectType === "boodschap"){
      const { errors } = await createMediaObject({
        variables: {    
          messageId: objectId,                   
          input: {
            urlFile: awsUrl,
            objectSize: (aws_files[i2] as File).size,            
            mediaType: files[i2].type.split("/")[0],  
          },
          paginaId: public_token,
        },
        update: (cache: any, result: any) => {
          cache.modify({
            id: "Message:" + objectId,
            fields: {
              media(existingMediaRefs = [], {}) {
                const newMediaRef = cache.writeFragment({
                  data: result.data.createMediaMessage,
                  fragment: gql`
                    fragment _ on MediaMessage {
                      id
                      text
                      title
                      urlFile
                      mediaType
                    }
                  `,
                });
                return [...existingMediaRefs, newMediaRef];
              },
            },
          });
        },
    
      });
    if (errors) {
      throw new Error('falt')
    }
  }



    }
    
  

 
    return true

  



  
};
