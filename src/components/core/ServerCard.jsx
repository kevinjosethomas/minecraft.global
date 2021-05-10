import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ServerCard(props) {
  return (
    <div className="flex flex-col items-center justify-center w-96 h-72">
      <div className="flex flex-row items-center justify-start w-full h-3/5 px-4 space-x-4 bg-dark-70">
        <div className="relative flex flex-col items-center justify-center">
          <img
            src={props.favicon || "/images/default_favicon.png"}
            onError={(e) => (e.target.src = "/images/default_favicon.png")}
            className="w-20 z-10 rounded"
          />
          <div
            className={`absolute top-[-0.25rem] right-[-0.25rem] w-3 h-3 z-50 ${
              props.online ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-semibold text-xl text-gray-300">{props.name}</h1>
          <span className="font-semibold text-sm text-gray-400">
            {props.player_names.length} players
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-2/5 bg-dark-60"></div>
    </div>
  );
}

function ServerCardSkeleton(props) {
  return (
    <SkeletonTheme color="#232323" highlightColor="#282828">
      <div className="flex flex-col items-center justify-center w-96 h-88 rounded">
        <div className="flex flex-col items-center justify-center w-full h-4/5 p-8 space-y-5 bg-dark-70 rounded-t-md">
          <div className="flex flex-row items-center justify-start w-full space-x-4">
            <Skeleton width={80} height={80} />
            <div className="flex flex-col items-start justify-start">
              <h1 className="font-semibold text-xl text-gray-300">
                <Skeleton width={200} duration={2} />
              </h1>
              <span className="font-semibold text-sm text-gray-400">
                <Skeleton width={100} duration={1.5} />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center w-full">
            <Skeleton width={300} duration={2} count={2} />
            <Skeleton width={260} duration={2} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-1/5 bg-dark-60 rounded-b-md">
          <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.01]"></div>
          <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.03]"></div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export { ServerCardSkeleton };
export default ServerCard;
