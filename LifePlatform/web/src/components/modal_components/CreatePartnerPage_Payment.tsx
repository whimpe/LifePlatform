import { useMutation } from "@apollo/client";
import { CircularProgress, TextareaAutosize } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { MdLock } from "react-icons/md";
import { setAccessToken } from "../../accessToken";
import {
    DESIGN_TYPE
} from "../../constants";
import { useAddMediaUrlMutation,  useCreatePartnerHerdenkingspaginaMutation,  useMeQuery, } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { SINGLE_UPLOAD } from "../../utils/upload_functions/uploadUtils";
import { WithApollo } from "../../utils/withApollo";
import * as gtag from '../../utils/googleanalytics/gtag';

const access_status = [
  "Wie mag dit verhaal zien",
  "Openbaar",
  "Enkel Intieme kring",
  "enkel mezelf en overleden",
];

interface CreatePartnerPage_PaymentProps {
  setModelclick: any;
  setContent: any;
  setmodalState: any;
  Content: any;
  close_modal: any;
}

export const CreatePartnerPage_Payment: React.FC<CreatePartnerPage_PaymentProps> = ({
  setModelclick,
  setContent,
  setmodalState,
  Content,
  close_modal,
}) => {
  const router = useRouter();
  const [selected_option, setselected_option] = useState("free"); //free , month, year
  const [createPartnerHerdenkingsPagina] = useCreatePartnerHerdenkingspaginaMutation();
  const [addMediaUrl] = useAddMediaUrlMutation();
  let [valueControlBefore, setValueControlBefore] = useState(false);
  const [mutateUpload, { loading, error, data }] = useMutation(SINGLE_UPLOAD);
  const [file, setfile] = useState<any>(null);
  const [loading_state, setloading] = useState(false);
  const [nameValue, setnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");

  const { data: Medata, loading: Meloading } = useMeQuery({ skip: isServer() });
  const close_all = () => {
    setModelclick(false);
    setloading(false);
    setmodalState(false);
    close_modal(false);
    setloading(false);
  };

  const create_MemoryPage = async () => {
    setloading(true);
    if (Content.media[0].size > 100000000) {
      //100MB threshold
      alert("het aantal bestanden is te groot");
      setloading(false);
    } else if (Content.media.length === 0) {
      alert("U bent vergeten een profielfoto te selcteren.");
      setloading(false);
    } else if (Content.media[0].type.split("/")[0] !== "image") {
      alert("De profielfoto moet een foto zijn");
      setloading(false);
    } else {
      
      var awsURL = 'https://aeternageneral.s3.eu-west-2.amazonaws.com/default_images/default_profile.jpg';
      const public_token = await createPartnerHerdenkingsPagina({
        variables: {
          input: {
            name_of_page: Content.title,
            mediaUrl: '',
            text: `Welkom op het levensverhaal van ${Content.title}. Hier kan je altijd terecht indien je onze mooie intieme herinneringen wilt herbeleven. Deel gerust een mooie foto of verhaal dat we samen beleefd hebben zodat ze voor altijd bewaard blijven. `,
            DoB: Content.dob,
            control_before: valueControlBefore,
            condoleance_active: false,
            DesignType: DESIGN_TYPE.Golden_sun,
          },
          DoD: Content.dod,
          partner_type: Medata?.me?.partner_type!,
          partner_name: Medata?.me?.user?.username!,
          partner_email: Medata?.me?.user?.email!,
          info_administrator:{
            username: nameValue,
            password: passwordValue,
            email: emailValue
          }
        },
      });

      if (public_token.errors) {
        throw new Error(public_token.errors.toString());
      }
      if ( public_token && public_token.data?.createPartnerHerdenkingspagina?.accessToken ) {
        setAccessToken(public_token.data?.createPartnerHerdenkingspagina!.accessToken);
      }


      if(Content.media.length!==0){
          const resultMutateUpload = await mutateUpload({
            variables: {
              file: Content.media[0],
              folder:
                public_token!.data!.createPartnerHerdenkingspagina!.herdenkingspagina!.id,
            },
          })
          awsURL = resultMutateUpload.data.singleUpload.url;    
      };

      const addmediaResponse = await addMediaUrl({
        variables: {
          mediaUrl: awsURL,
          paginaId:
            public_token!.data!.createPartnerHerdenkingspagina!.herdenkingspagina!.id,
        },
      });

      if (addmediaResponse.errors || public_token.errors) {
        close_all();
      } else {
        gtag.event({ action: 'Create Page Partner', category: 'Partner creation', label: 'page', value: 0, });
        router.push(`/PLATFORM/${public_token!.data!.createPartnerHerdenkingspagina!.herdenkingspagina!.id}`);
        close_all();
      }
    }
  };

  return (
    <>
      <div className="flashcard_container">

          <div className='login_title'>Eigenaar Levensverhaal uitnodigen </div>

          <form>
            <div className="login_label"  >Volledige naam</div>
            <div className="login_input_box" >  <AiOutlineUser className='input_login_icon'/><input  placeholder='Voor - en achternaam' className='login_input_field' onChange={(e:any)=>setnameValue(e.target.value)}></input></div>
          
            <div className="login_label"  >Email</div>
            <div className="login_input_box" >  <FiMail className='input_login_icon'/>
                          <input  placeholder='Email' className='login_input_field' type="email" name='username'   onChange={(e:any)=>setEmailValue(e.target.value)}></input></div>
          
            </form>
         

        <div className="flashcard_btn_container">
          <div
            onClick={(e) => {
              setmodalState("media");
            }}
            className="flashcard_inspiration_btn"
          >
            <BsArrowLeft className="flashcard_icon_btn" />{" "}
            <p className="flashcard_text_btn">Terugkeren</p>
          </div>
          <div
            className="flashcard_media_btn"
            onClick={async (e) => {
              await create_MemoryPage();
            }}
          >
            {loading_state ? ( <CircularProgress color="secondary" /> ) :
             ( <div className="flashcard_text_btn"> Start Levensverhaal <BsArrowRight className="flashcard_icon_btn" /> </div> )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithApollo({ ssr: false })(CreatePartnerPage_Payment);
