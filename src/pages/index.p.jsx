import { useEffect } from "react";
import { useRouter } from "next/router";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import Servers from "./home/components/Servers";
import Sidebar from "ui/components/Sidebar/Sidebar";

export default function Home(props) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      router.replace("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Home - Minecraft Server List"
      search
      header
    >
      <div className="flex flex-row items-start justify-center w-full md:space-x-8">
        <Servers user={props.user} defaultResults={props.defaultResults} />
        <Sidebar />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData();

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
