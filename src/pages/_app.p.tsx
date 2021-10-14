import Head from "next/head";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { AnimateSharedLayout } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

import "../ui/styles/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>minecraft.global</title>

        <meta name="title" content="minecraft.global -  Minecraft Server List" />
        <meta
          name="description"
          content="The best website to find new Minecraft servers to play on! Add your Minecraft server here to reach thousands of potential users!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minecraft.global/" />
        <meta property="og:title" content="minecraft.global - Find the best Minecraft servers" />
        <meta
          property="og:description"
          content="The best website to find new Minecraft servers to play on! Add your Minecraft server here to reach thousands of potential users!"
        />
        <meta property="og:image" content="/images/embed.png" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://minecraft.global/" />
        <meta
          property="twitter:title"
          content="minecraft.global - Find the best Minecraft servers"
        />
        <meta
          property="twitter:description"
          content="The best website to find new Minecraft servers to play on! Add your Minecraft server here to reach thousands of potential users!"
        />
        <meta property="twitter:image" content="/images/embed.png" />

        <link rel="shortcut icon" type="image/svg+xml" href="/images/logo.svg" />
      </Head>
      <AnimateSharedLayout>
        <Toaster position="bottom-right" />
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </QueryClientProvider>
  );
}

export default App;
