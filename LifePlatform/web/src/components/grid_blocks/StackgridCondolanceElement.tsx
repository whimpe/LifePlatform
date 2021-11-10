import { useRouter } from "next/router";
import React from "react";
import { Condolatie } from "../../generated/graphql";
import { formatDate_text } from '../../utils/FormatDate';
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { WithApollo } from "../../utils/withApollo";
import { MediaDisplay } from "../general/MediaDisplay";


interface StackgridCondolanceElementProps {
  condo: Condolatie;
  
}

const StackgridCondolanceElement: React.FC<StackgridCondolanceElementProps> = ({
  condo: condo,
  
}) => {
  
  const public_token = useGetStringFromUrl("public_token");
  const router = useRouter();      
    
  return (
    <div key={condo.id} className='stackgrid_condolence_box' >           
          {/* add media if includes */}
          {!condo.media[0] ? null : (<MediaDisplay awsUrl={condo.media[0].urlFile} width={'100%'} type={condo.media[0].mediaType}/> ) }
            <div className='condolence_textpreview_box'>   
              <div className="condolence_text">{condo.text}</div>
            <div className="condolence_box_author"> {condo.creator.username}</div>
            <div className="condolence_box_date"> {formatDate_text(condo.createdAt)} </div>

          </div>


      </div>
  );
};
export default WithApollo({ ssr: false })(StackgridCondolanceElement);

