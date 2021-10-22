import Link from "next/link";
import SimplifyNumber from "simplify-number";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ServerCard(props) {
  return (
    <Link href={`/server/${props.server_id}`} passHref>
      <div className="flex flex-row items-center justify-start p-3 space-x-4 hover:bg-white hover:bg-opacity-[0.04] rounded-[6px] cursor-pointer select-none transition duration-300">
        <img
          src={props.favicon || "/images/default_server_favicon.png"}
          alt={`${props.name}'s Logo`}
          className="rounded-full w-[64px] h-[64px]"
        />
        <div className="flex flex-col items-start justify-start">
          <span className="text-[24px] text-white text-opacity-80">{props.name}</span>
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="flex flex-row items-center justify-start space-x-1">
              <i className="far fa-arrow-alt-up text-[16px] text-white text-olive-500" />
              <span className="text-[16px] text-white text-opacity-80">
                {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
              </span>
            </div>
            <div className="flex flex-row items-center justify-start space-x-1">
              <i className="far fa-user text-[16px] text-white text-olive-500" />
              <span className="text-[16px] text-white text-opacity-80">
                {SimplifyNumber(props.players_online, { decimal: 1 })}
              </span>
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
      <div className="flex flex-row items-center justify-start p-3 space-x-4 select-none">
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
