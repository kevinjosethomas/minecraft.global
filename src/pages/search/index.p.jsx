import { useEffect, useState } from "react";

import Sort from "./components/Sort";
import Filter from "./components/Filter";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import Servers from "./components/Servers";
import { GetLoggedInUser } from "api/login";
import { GetSearchResults } from "api/search";
import Sidebar from "ui/components/Sidebar/Sidebar";

export default function Search(props) {
  const [parameters, setParameters] = useState({
    query: props.query,
    sort: "upvotes",
    online: true,
    premium: false,
    whitelisted: false,
    bedrock: false,
    cracked: false,
  });

  useEffect(() => {
    setParameters((p) => ({ ...p, query: props.query }));
  }, [props.query]);

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title="Search - Minecraft Server List"
      search
      header
    >
      <div className="flex w-full items-start justify-center space-x-8">
        <Servers
          user={props.user}
          results={props.results}
          parameters={parameters}
        />
        <div className="hidden min-w-[400px] max-w-[400px] flex-col items-start justify-start space-y-6 md:flex">
          <Sort parameters={parameters} setParameters={setParameters} />
          <Filter parameters={parameters} setParameters={setParameters} />
          <Sidebar addServer servers={props.results.total_records} />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const query = ctx.query?.q || "";

    const [user, data, search] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(),
      GetSearchResults({ query: query, amount: 12 }),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (search[1]) {
      return {
        props: {
          error: search[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          query: query,
          results: search[0].payload,
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          query: query,
          user: user[0],
          results: search[0].payload,
          defaultResults: data[0],
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
