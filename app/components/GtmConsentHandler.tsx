'use client';

import { useEffect } from 'react';
import { GTM_ID } from '../lib/gtm';

export const GTMConsentHandler = () => {
    useEffect(() => {
        const hasConsent = localStorage.getItem('gtm_consent');
        if (hasConsent === 'granted' && !window.gtmScriptLoaded) {
            console.log('Injecting GTM');

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`;

            document.head.appendChild(script);
            window.gtmScriptLoaded = true;
        }
    }, []);

    return null;
};
