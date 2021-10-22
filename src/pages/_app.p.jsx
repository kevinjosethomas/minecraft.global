import Error from "next/error";

import "ui/styles/tailwind.css";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }) {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error || 500} />;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
