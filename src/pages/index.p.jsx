import { useEffect } from "react";
import { useRouter } from "next/router";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import Servers from "./home/components/Servers";
import TopTags from "./home/components/TopTags";

export default function Home(props) {
  const router = useRouter();

  // useEffect(() => {
  //   router.replace("/", undefined, { shallow: true });
  // }, []);

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search header>
      <div className="flex flex-row items-start justify-center w-full space-x-8">
        <Servers defaultResults={props.defaultResults} />
        <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px]">
          <TopTags />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    // if (ctx.query.token) {
    //   console.log("boom!");
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }

    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData(ctx);

    const responses = await Promise.all([user, data]);

    const userdata = responses[0];
    const defaultdata = responses[1];

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
          defaultResults: defaultdata[0],
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}
