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
          Tawk_API.disableAttentionGrabber = true;
          Tawk_API.onLoad = function(){
            try {
              if (typeof Tawk_API.hideAttentionGrabber === 'function') {
                Tawk_API.hideAttentionGrabber();
              }
            } catch(e) {}
          };
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6a8aab3e32c63a3448b6184a/1k0mqprqi';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}


