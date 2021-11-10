import React from 'react'


interface General_InformationProps {
    data: any;
    withTitle:boolean;
  }
  

  export const General_Information: React.FC<General_InformationProps> = ({data,withTitle}) => {

    return (
        <>
        <div className='general_information_container'>
        {withTitle ? 
            <div className="general_title_container">
                <div className="general_main_title">{data.main_title}</div>
                <div className="general_main_subtitle">{data.sub_title}</div>
            </div>
             :null}
          
            <>
            <div className="general_text_box">
                <div className="general_text_first">{data.text_first}</div>
                <div className="general_text_second">{data.text_second}</div>
            </div>
            </>
           
            {withTitle ?
            <>
            <div className="main_information_container">
              <div className="main_information_img_box">
                <img src={data.img_left} className="main_information_img_left" />

              </div>
              
            
          {/* TODO: tekst aanpassen */}
                <div className="main_information_box">
                Aeterna is eigenlijk een <b> moderne versie van een fotoboek</b>, maar dan met maximaal gebruik van de mogelijkheden van het internet. Zo kan je zowel audio en video integreren en het interactief maken.
                <br/>
                <br/>Het is meer dan enkel en alleen herinneringen verzamelen. <b>Samen de mooie momenten herbeleven </b>zonder dat de mooie momenten verloren kunnen gaan.
                </div>

              
                <div className="main_information_img_box">
                    <img src={data.img_right} className="main_information_img_right" />
                </div>
            </div>    
            </>
            :null}
            
                   
        </div>
        </>
    )
}

export default General_Information
