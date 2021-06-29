import { Fragment } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import getAuth from "../../../api/auth";
import getUser from "../../../api/user/[id]";
import StandardLayout from "../../../layouts/Standard";
import ServerCard, { ServerCardSkeleton } from "../../../components/core/ServerCard";

function User(props) {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(["User", id], () => getUser(id));

  if (error) {
    return "sus";
  }

  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-col items-start justify-start w-full py-16 md:py-32 md:px-10 lg:px-20 2xl:px-56 space-y-16 bg-dark-80">
        <div className="flex flex-col md:flex-row items-center justify-start w-full space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col items-center justify-center">
            {isLoading ? (
              <SkeletonTheme color="#222822" highlightColor="#2C322C">
                <Skeleton width={128} height={128} />
              </SkeletonTheme>
            ) : (
              <img
                src={
                  data.payload.minecraft_uuid
                    ? `https://crafatar.com/avatars/${data.payload.minecraft_uuid}`
                    : "/images/default_user.png"
                }
                alt="player"
                className="w-32"
              />
            )}
          </div>
          <SkeletonTheme color="#222822" highlightColor="#2C322C">
            <div className="flex flex-col items-start justify-center">
              {isLoading ? (
                <Skeleton width={150} height={18} />
              ) : (
                <span className="font-bold text-3xl md:text-4xl text-gray-300">
                  {data.payload.name}
                </span>
              )}
              {isLoading ? (
                <Fragment>
                  <Skeleton width={400} />
                  <Skeleton width={400} />
                  <Skeleton width={300} />
                </Fragment>
              ) : (
                <p className="max-w-xs overflow-hidden md:text-xl text-gray-400">
                  {data.payload.description}
                </p>
              )}
            </div>
          </SkeletonTheme>
        </div>
        {(isLoading || data.payload.servers.length) && (
          <div className="flex flex-col items-center md:items-start justify-center w-full space-y-6 p-2 md:p-10 md:bg-dark-70 md:bg-opacity-50 rounded-md">
            {isLoading ? (
              <SkeletonTheme color="#222822" highlightColor="#2C322C">
                <Skeleton width={300} height={30} />
              </SkeletonTheme>
            ) : (
              <span className="font-bold text-2xl md:text-4xl text-gray-300">
                <i className="twa twa-1f389" /> {data.payload.name}'s servers
              </span>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 w-full gap-10 2xl:gap-5 3xl:gap-10 place-items-center">
              {isLoading ? (
                <Fragment>
                  {[...Array(6)].map((el, index) => (
                    <ServerCardSkeleton key={index} />
                  ))}
                </Fragment>
              ) : (
                <Fragment>
                  {data.payload.servers.map((server, index) => (
                    <ServerCard key={index} {...server} />
                  ))}
                </Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);
  return {
    props: {
      user: user.payload,
    },
  };
}

export default User;
