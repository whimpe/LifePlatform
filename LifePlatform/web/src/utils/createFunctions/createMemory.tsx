
import { ApolloCache, FetchResult } from "@apollo/client";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/router";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../isServer";


export const createMemory = async (
  public_token: string,    
  Content:any,
  mutateUpload: any, /** Is de mutation die de upload naar amazon doet (niets met postgres) */
  createObject: any, 
  createMediaHerinnering: any /** Is de mutation die het object aanmaakt en in de postgres steekt */
) => {

    const router = useRouter(); 
    const { data: meData, loading: meloading } = useMeQuery({variables: {paginaId: public_token,},skip: isServer(), });
    if(meData?.me?.status===undefined){
      
    }

  //TO DO INdien createMemort bij MEDIAFLASHCARD willen omzettten naar een util

    if (Content.totalMB > 100000000) { //100MB threshold
      alert("het aantal bestanden is te groot, maximaal 100MB");
      throw new Error("het aantal bestanden is te groot");
    }
    try {
        //create memory object
        const herinne = await createObject({
            variables: {
            input: {
                title:Content.title,
                text: Content.message,
                categorie:'category',
                datumVanHerinnering: '2020-01-01',                
                on_timeline: true,
            },
                status: meData?.me?.status,  //TODO: needs to be linked to the correct status
                paginaId: public_token,        
            },
            update: (cache: any) => { //TODO: look why all the memories are suddenly double
            cache.evict({ fieldName: "herinneringen:{}" });
            },
        });
        
        //uploadsmedia from memory object
        const response = await createMediaHerinnering(Content.media, public_token, "herinnering",herinne.data!.createHerinnering.id, mutateUpload,createMediaHerinnering);     


        if(herinne.errors){
            alert("er is iets mis probeer later opnieuw");
          }else{      
            location.reload();   //TODO: dit werkt maar moet betere oplossing met cache
          }
      }catch(err){
        console.log("error while adding mediaHerinneringen",err)
      }
     
    };
