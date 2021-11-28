import Head from "next/head";
import Error from "next/error";
import { Fragment } from "react";

export default function Custom404(props) {
  return (
    <Fragment>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Error statusCode={props.error || 404} />
    </Fragment>
  );
}
