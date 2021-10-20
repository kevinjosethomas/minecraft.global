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
  results: Record<string, any>;
};

function Home(props: Home): JSX.Element {
  const router = useRouter();

  // const { data } = useQuery(["HomeResults"], GetHomeResults);

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
            title="Sponsored Servers"
            subtitle="The most involved servers right now!"
            icon="far fa-stars"
            data={props.results.sponsored}
            link="/search?sort=players"
          />
          <Listing
            user={props.user}
            title="Popular Servers"
            subtitle="The most upvoted servers right now!"
            icon="far fa-stars"
            data={props.results.popular}
            link="/search?sort=upvotes"
          />

          <Listing
            user={props.user}
            title="New Servers"
            subtitle="Recently added Minecraft servers!"
            icon="far fa-comment-alt-plus"
            data={props.results.newly}
            link="/search?sort=new"
          />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const data: any[] = await Promise.all([GetLoggedInUser(ctx), GetHomeResults()]);
    if (data[1][1]) {
      return {
        redirect: {
          destination: "/",
          permanent: true,
        },
      };
    }

    if (data[0][1]) {
      return {
        props: {
          results: {
            sponsored: data[1][0].sponsored,
            popular: data[1][0].popular,
            newly: data[1][0].newly,
          },
        },
      };
    }

    return {
      props: {
        user: data[0][0].payload,
        results: {
          sponsored: data[1][0].sponsored,
          popular: data[1][0].popular,
          newly: data[1][0].newly,
        },
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  // const [user, error]: any[] = await GetLoggedInUser(ctx);

  // if (error) {
  //   return {
  //     props: {},
  //   };
  // } else {
  //   return {
  //     props: {
  //       user: user.payload,
  //     },
  //   };
  // }
}

export default Home;
