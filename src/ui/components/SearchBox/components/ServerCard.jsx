import Link from "next/link";
import SimplifyNumber from "simplify-number";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ServerCard(props) {
  return (
    <Link href={`/server/${props.server_id}`} passHref>
      <div className="flex cursor-pointer select-none flex-row items-center justify-start space-x-4 rounded-[6px] p-3 transition duration-300 hover:bg-white hover:bg-opacity-[0.04]">
        <img
          src={props.favicon || "/images/default_server_favicon.png"}
          alt={`${props.name}'s Logo`}
          className="h-[64px] w-[64px] rounded-full"
        />
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-2xl text-white text-opacity-80">{props.name}</h2>
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="flex flex-row items-center justify-start space-x-1">
              <i className="far fa-arrow-alt-up text-base text-white text-olive-500" />
              <p className="text-base text-white text-opacity-80">
                {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
              </p>
            </div>
            <div className="flex flex-row items-center justify-start space-x-1">
              <i className="far fa-user text-base text-white text-olive-500" />
              <p className="text-base text-white text-opacity-80">
                {SimplifyNumber(props.players_online, { decimal: 1 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const ServerCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#25312D" highlightColor="#1E2A26">
      <div className="flex select-none flex-row items-center justify-start space-x-4 p-3">
        <Skeleton width={64} height={64} circle />
        <div className="flex flex-col items-start justify-start space-y-1">
          <Skeleton width={200} height={20} />
          <div className="flex flex-row items-center justify-start space-x-3">
            <Skeleton width={70} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export { ServerCardSkeleton };
