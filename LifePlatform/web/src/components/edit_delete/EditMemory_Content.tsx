import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from "@material-ui/pickers";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import  { default as React, Fragment, useState } from "react";
import { AiFillDelete } from 'react-icons/ai';
import { BiCalendar } from "react-icons/bi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useDeleteHerinneringMutation, useUpdateHerinneringMutation } from "../../generated/graphql";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";
import RemoveMemoryModal from '../modal_components/RemoveMemoryModal';
// import useStyles from "../../components/modal_components/CreateContent_Text";
  
const access_status_options =['none','Publiek','Vrienden en Familie','Intieme kring','medebeheerders en mezelf','beheerder en mezelf'];
const category_options =['Familie','Vrienden','Sport','Jeugd','Werk','Hobby'];


interface EditMemory_ContentProps {
    data:any;
    public_token:string;

}

export const EditMemory_Content: React.FC<EditMemory_ContentProps> = ({data,public_token}) => {
    const router = useRouter();
    const [updateHerinnering] = useUpdateHerinneringMutation();
    const [deleteHerinnering] = useDeleteHerinneringMutation();
    const [Title, setTitle] = useState(data?.herinnering?.title);
    const [Text, setText] = useState(data?.herinnering?.text);
    const [OnTimeline, setOnTimeline] = useState(data?.herinnering.on_timeline);
    const [selectedDate, setselectedDate] = useState(data?.herinnering.datumVanHerinnering);
    const [modalclick_remove, setmodalclick_remove] = useState(false);
    const [access_status, setaccess_status] = useState(data?.herinnering.status)
    const [category, setcategory] = useState(data?.herinnering.categorie)
    const [IsLoading, setIsLoading] = useState(false)

    const handle = (event:any) => { setaccess_status(event.target.value); };
    const handleStatus = (event:any) => { setaccess_status(event.target.value); };
    const handleCategory = (event:any) => { setcategory(event.target.value); };
    const DateHandler = (date:any) => { setselectedDate(date); }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { setOnTimeline(event.target.checked ); };

    const update_herinnering = async (event:any) => {     
      setIsLoading(true);
        await updateHerinnering({ variables: { id: data!.herinnering!.id, title: Title,  text: Text,
          datumVanHerinnering: selectedDate ,ontimeline:OnTimeline, status: access_status,paginaId: public_token,categorie: category, } ,          
          update: (cache) => cache.writeFragment({
            id: "Herinnering:" + data.herinnering.id,
              fragment: gql`
                  fragment _ on Herinnering {
                    title
                    text
                    categorie                  
                    datumVanHerinnering
                    on_timeline
                    status
                  }`
                ,
                data: {
                  title: Title,  text: Text,categorie: category,
                  datumVanHerinnering: selectedDate,on_timeline:OnTimeline,status: access_status,
                },
          })                  
        });
          setIsLoading(false);
          alert('herinnering is gewijzigd')
          // router.reload();
          router.push(`/PLATFORM/${public_token}/memory/${data!.herinnering!.id}`);
      }

    let remove_memory = (event: any) => {
        deleteHerinnering({
          variables: { id: data.herinnering.id, paginaId: public_token },
          update: (cache) => {
            cache.evict({ id: "Herinnering:" + data.herinnering.id });
          },
        });
        router.push(`/PLATFORM/${public_token}/memories`);
      };
       
    return (
    <>
 
        <div className="memory_detail_head_container">

        <div className="index_text_container">
        <Fragment>
            <div className="flashcard_date_container">                                
                <KeyboardDatePicker
                    keyboardIcon={<BiCalendar/>}  invalidDateMessage={'ongeldige datum'}
                    className='datepicker_ui'
                    InputProps={{disableUnderline: true}}
                    minDate={new Date('1700-01-01')}
                    minDateMessage='datum kan niet voor dit jaartal datum. '
                    openTo="year"
                    clearable
                    value={selectedDate}        
                    views={["year", "month", "date"]}
                    onChange={(date:any) => {setselectedDate(date);DateHandler(date);}}
                    format="dd/MM/yyyy" />
            </div>
        </Fragment>
          
          <TextareaAutosize className="index_text_title_edit" aria-label="empty textarea" placeholder='Titel..' value={Title} onChange={(e:any)=> {setTitle(e.target.value)}} />
          <TextareaAutosize className="index_text_subtext_edit" aria-label="empty textarea" placeholder='Uw verhaal...' value={Text} onChange={(e:any)=>{setText(e.target.value)}} />

          <div className="flashcard_edit_options_container">
                <div className="flashcard_options_box">
              <div className="flashcard_label"> Op tijdlijn?</div> 
                <FormControl >
                  <FormGroup aria-label="position" row>
                      <Switch 
                        color="primary"
                        checked={OnTimeline}
                        onChange={handleChange} />
                  </FormGroup>
                </FormControl>
                </div>
                </div>
                <div className="flashcard_options_box">
                <div className="flashcard_label"> Voor wie is deze herinnering bedoeld?</div> 
                  <FormControl >
                    <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={access_status}                        
                          onChange={handleStatus}
                        >
                          <MenuItem value={1}>{access_status_options[1]}</MenuItem>
                          <MenuItem value={2}>{access_status_options[2]}</MenuItem>
                          <MenuItem value={3}>{access_status_options[3]}</MenuItem>       
                          <MenuItem value={5}>{access_status_options[5]}</MenuItem>
                    </Select>
                    </FormControl>

                </div>
                <div className="flashcard_options_box">
                <div className="flashcard_label">Categorie herinnering?</div> 
                  <FormControl >
                    <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}                        
                          onChange={handleCategory}
                        >
                          <MenuItem value={0}>{category_options[0]}</MenuItem>
                          <MenuItem value={1}>{category_options[1]}</MenuItem>
                          <MenuItem value={2}>{category_options[2]}</MenuItem>
                          <MenuItem value={3}>{category_options[3]}</MenuItem>
                          <MenuItem value={4}>{category_options[4]}</MenuItem>

                    </Select>
                    </FormControl>

                </div>
                

        </div>

        {/* the last image in the row  or main image of page */}
        {data.herinnering.media.length!==0 ?
        <div className="index_image_container">          
          <MediaDisplay
            awsUrl={data!.herinnering.media[0].urlFile}
            type={data.herinnering.media[0].mediaType}
            designclass="index_image"
          />          
        </div>:null
        }

        </div>

        <div className="sticky_btn_container">
            <div className='sticky_remove_droplet_btn' onClick={(e:any)=>{setmodalclick_remove(true)}}>
              <AiFillDelete className='sticky_droplet_remove_btn_icon' /><div className="sticky_remove_droplet_btn_text" >{IsLoading ? <CircularProgress color='secondary' /> :'VERWIJDER HERINNERING'}</div> 
              </div>
        </div>

        <div className="sticky_btn_container">
            <div className='sticky_droplet_btn'onClick={(e:any)=>{update_herinnering(e)}}>
              <HiOutlinePhotograph className='sticky_droplet_btn_icon' /> <div className="sticky_droplet_btn_text" >{IsLoading ? <CircularProgress color='secondary' /> :'WIJZIGINGEN OPSLAAN'}</div> 
            </div>
        </div>



        {modalclick_remove ?  <RemoveMemoryModal public_token={public_token}
                Modalclick={modalclick_remove} setmodalclick={setmodalclick_remove}  memory_id={data?.herinnering?.id} />
        :
        null}


    </>

    )
}
export default WithApollo({ ssr: false })(EditMemory_Content);









