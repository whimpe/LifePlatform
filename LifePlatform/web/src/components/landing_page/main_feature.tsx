import React from 'react'


interface Main_featureProps {
  }
  
export const Main_feature: React.FC<Main_featureProps> = ({}) => {

    return (
        <div className='main_feature_container'>
            {/* <img src={'/img/landing_page/main_feature.jpg'} className='img_main_feature'/> */}

            <div className="main_feature_text_container">
                <div className="main_feature_title_container">
                <div className="main_feature_title">Verhalen</div>
                <div className="main_feature_subtitle">verzamelen</div>
                <div className="main_feature_text"> <a className='main_quote_title_logo'>AETERNA</a> biedt een snelle en gemakkelijke oplossing om waardevolle momenten met een dierbaar familielid of vriend(in) uit het verleden te verzamelen op één centrale plek. Daar kun je je alleen of samen met anderen onderdompelen in een reeks van herinneringen en zo het leven herbeleven.</div>

                </div>

            </div>

            
        </div>
    )
}

export default Main_feature
