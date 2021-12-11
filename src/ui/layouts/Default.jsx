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
            {props.title || "Minecraft Server List - Discover the best Minecraft Servers"}
          </title>
          <meta name="title" content="minecraft.global - Find the best Minecraft Servers" />
          <meta property="og:title" content="minecraft.global - Find the best Minecraft Servers" />
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
      <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
        <div className="absolute top-0 left-0 bg-gradient w-full h-full" />
        <div className="z-[1] flex flex-col items-center justify-start w-full md:w-1200 h-full space-y-4 md:space-y-10 px-4 md:px-0 pb-20 overflow-x-hidden">
          <Navbar user={props.user} />
          {props.search && (
            <SearchBox header={props.header} defaultResults={props.defaultResults} />
          )}
          <div className="flex flex-col items-start justify-start w-full h-full overflow-hidden ">
            {props.children}
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Default;
