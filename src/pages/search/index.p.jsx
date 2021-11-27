import { useState } from "react";

import Sort from "./components/Sort";
import Servers from "./components/Servers";
import Filter from "./components/Filter";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import { GetSearchResults } from "api/search";

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

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search header>
      <div className="flex flex-row items-start justify-center w-full space-x-8">
        <Servers user={props.user} results={props.results} parameters={parameters} />
        <div className="flex flex-col items-start justify-start in-w-[400px] max-w-[400px] space-y-6">
          <Sort parameters={parameters} setParameters={setParameters} />
          <Filter parameters={parameters} setParameters={setParameters} />
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
      GetDefaultData(ctx),
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
