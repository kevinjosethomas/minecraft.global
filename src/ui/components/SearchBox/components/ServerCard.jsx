import Link from "next/link";
import SimplifyNumber from "simplify-number";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ServerCard(props) {
  return (
    <Link href={`/server/${props.server_id}`} passHref>
      <div className="flex cursor-pointer select-none items-center justify-start space-x-4 rounded-lg bg-black bg-opacity-10 px-5 py-4 transition duration-300 hover:bg-opacity-20">
        <img
          src={props.favicon || "/images/default_server_favicon.png"}
          alt={`${props.name}'s Logo`}
          className="h-[64px] w-[64px] rounded-full"
        />
        <div className="flex flex-col items-start justify-start overflow-hidden">
          <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-2xl text-white">
            {props.name}
          </h2>
          <div className="flex items-center justify-start space-x-3">
            <div className="flex items-center justify-start space-x-1">
              <i className="fas fa-arrow-alt-up text-base text-white text-olive-600" />
              <p className="text-base text-white text-opacity-80">
                {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
              </p>
            </div>
            <div className="flex items-center justify-start space-x-1">
              <i className="fas fa-user text-base text-white text-olive-600" />
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
    <SkeletonTheme baseColor="#112118" highlightColor="#0F1818">
      <div className="flex select-none items-center justify-start space-x-4 rounded-lg bg-black bg-opacity-10 p-3 px-4 py-4">
        <Skeleton width={64} height={64} circle />
        <div className="flex flex-col items-start justify-start space-y-1">
          <Skeleton width={200} height={20} />
          <div className="flex items-center justify-start space-x-3">
            <Skeleton width={70} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export { ServerCardSkeleton };
