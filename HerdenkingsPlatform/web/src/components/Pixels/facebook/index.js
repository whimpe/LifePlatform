import React from 'react'
import Head  from 'next/head'

import FACEBOOK_PIXEL_1 from './facebook/pixel-1'

// https://medium.com/@bvodola/how-to-use-facebook-pixel-with-next-js-bff1d2ad7e97

export default ({name}) => {

  return(
    <Head>
      {name === 'FACEBOOK_PIXEL_1' && <FACEBOOK_PIXEL_1 />}
    </Head>
  )
}