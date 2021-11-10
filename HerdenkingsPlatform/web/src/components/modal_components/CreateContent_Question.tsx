import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsArrowLeft, BsImageFill,BsArrowRight, BsCheck } from "react-icons/bs";
import { useCreateMediaHerinneringMutation } from "../../generated/graphql";
import { MUTIPLE_UPLOAD } from "../../utils/upload_functions/uploadUtils";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import data from "../../../assets/data";
import { MAX_UPLOAD_SIZE } from "../../constants";



interface CreateContent_QuestionProps {
  setModelclick: any;
  setContent:any;
  setmodalState:any;
}

export const CreateContent_Question: React.FC<CreateContent_QuestionProps> = ({ setModelclick, setContent,setmodalState }) => {
  const public_token = useGetStringFromUrl("public_token");
  const [randomIndex, setrandomIndex] = useState(Math.floor(Math.random() * data.Kindertijd.Questions.length));
  const [category, setcategory] = useState<keyof typeof data>('Kindertijd');
  const [cursor, setcursor] = useState(0);

  let start_newcategory = ( maxIndex: number, category:keyof typeof data) => {
    setcursor(0);
    setcategory(category);
    };
        
  let change_cursor = () => {
    const new_cursor = cursor +1;
    if(data[category].Questions.length-1<new_cursor){
      // setcursor(0);
    }else{
      setcursor(new_cursor);
    } 
  }


let goto_content=()=>{
  setmodalState('content');
  setContent((prevState: any) => {
    return { ...prevState,title: data[category].Questions[randomIndex] }
  });

}

  return (
    <>
          <div className="flashcard_container">   
                <div className="flashcard_title">Inspiratie momentje</div>  


                <div className="flashcard_category_grid">
                     <button className="flashcard_category_btn" onClick={(e)=>{start_newcategory(data.Kindertijd.Questions.length,'Kindertijd')}} >Kindertijd</button>
                      <button className="flashcard_category_btn" onClick={(e)=>{start_newcategory(data.Huwelijk.Questions.length,'Huwelijk')}} >Huwelijk</button>
                      <button className="flashcard_category_btn" onClick={(e)=>{start_newcategory(data.Werk.Questions.length,'Werk')}}>Job</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data['Familie'].Questions.length,'Familie')}}>Familie</button>
                      <button className="flashcard_category_btn" onClick={(e)=>{start_newcategory(data["Inspiratie"].Questions.length,'Inspiratie')}}>Inspiratie</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data["Moeilijke momenten"].Questions.length,'Moeilijke momenten')}}>Moeilijke momenten</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data['VrijeTijd'].Questions.length,'VrijeTijd')}}>Vrije Tijd</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data["Visie en dromen"].Questions.length,'Visie en dromen')}}>Visie en dromen</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data["Cultuur,boeken, muziek en films"].Questions.length,'Cultuur,boeken, muziek en films')}}>Cultuur,boeken, muziek en films</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data['DeOorlog'].Questions.length,'DeOorlog')}}>De oorlog</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data['Religie, waarden & geloof'].Questions.length,'Religie, waarden & geloof')}}>Religie, waarden en geloof</button>
                      <button className="flashcard_category_btn"  onClick={(e)=>{start_newcategory(data["Mijn Leven vandaag"].Questions.length,'Mijn Leven vandaag')}}>Mijn Leven vandaag</button>

                  </div>

              <div className="flashcard_question_container">
                {/* TODO: error oplossen van data[category] */}
                <div className="flashcard_question">''{data[category].Questions[cursor]}''</div>   
                <button className='flashcard_question_btn' onClick={(e:any)=>change_cursor()} > volgende vraag  <BsArrowRight className='flashcard_question_btn_icon' /> </button>
                </div>

  
     
                 <div className="flashcard_btn_container">
                  <div onClick={(e)=>{goto_content();setmodalState('content');} } className="flashcard_inspiration_btn" ><BsCheck className='flashcard_icon_btn' /> <div className='flashcard_text_btn'> Gebruik inspiratie </div></div>
                  <div onClick={(e)=>{setmodalState('content')}} className="flashcard_media_btn"><div className='flashcard_text_btn'>Terug naar herinnering</div>  <BsArrowRight className='flashcard_icon_btn' /></div>
                </div>

        </div>         


        
            
    </>
  );
};

export default WithApollo({ ssr: false })(CreateContent_Question);

