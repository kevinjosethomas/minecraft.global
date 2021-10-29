import { useState } from "react";

import tags from "lib/tags.json";
import Sort from "./components/Sort";
import { SearchByTag } from "api/search";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import Servers from "./components/Servers";
import { GetLoggedInUser } from "api/login";

export default function Tag(props) {
  const [sort, setSort] = useState("upvotes");

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="flex flex-row items-start j+ustify-center w-full space-x-8">
        <Servers tag={props.tag} results={props.results} />
        <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px]">
          <Sort sort={sort} setSort={setSort} />
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

    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData(ctx);
    const results = SearchByTag(tag, 12, 0);

    const [userdata, defaultdata, resultsdata] = await Promise.all([user, data, results]);

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (resultsdata[1]) {
      return {
        props: {
          error: resultsdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          tag: tag,
          results: resultsdata[0].payload,
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          tag: tag,
          user: userdata[0],
          results: resultsdata[0].payload,
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
