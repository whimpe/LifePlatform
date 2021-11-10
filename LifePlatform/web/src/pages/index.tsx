import React from "react";
import { Layout_LP } from "../components/landing_page/Layout_LP";
import { WithApollo } from "../utils/withApollo";

import { Router } from 'react-router-dom';
import MetaTags from "../components/general/MetaTags";


const Index = () => {
  


  return (
<>
    <MetaTags title={'Aeterna'} type_of_page={''} description={''} mediaUrl={''} />

         <Layout_LP>

           
         </Layout_LP>
        

</>
  );
};

export default WithApollo({ssr: false})(Index);
