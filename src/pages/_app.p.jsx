import Error from "next/error";
import Script from "next/script";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";

import "ui/styles/tailwind.css";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }) {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error || 500} />;
  }

  return (
    <Fragment>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QC7CZYZV5P"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QC7CZYZV5P');
        `}
      </Script>
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
