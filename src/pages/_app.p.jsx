import Head from "next/head";
import Error from "next/error";
import Script from "next/script";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import "ui/styles/tailwind.css";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (pageProps.error) {
    return <Error statusCode={pageProps.error || 500} />;
  }

  return (
    <Fragment>
      <Head>
        <title>Minecraft Server List - minecraft.global</title>

        {!router.pathname.toLowerCase().startsWith("/server/[id]") ? (
          <Fragment>
            <meta
              name="keywords"
              content="minecraft, minecraft servers, minecraft server list, cracked minecraft, bedrock minecraft servers"
            />
            <meta
              name="description"
              content="A Minecraft server list with advanced search & recommendation features to help players find the perfect servers to play on!"
            />

            <meta property="og:image" content="/images/embed.png" />
            <meta
              property="og:description"
              content="A Minecraft server list with advanced search & recommendation features to help players find the perfect servers to play on!"
            />

            <meta property="twitter:image" content="/images/embed.png" />
            <meta
              property="twitter:description"
              content="A Minecraft server list with advanced search & recommendation features to help players find the perfect servers to play on!"
            />
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="minecraft.global" />
        <meta property="og:url" content="https://minecraft.global/" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://minecraft.global/" />

        <link rel="shortcut icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
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
