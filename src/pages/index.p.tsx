import Head from "next/head";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import GetHomeResults from "api/home";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Listing from "./home/components/Listing";
import Searchbox from "ui/components/Searchbox/Searchbox";

type Home = {
  user?: Record<string, any>;
};

function Home(props: Home): JSX.Element {
  const router = useRouter();

  const { data } = useQuery(["HomeResults"], GetHomeResults);

  useEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return (
    <Default background="bg-dark-700" user={props.user}>
      <Head>
        <meta name="title" content="minecraft.global - Find the best Minecraft servers" />
        <meta property="og:title" content="minecraft.global - Find the best Minecraft servers" />
        <meta
          property="twitter:title"
          content="minecraft.global - Find the best Minecraft servers"
        />
      </Head>
      <div className="flex flex-col items-center justify-center w-full space-y-12 md:space-y-20">
        <Searchbox />
        <div className="flex flex-col items-center justify-center w-full space-y-12">
          {/* <Listing
            user={props.user}
            title="Sponsored Servers"
            subtitle="The winners of this week's auctions!"
            icon="far fa-hand-sparkles"
            data={isLoading ? null : (data as any[])[0].auctions}
            link="/search?filter=premium"
          /> */}
          <Listing
            user={props.user}
            title="Sponsored Servers"
            subtitle="Servers that are helping minecraft.global grow!"
            icon="far fa-stars"
            data={data ? (data as any[])[0].popular.entries : null}
            link="/search?sort=players"
          />
          <Listing
            user={props.user}
            title="Popular Servers"
            subtitle="The most active servers right now!"
            icon="far fa-stars"
            data={data ? (data as any[])[0].popular.entries : null}
            link="/search?sort=players"
          />
          {/* <Listing
            user={props.user}
            title="Growing Servers"
            subtitle="New and growing Minecraft servers!"
            icon="far fa-seedling"
            data={data ? (data as any[])[0].growing.entries : null}
            link="/search?sort=growth"
          /> */}
          <Listing
            user={props.user}
            title="New Servers"
            subtitle="Recently added Minecraft servers!"
            icon="far fa-comment-alt-plus"
            data={data ? (data as any[])[0].newly.entries : null}
            link="/search?sort=players"
          />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error]: any[] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  } else {
    return {
      props: {
        user: user.payload,
      },
    };
  }
}

export default Home;
