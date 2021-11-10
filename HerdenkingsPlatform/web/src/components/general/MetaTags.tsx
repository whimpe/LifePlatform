import Head from 'next/head';
import React from 'react'


interface MetaTagsProps {
   title:any;
   type_of_page:any;
   description:any;
   mediaUrl:any;
}

export const MetaTags: React.FC<MetaTagsProps> = ({title,type_of_page,description,mediaUrl}) => {

    return (
      
    <Head >
        <title>{`${title} ${type_of_page}`}</title>
        <meta property="og:type"    content="website" />
        <meta property="og:title"    content={`${title}  ${type_of_page}`} />
        <meta property="og:description"    content={description} />
        <meta property="og:image"    content={mediaUrl} />
    </Head>
    )
}

export default MetaTags
