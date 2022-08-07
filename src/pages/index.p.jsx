import { useEffect } from "react";
import { useRouter } from "next/router";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import { GetSearchResults } from "api/search";
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
    <Default user={props.user} title="Home - Minecraft Server List" search>
      <div className="flex w-full items-start justify-center md:space-x-8">
        <Servers user={props.user} servers={props.servers} />
        <Sidebar />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data] = await Promise.all([
      GetLoggedInUser(ctx),
      GetSearchResults({
        amount: 6,
        sort: "upvotes",
        track_tags: false,
      }),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          servers: data[0].payload.entries,
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          servers: data[0].payload.entries,
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
