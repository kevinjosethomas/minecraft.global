import Head from "next/head";
import { useState } from "react";

import tags from "lib/tags.json";
import Sort from "./components/Sort";
import Filter from "./components/Filter";
import Default from "ui/layouts/Default";
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
          content={`The best ${
            props.tag
          } minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />

        <meta property="og:image" content="/images/embed.png" />
        <meta
          name="og:description"
          content={`The best ${
            props.tag
          } minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />
        <meta property="twitter:image" content="/images/embed.png" />
        <meta
          name="twitter:description"
          content={`The best ${
            props.tag
          } minecraft servers! ${props.results.entries
            .map((s) => s.name)
            .join(", ")}`}
        />
      </Head>
      <div className="flex w-full items-start justify-center space-x-8">
        <Servers
          tag={props.tag}
          user={props.user}
          results={props.results}
          parameters={parameters}
        />
        <div className="flex min-w-[400px] max-w-[400px] flex-col items-start justify-start space-y-6">
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
    const tag = ctx.params.tag;

    const found = tags.find((t) => t.name.toLowerCase() === tag.toLowerCase());

    if (!found) {
      return {
        props: {
          error: 404,
        },
      };
    }

    const [user, results] = await Promise.all([
      GetLoggedInUser(ctx),
      GetSearchResults({
        // tags: encodeURIComponent(tag),
        tag: tag,
        amount: 12,
      }),
    ]);

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
        },
      };
    } else {
      return {
        props: {
          tag: tag,
          user: user[0],
          results: results[0].payload,
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
