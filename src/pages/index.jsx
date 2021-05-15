import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";

import getAuth from "../api/auth";
import StandardLayout from "../layouts/Standard";
import TopServers from "../components/index/TopServers";

function Index(props) {
  const router = useRouter();
  const searchInputRef = useRef();

  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-col items-center justify-center w-full px-4 md:px-0 py-32 md:py-48 space-y-6 md:space-y-8 bg-dark-90 bg-opacity-90">
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center">
          <h1 className="max-w-3xl font-proxima font-bold text-4xl md:text-6xl xl:text-7xl text-gray-300 tracking-tight">
            Changing the Minecraft multiplayer experience
          </h1>
          <h6 className="max-w-2xl lg:max-w-3xl xl:max-w-4xl font-semibold md:text-xl xl:text-2xl text-gray-400">
            A server list that takes more than votes into account! With
            quality-control and advanced analytics, finding fun servers has
            never been this easy!
          </h6>
        </div>
        <div className="flex flex-row items-center justify-between bg-gray-300 rounded">
          <input
            className="w-full md:w-96 mx-4 placeholder-gray-400 text-sm md:text-md text-gray-400 bg-transparent rounded-l focus:outline-none"
            placeholder="Search for a cool server..."
            ref={searchInputRef}
            onKeyPress={(e) =>
              e.key == "Enter" && e.target.value
                ? router.push("/servers?q=" + e.target.value)
                : void 0
            }
          />
          <div
            className="flex flex-row items-center justify-center px-3 md:px-5 py-2 md:py-3 bg-olive-60 rounded-r cursor-pointer"
            onClick={() =>
              searchInputRef.current.value
                ? router.push("/servers?q=" + searchInputRef.current.value)
                : void 0
            }
          >
            <i className="far fa-search text-xl text-gray-200" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full py-20 md:py-32 space-y-10 bg-dark-80">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex flex-row items-center justify-center space-x-2">
            <i className="twa twa-2728 text-3xl md:text-5xl" />
            <h1 className="font-proxima font-bold text-3xl md:text-5xl text-gray-300">
              Trending Servers
            </h1>
          </div>
          <h6 className="max-w-md md:max-w-xl font-semibold text-lg md:text-2xl text-gray-400">
            These are some of the most voted Minecraft servers this month!
          </h6>
        </div>
        <TopServers />
      </div>
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-4 bg-dark-70 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="space-x-2 font-bold text-3xl md:text-5xl text-gray-300">
            <i className="far fa-rocket-launch" /> Get started now!
          </h1>
          <h6 className="max-w-xs md:max-w-xl font-medium md:font-semibold md:text-xl text-gray-400">
            Add your server to our list to get more players, advanced analytics
            and statistics about your server and a lot more!
          </h6>
        </div>
        <Link href={props.user ? "/server/new" : "/login"}>
          <a className="flex flex-row items-center justify-center px-8 py-3 bg-olive-70 rounded-md">
            <span className="font-semibold text-xl md:text-2xl text-gray-300">
              Get Started
            </span>
          </a>
        </Link>
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);
  return {
    props: {
      user: user.payload,
    },
  };
}

export default Index;
