import Head from "next/head";
import { Fragment } from "react";

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>minecraft.mc</title>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default App;
