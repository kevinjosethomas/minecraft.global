import type { AppProps } from "next/app";
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
      <AnimateSharedLayout>
        <Component {...pageProps} />
      </AnimateSharedLayout>
    </QueryClientProvider>
  );
}

export default App;
