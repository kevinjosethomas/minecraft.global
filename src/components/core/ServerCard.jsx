import Link from "next/link";
import ReactTooltip from "react-tooltip";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ServerCard(props) {
  const { addToast } = useToasts();

  return (
    <div className="flex flex-col items-center justify-between w-80 md:w-124 lg:w-112 xl:w-124 2xl:w-112 3xl:w-124 h-72 bg-dark-70 overflow-hidden rounded-xl">
      <ReactTooltip
        effect="solid"
        className="server-status-tooltip"
        backgroundColor="#000"
        arrowColor="#000"
      />
      <div className="flex flex-col items-start justify-start w-full h-23/30 p-8 space-y-4">
        <div className="flex flex-row items-center justify-start w-full space-x-4 select-none">
          <div className="relative flex flex-col items-center justify-center">
            <img
              src={props.favicon || "/images/default_favicon.png"}
              className="w-12 md:w-24 min-w-[3rem] md:min-w-[6rem] rounded-full server-status-favicon"
              onError={(e) => (e.target.src = "/images/default_favicon.png")}
              draggable="false"
            />
            <div
              className={`absolute w-4 md:w-8 h-4 md:h-8 -bottom-0.5 md:-bottom-1 -right-0.5 md:-right-1 ${
                props.online ? "bg-green-500" : "bg-red-500"
              } rounded-full border-4 md:border-8 border-dark-70`}
              data-tip={props.online ? "Online" : "Offline"}
            />
          </div>
          <div className="flex flex-col items-start justify-center space-y-1">
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-start space-x-3">
                <h1 className="font-proxima font-bold md:text-xl text-gray-300">
                  {props.name}
                </h1>
                <div
                  className="flex flex-row items-center justify-center rounded-full px-3 space-x-1 bg-dark-80 bg-opacity-[0.8]"
                  data-tip="Upvotes"
                >
                  <i className="fas fa-angle-up text-olive-50" />
                  <h6 className="font-proxima font-bold text-gray-400 cursor-default">
                    {props.monthly_votes || 0}
                  </h6>
                </div>
              </div>
              <span className="font-proxima font-bold text-sm md:text-sm text-gray-400">
                {props.players_online || 0} players
              </span>
            </div>
            <div className="hidden md:flex flex-row items-center justify-start space-x-2">
              {props.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-center px-2 py-1 bg-dark-80"
                >
                  <span className="font-semibold text-xs text-gray-400">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex md:hidden flex-row items-center justify-start space-x-2">
          {props.tags.map((tag, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center px-2 py-1 bg-dark-80"
            >
              <span className="font-semibold text-xs text-gray-400">{tag}</span>
            </div>
          ))}
        </div>
        <p className="font-medium text-xs md:text-sm text-gray-400">
          {props.description}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full h-7/30 cursor-pointer select-none">
        <CopyToClipboard
          text={props.host + ":" + props.port}
          onCopy={() =>
            addToast(
              `Copied ${props.host + ":" + props.port} to your clipboard!`,
              {
                appearance: "success",
              }
            )
          }
        >
          <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.02]">
            <span className="font-proxima font-semibold text-lg md:text-xl text-gray-450">
              COPY IP
            </span>
          </div>
        </CopyToClipboard>
        <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.04]">
          <span className="font-proxima font-semibold text-lg md:text-xl text-gray-450">
            VIEW SERVER
          </span>
        </div>
      </div>
    </div>
  );
}

function ServerCardSkeleton(props) {
  return (
    <SkeletonTheme color="#232323" highlightColor="#282828">
      <div className="flex flex-col items-center justify-between w-124 h-72 bg-dark-70 overflow-hidden rounded-xl">
        <div className="flex flex-col items-start justify-between w-full h-23/30 p-8">
          <div className="flex flex-row items-center justify-start w-full space-x-4">
            <div className="relative flex flex-col items-center justify-center">
              <Skeleton width={96} height={96} circle={true} />
              <div
                className={`absolute w-8 h-8 -bottom-1 -right-1 bg-dark-60 rounded-full border-8 border-dark-70`}
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-start space-x-3">
                <Skeleton width={150} height={18} />
              </div>
              <Skeleton width={100} />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <Skeleton width={400} count={2} />
            <Skeleton width={300} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-7/30 cursor-pointer select-none">
          <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.02]"></div>
          <div className="flex flex-row items-center justify-center w-1/2 h-full bg-white bg-opacity-[0.04]"></div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export { ServerCardSkeleton };
export default ServerCard;
