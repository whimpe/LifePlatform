import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight, BsCameraVideo } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { HiOutlineMicrophone, HiOutlinePhotograph } from 'react-icons/hi';
import {
  useAddMediaUrlMutation,
  useCreateHerdenkingspaginaMutation,
  useCreateHerinneringMutation,
  useCreateMediaHerinneringMutation,
  useMeQuery,
} from '../../generated/graphql';
import { createMemory } from '../../utils/createFunctions/createMemory';
import {
  MUTIPLE_UPLOAD,
  SINGLE_UPLOAD,
} from '../../utils/upload_functions/uploadUtils';
import { useGetStringFromUrl } from '../../utils/useGetIntFromUrl';
import { WithApollo } from '../../utils/withApollo';
import { createMediaFunction } from '../../utils/upload_functions/createAndUploadMedia';
import { setAccessToken } from '../../accessToken';
import { DESIGN_TYPE, MAX_UPLOAD_SIZE } from '../../constants';
import { CircularProgress } from '@material-ui/core';

interface CreatePage_MediaProps {
  setModelclick: any;
  setContent: any;
  setmodalState: any;
  Content: any;
}

export const CreatePage_Media: React.FC<CreatePage_MediaProps> = ({
  setModelclick,
  setContent,
  setmodalState,
  Content,
}) => {
  const router = useRouter();
  const [createHerdenkingsPagina] = useCreateHerdenkingspaginaMutation();
  const [addMediaUrl] = useAddMediaUrlMutation();
  let [valueControlBefore, setValueControlBefore] = useState(false);
  const [mutateUpload, { loading, error, data }] = useMutation(SINGLE_UPLOAD);
  const [file, setfile] = useState<any>(null);
  const [loading_state, setloading] = useState(false);

  //Make a global constant

  let handleChangeAantal = async (event: any) => {
    if (event.target.files[0].size > MAX_UPLOAD_SIZE) {
      alert('Uw media is te groot om te uploaden, neem een kleiner bestand');
      return null;
    } else {
      setfile([event.target.files[0]]);
      setContent((prevState: any) => {
        // add file size to total MB
        return { ...prevState, media: [event.target.files[0]] };
      });
    }
    return null;
  };

  const create_MemoryPage = async () => {
    setloading(true);
    if (Content.media[0].size > 100000000) {
      //100MB threshold
      alert('het aantal bestanden is te groot');
    } else if (Content.media.length === 0) {
      alert('U ben vergeten een profiel foto te selcteren.');
    } else if (Content.media[0].type.split('/')[0] !== 'image') {
      alert('De profielfoto moet een foto zijn');
    } else {
      var awsURL = null;
      const public_token = await createHerdenkingsPagina({
        variables: {
          input: {
            name_of_page: Content.title,
            mediaUrl: 'null',
            text: `Welkom op het levensverhaal van ${Content.title}. Hier kan je altijd terecht indien je onze mooie intieme herinneringen wilt herbeleven. Deel gerust een mooie foto of verhaal dat we samen beleefd hebben zodat ze voor altijd bewaard blijven. `,
            DoB: Content.dob,
            control_before: valueControlBefore,
            condoleance_active: false,
            DesignType: DESIGN_TYPE.Golden_sun,
          },
          DoD: Content.dod,
        },
        // ooit vervangen door iets dat alleen de relevante velden uit cache verwijdert
      });
      if (public_token.errors) {
        throw new Error(public_token.errors.toString());
      }
      if (
        public_token &&
        public_token.data?.createHerdenkingspagina?.accessToken
      ) {
        setAccessToken(public_token.data?.createHerdenkingspagina!.accessToken);
      }

      const resultMutateUpload = await mutateUpload({
        variables: {
          file: Content.media[0],
          folder:
            public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id,
        },
      });
      awsURL = resultMutateUpload.data.singleUpload.url;

      const addmediaResponse = await addMediaUrl({
        variables: {
          mediaUrl: awsURL,
          paginaId:
            public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id,
        },
      });

      if (addmediaResponse.errors || public_token.errors) {
        alert('er liep iets mis');
      } else {
        setloading(false);
        router.push(
          `/PLATFORM/${
            public_token!.data!.createHerdenkingspagina!.herdenkingspagina!.id
          }/`
        );
        return null;
      }
    }
    return null;
  };

  return (
    <>
      <div className='flashcard_container'>
        <div className='flashcard_title'>
          Voeg profielfoto toe aan levenstijdlijn
        </div>

        {Content.media.length === 0 ?
        <div className="flashcard_text_container">
          <div className="flashcard_upload_btn_container">
            <label htmlFor="upload-photo"> <div className='flashcard_upload_profile_img_btn'><HiOutlinePhotograph className='flashcard_upload_icon_btn' /><div className="flashcard_upload_text_btn">Foto</div></div> </label>
          </div>
        </div>
        :null}

        {Content.media.length !== 0 ? (
          <>

            <div className="flashcard_question_container">
              <div className="flashcard_question">
                {Content.media[0].type.split("/")[0] === "image" ? ( <img src={URL.createObjectURL(Content.media[0])} alt="Avatar" className="upload_memory_page_img" /> ) : null}
                {Content.media[0].type.split("/")[0] === "video" ? ( <BsCameraVideo className="upload_memory_page_img" /> ) : null}
                {Content.media[0].type.split("/")[0] === "audio" ? ( <HiOutlineMicrophone className="upload_memory_page_img" /> ) : null}
              </div>
            </div>
            {/* <div className="flashcard_subtitle_question"> " U kan enkel 1 media bestand toevoegen, na het starten van een levenstijdlijn kan u zoveel toevoegen als u wilt." </div> */}
          </>
        ) : null}

        <div className="flashcard_btn_container">
          <div onClick={(e) => { setmodalState("content"); }} className="flashcard_inspiration_btn" >
            <BsArrowLeft className="flashcard_icon_btn" />{" "}
            <div className="flashcard_text_btn">Omschrijving aanpassen</div>
          </div>
          <div
            onClick={async (e) => {
              try{
                if (Content.media.length === 0) {     
                  alert("U ben vergeten een profielfoto te selcteren.");
                }else{ setmodalState('payment');}                
              }catch(error:any){
                if(error.message.includes("geen foto geselecteerd")){
                  alert("Gelieve een foto te selecteren");
                }
                else if(error.message.includes("input is not an image")){
                  alert("Input heeft geen foto-formaat");
                }                
              }
            }}
            className='flashcard_media_btn'
          >
            <div className='flashcard_text_btn'> {loading_state ? ( <CircularProgress color='secondary' /> ) : ( 'Creëer levenstijdlijn' )}
            </div>
            <BsArrowRight className='flashcard_icon_btn' />
          </div>
        </div>
      </div>

      {/* Logic for input file buttons */}
      <input
        type='file'
        name='photo'
        accept='image/*'
        id='upload-photo'
        style={{ display: 'none' }}
        onChange={(event: any) => {
          handleChangeAantal(event);
        }}
      />

      <input
        type='file'
        name='photo'
        placeholder='deel videos'
        accept='video/*'
        id='upload-video'
        style={{ display: 'none' }}
        onChange={(event: any) => {
          handleChangeAantal(event);
        }}
      />

      <input
        type='file'
        name='photo'
        accept='audio/*'
        id='upload-audio'
        style={{ display: 'none' }}
        onChange={(event: any) => {
          handleChangeAantal(event);
        }}
      />
    </>
  );
};

export default WithApollo({ ssr: false })(CreatePage_Media);
