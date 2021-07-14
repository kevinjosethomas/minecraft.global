import type { AppProps } from "next/app";
import { AnimateSharedLayout } from "framer-motion";

import "../ui/styles/tailwind.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout>
      <Component {...pageProps} />
    </AnimateSharedLayout>
  );
}

export default App;
