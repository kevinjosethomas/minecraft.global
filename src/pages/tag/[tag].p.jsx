import Head from "next/head";
import { useState } from "react";

import tags from "lib/tags.json";
import Sort from "./components/Sort";
import Filter from "./components/Filter";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import Servers from "./components/Servers";
import { GetLoggedInUser } from "api/login";
import { GetSearchResults } from "api/search";
import Sidebar from "ui/components/Sidebar/Sidebar";

export default function Tag(props) {
  const [parameters, setParameters] = useState({
    sort: "upvotes",
    online: true,
    premium: false,
    whitelisted: false,
    bedrock: false,
    cracked: false,
  });

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title={`${props.tag} Servers - Minecraft Server List`}
      search
    >
      <Head>
        <meta
          name="keywords"
          content={`${props.tag} servers, ${props.tag} minecraft servers, minecraft, minecraft servers, minecraft server list, cracked minecraft, bedrock minecraft servers`}
        />
        <meta
          name="description"
          content={`The best ${props.tag} minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />

        <meta property="og:image" content="/images/embed.png" />
        <meta
          name="og:description"
          content={`The best ${props.tag} minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />
        <meta property="twitter:image" content="/images/embed.png" />
        <meta
          name="twitter:description"
          content={`The best ${props.tag} minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />
      </Head>
      <div className="flex flex-row items-start j+ustify-center w-full space-x-8">
        <Servers
          tag={props.tag}
          user={props.user}
          results={props.results}
          parameters={parameters}
        />
        <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-6">
          <Sort parameters={parameters} setParameters={setParameters} />
          <Filter parameters={parameters} setParameters={setParameters} />
          <Sidebar addServer />
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const tag = ctx.params.tag;

    const found = tags.find((t) => t.name.toLowerCase() === tag.toLowerCase());

    if (!found) {
      return {
        props: {
          error: 404,
        },
      };
    }

    const [user, data, results] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(),
      GetSearchResults({ tags: encodeURIComponent(tag), amount: 12 }),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (results[1]) {
      return {
        props: {
          error: results[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          tag: tag,
          results: results[0].payload,
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          tag: tag,
          user: user[0],
          results: results[0].payload,
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
