import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";

import Navbar from "ui/components/Navbar/Navbar";
import Footer from "ui/components/Footer/Footer";
import SearchBox from "ui/components/SearchBox/SearchBox";

const Default = (props) => {
  const router = useRouter();

  return (
    <Fragment>
      {!router.pathname.toLowerCase().startsWith("/server/[id]") && (
        <Head>
          <title>
            {props.title ||
              "Minecraft Server List - Discover the best Minecraft Servers"}
          </title>
          <meta
            name="title"
            content="minecraft.global - Find the best Minecraft Servers"
          />
          <meta
            property="og:title"
            content="minecraft.global - Find the best Minecraft Servers"
          />
          <meta
            property="twitter:title"
            content="minecraft.global - Find the best Minecraft Servers"
          />
        </Head>
      )}
      {props.noindex && (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      )}
      <div className="flex w-full flex-col items-center justify-start overflow-x-hidden">
        <div className="bg-gradient absolute top-0 left-0 h-full w-full" />
        <div className="z-[1] flex h-full w-full flex-col items-center justify-start space-y-6 px-4 pb-10 md:w-1200 md:space-y-10 md:px-0 md:pb-20">
          <Navbar user={props.user} />
          {props.search && <SearchBox header={props.header} />}
          <div className="flex h-full w-full flex-col items-start justify-start">
            {props.children}
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Default;
