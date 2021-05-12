import { useRouter } from "next/router";

import getAuth from "../api/auth";
import StandardLayout from "../layouts/Standard";
import TopServers from "../components/index/TopServers";

function Index(props) {
  const router = useRouter();

  return (
    <StandardLayout>
      <div className="flex flex-col items-center justify-center w-full py-48 space-y-8 bg-dark-90 bg-opacity-90">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="max-w-3xl font-proxima font-bold text-7xl text-gray-300 tracking-tight">
            Changing the Minecraft multiplayer experience
          </h1>
          <h6 className="max-w-4xl font-semibold text-2xl text-gray-400">
            A server list that takes more than votes into account! With
            quality-control and advanced analytics, finding fun servers has
            never been this easy!
          </h6>
        </div>
        <div className="flex flex-row items-center justify-between bg-gray-300 rounded">
          <input
            className="w-96 mx-4 placeholder-gray-400 text-gray-400 bg-transparent rounded-l focus:outline-none"
            placeholder="Search for a cool server..."
            onKeyPress={(e) =>
              e.key == "Enter" && e.target.value
                ? router.push("/servers?q=" + e.target.value)
                : void 0
            }
          />
          <div className="flex flex-row items-center justify-center px-5 py-3 bg-olive-60 rounded-r">
            <i className="far fa-search text-xl text-gray-200" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full py-32 space-y-10 bg-dark-80">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="flex flex-row items-center justify-center space-x-2">
            <i className="twa twa-2728 text-5xl" />
            <h1 className="font-proxima font-bold text-5xl text-gray-300">
              Trending Servers
            </h1>
          </div>
          <h6 className="max-w-xl font-semibold text-2xl text-gray-400">
            These are some of the most voted Minecraft servers this month!
          </h6>
        </div>
        <TopServers />
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);
  console.log(user);
  return {
    props: {
      user: user,
    },
  };
}

export default Index;
