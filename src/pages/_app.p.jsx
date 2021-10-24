import Error from "next/error";
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
      <Toaster position="bottom-right" />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
