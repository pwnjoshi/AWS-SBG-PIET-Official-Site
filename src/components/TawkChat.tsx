"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <Script
      id="tawk-to-live-chat"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6a8a9a9fbf875a344567a650/1k0mmo1ls';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}


