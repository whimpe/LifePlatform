import React from 'react'
import { useRouter } from 'next/router';

function Footer_Logo() {
  const router = useRouter();

    return (
        
        <div className='dashboard_footer' onClick={() => { router.push('/#home'); }} >
          <img src='img/logos/logo_black.svg' alt='Aeterna' className='dashboard_footer_img' />
        </div>
    )
}

export default Footer_Logo
