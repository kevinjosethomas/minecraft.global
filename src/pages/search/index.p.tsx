import { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";

import { Server } from "lib/types";
import SearchServers from "api/search";
import GetLoggedInUser from "api/auth";
import Refine from "./components/Refine";
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
        <div className="flex flex-row items-start justify-center w-full space-x-10">
          <Refine parameters={parameters} setParameters={setParameters} />
          {data ? (
            <div className="grid grid-cols-3 place-items-center gap-10">
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
