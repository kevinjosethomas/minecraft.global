import Head from "next/head";
import { ToastProvider } from "react-toast-notifications";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "../assets/styles/tailwind.css";

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QC7CZYZV5P"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QC7CZYZV5P');
            `,
          }}
        />

        <title>minecraft.global</title>

        <meta name="title" content="minecraft.global -  Minecraft Server List" />
        <meta
          name="description"
          content="minecraft.global is an advanced Minecraft server listing site that will help you find the perfect Minecraft server, or advertise yours!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minecraft.global/" />
        <meta property="og:title" content="minecraft.global -  Minecraft Server List" />
        <meta
          property="og:description"
          content="minecraft.global is an advanced Minecraft server listing site that will help you find the perfect Minecraft server, or advertise yours!"
        />
        <meta property="og:image" content="/images/embed.png" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://minecraft.global/" />
        <meta property="twitter:title" content="minecraft.global -  Minecraft Server List" />
        <meta
          property="twitter:description"
          content="minecraft.global is an advanced Minecraft server listing site that will help you find the perfect Minecraft server, or advertise yours!"
        />
        <meta property="twitter:image" content="/images/embed.png" />

        {/* Add favicon to tab */}
        <link rel="shortcut icon" type="image/svg+xml" href="/images/logo.svg" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />

        {/* Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/ajr2dzo.css" />

        {/* FontAwesome */}
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.1/css/all.css" />

        {/* Twmemoji Awesome */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/twemoji-awesome@1.0.6/dist/twemoji-awesome.min.css"
        />
      </Head>
      <ToastProvider placement="bottom-right" autoDismiss="true">
        <Component {...pageProps} />
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
