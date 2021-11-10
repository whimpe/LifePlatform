import { ApolloCache, FetchResult } from "@apollo/client";
import imageCompression from "browser-image-compression";

import gql from "graphql-tag";

//TODO: maak algemaan voor elk soort upload
// verwijder height and width maak switch voor soort Media
export const CreateMessage = async (
  files: FileList ,
  public_token: string,    
  inputObject:any,
  mutateUpload: any, /** Is de mutation die de upload naar amazon doet (niets met postgres) */
  createObject: any, 
  createMediaObject: any /** Is de mutation die het object aanmaakt en in de postgres steekt */
) => {

  const aws_files = [];
  const options = {maxSizeMB: 0.5, }; // (default: Number.POSITIVE_INFINITY)
 
 

  const bericht = await createObject({
    variables: {
      paginaId: public_token,
      input: inputObject,
    },
    update: (cache: any) => {
      //TODO: cache generic maken
      cache.evict({ fieldName: "messages:{}" });
    },
  });

  const objectId = bericht.data.createMessage.id;
  return objectId;

  

};