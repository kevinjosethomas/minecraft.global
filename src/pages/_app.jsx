import axios from "axios";
import Head from "next/head";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/tailwind.css";

const queryClient = new QueryClient();
axios.defaults.headers.common["Authorization"] = process.env.AUTH_TOKEN;

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>minecraft.mc</title>

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />

        {/* Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/ajr2dzo.css" />

        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.15.1/css/all.css"
        />

        {/* Twmemoji Awesome */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/twemoji-awesome@1.0.6/dist/twemoji-awesome.min.css"
        />
      </Head>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
