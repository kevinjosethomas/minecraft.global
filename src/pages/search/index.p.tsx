import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";

import Tags from "./modals/Tags";
import RefineModal from "./modals/Refine";
import { Server } from "lib/types";
import SearchServers from "api/search";
import GetLoggedInUser from "api/auth";
import Refine from "./components/Refine";
import Default from "ui/layouts/Default";
import Navigation from "./components/Navigation";
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
    sort: router.query.sort || "players", // sort players (default), upvotes, growth
    online: true, // filter by online servers
    premium: router.query.filter?.includes("premium") ? true : false, // filter by premium servers
    whitelisted: router.query.filter?.includes("whitelisted") ? true : false, // filter by whitelisted servers
    bedrock: router.query.filter?.includes("bedrock") ? true : false, // filter by bedrock servers
    cracked: router.query.filter?.includes("cracked") ? true : false, // filter by cracked servers
    tags: [], // stringified list of tags
  });

  useEffect(() => {
    setParameters({ ...parameters, offset: page * 12 - 12 });
  }, [page]);

  const [tagsModal, showTagsModal] = useState(false);
  const [refineModal, showRefineModal] = useState(false);

  const { isLoading, error, data }: Record<string, any> = useQuery(
    ["SearchServers", parameters],
    () => SearchServers(parameters)
  );

  useEffect(() => {
    if (tagsModal || refineModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [tagsModal, refineModal]);

  return (
    <Default background="bg-dark-700" user={props.user}>
      {tagsModal && (
        <Tags showTagsModal={showTagsModal} parameters={parameters} setParameters={setParameters} />
      )}
      {refineModal && (
        <RefineModal
          parameters={parameters}
          setParameters={setParameters}
          showRefineModal={showRefineModal}
          showTagsModal={showTagsModal}
        />
      )}
      <div
        className="fixed flex xl:hidden flex-col items-center justify-center bottom-6 right-6 w-16 h-16 z-30 bg-olive-800 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
        onClick={() => showRefineModal(true)}
      >
        <i className="fas fa-sort-size-up-alt text-2xl text-gray-300" />
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        {data && (
          <div className="flex flex-row items-center justify-between w-full space-x-4 md:space-x-0">
            <div className="flex flex-row items-center justify-start space-x-4">
              <i className="far fa-telescope text-3xl md:text-4xl text-gray-300" />
              <span className="font-medium md:text-4xl text-gray-300">
                Showing <span className="font-bold text-olive-700">{data[0].entries.length}</span>{" "}
                out of <span className="font-bold text-olive-700">{data[0].total_records}</span>{" "}
                results for &quot;
                <span className="font-bold text-olive-700">{parameters.query}</span>&quot;
              </span>
            </div>
            <Navigation
              page={page}
              setPage={setPage}
              records={data[0].entries.length}
              total_records={data[0].total_records}
            />
          </div>
        )}
        <div className="flex flex-row items-start justify-start w-full xl:space-x-10">
          <Refine
            parameters={parameters}
            setParameters={setParameters}
            showTagsModal={showTagsModal}
          />
          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 place-items-center w-full gap-y-10 3xl:gap-10">
              {data[0].entries.map((server: Server) => (
                <ServerCard key={server.server_id} {...server} user={props.user} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        {data && (
          <Navigation
            page={page}
            setPage={setPage}
            records={data[0].entries.length}
            total_records={data[0].total_records}
          />
        )}
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error]: any[] = await GetLoggedInUser(ctx);

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
