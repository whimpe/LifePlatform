import {
  Flex,
  Spinner
} from "@chakra-ui/core";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from "@material-ui/pickers";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import  { default as React, Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { CommentSection } from "../../../../../components/general/CommentSection";
import { Layout } from "../../../../../components/general/Layout";
import { MediaDisplay } from "../../../../../components/general/MediaDisplay";
import StackGridGalleryElement from "../../../../../components/grid_blocks/StackGridGalleryElement";
import {
  Herinnering,
  useHerdenkingspaginaQuery, useHerinneringQuery, useUpdateHerinneringMutation
} from "../../../../../generated/graphql";
import { isServer } from "../../../../../utils/isServer";
import { useGetStringFromUrl } from "../../../../../utils/useGetIntFromUrl";
import { useIsAuth } from "../../../../../utils/useIsAuth";
import { WithApollo } from "../../../../../utils/withApollo";
import { CircularProgress } from "@material-ui/core";
import EditMemory_Content from "../../../../../components/edit_delete/EditMemory_Content";
import { STATUS } from "../../../../../types";


  
  const EditMemory = () => {
    const public_token = useGetStringFromUrl("public_token");
    const intId = useGetStringFromUrl("memory_edit_id");
        const router = useRouter();
  
    useIsAuth(STATUS.Approved);
  
    const [updateHerinnering] = useUpdateHerinneringMutation();
    const { data, error, loading } = useHerinneringQuery({
        variables: { id: intId, paginaId: public_token },
      });
    
      const {data: PaginaData, loading: Paginaloading, } = useHerdenkingspaginaQuery({
        variables: {
          paginaId: public_token,
        },
        skip: isServer(),
        // we only want this query to run when in the browser!
      });
    
    
 
    const [show, setShow] = React.useState(false);
    var showImages = null;
    const [commentsection, setcommentsection] = useState(false);


      const handleToggle = () => { setShow(!show); setcommentsection(!commentsection); };
    
      if (loading) {
        return ( <div> <Flex align="center" justify="center"> <CircularProgress color="primary"  size={30}/> </Flex> </div> );
      }
    
      if (error) {
        return <div>{error.message}</div>;
      }
    
      if (!data?.herinnering) {
        return <div>could not find herinnering</div>;
      }

    
  
      
  

    return (
     <>
<Layout >


  
<EditMemory_Content data={data} public_token={public_token} />


 

  <h2 className='memory_horizontal_line'>
    <span>HERINNERING GALLERIJ</span>
  </h2>



  {!data && loading ? (
    <Flex align="center" justify="center">
     <CircularProgress color="primary"  size={30}/>
    </Flex>
  ) : (


    <div className="gallery_media_container">
      <div className="masonry_gallerygrid">
        {data!.herinnering.media.map((mediaHerr: any) =>
          !mediaHerr ? null : 
          <>
          <StackGridGalleryElement mediaHerinnering={mediaHerr}  type={'memory_edit'} />
       
          </>
        )}
      </div>
    </div>
  )}

  <h2 className='memory_horizontal_line'> verhalen en bijdragen van andere auteurs </h2>


  


  {/* <Collapse mt={'25px'} isOpen={show}> */}
    <CommentSection herinnering={data.herinnering as Herinnering}  public_token={public_token} candelete={true}/>
  {/* </Collapse> */}

  {/* <div className="memory_id_container">
      <button className='open_comments_btn' onClick={handleToggle}>               
            {commentsection ? <><MdArrowUpward className='return_back_id_icon'/> naar boven</> :  "bekijk de verhalen" }
    </button>  

  </div> */}

  {/* <div className="memory_id_container">
  <button className='return_back_id_btn'  
              onClick={()=> {router.push(`/PLATFORM/${public_token}/memories`)}}> <MdArrowBack className='return_back_id_icon'/>
              Terugkeren
    </button>         
  </div> */}


  <div className="memory_return_container" onClick={(e:any)=>router.back()}>
    <BsArrowLeft className='memory_return_icon' />
  </div>

</Layout>
</>
    );
  };
  export default WithApollo({ ssr: false })(EditMemory);
  
  