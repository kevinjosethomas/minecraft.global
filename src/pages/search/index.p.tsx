import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import { Server } from "lib/types";
import Sort from "./components/Sort";
import SearchServers from "api/search";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import ServerCard from "ui/components/ServerCard/ServerCard";

type SearchProps = {
  user?: Record<string, any>;
};

function Search(props: SearchProps): JSX.Element {
  const router = useRouter();

  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);
  const [parameters, setParameters] = useState({
    amount: 12,
    offset: page * 12 - 12,
    query: router.query.q || null,
    sort: "players", // sort players (default), upvotes, growth
    online: true, // filter by online servers
    premium: false, // filter by premium servers
    whitelisted: false, // filter by whitelisted servers
    bedrock: false, // filter by bedrock servers
    cracked: false, // filter by cracked servers
    tags: "", // stringified list of tags
  });

  const { isLoading, error, data } = useQuery(["SearchServers", parameters], () =>
    SearchServers(parameters)
  );

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center w-80 md:w-100 p-8 space-y-5 bg-dark-800 rounded">
            <span className="font-bold text-5xl text-gray-300">Refine</span>
            <Sort />
          </div>
          {data ? (
            <div className="grid grid-cols-2 w-full justify-center items-center place-content-center content-center gap-x-5">
              {data[0].entries.map((server: Server) => (
                <ServerCard key={server.server_id} {...server} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

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

export default Search;
