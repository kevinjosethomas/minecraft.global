import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import { SkeletonTheme } from "react-loading-skeleton";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

import { Server } from "lib/types";
import Tags from "./components/Tags";
import Buttons, { ButtonsSkeleton } from "./components/Buttons";
import Identity, { IdentitySkeleton } from "./components/Identity";
import Description, { DescriptionSkeleton } from "./components/Description";

function ServerCard(props: Server): JSX.Element {
  return (
    <>
      <ReactTooltip
        effect="solid"
        className="!bg-dark-600 !border-2 !border-gray-800 !text-gray-300 !font-medium"
      />
      <div
        className={`relative flex flex-col items-start justify-start w-80 lg:w-96 xl:w-88 2xl:w-96 h-84 md:h-88 xl:h-84 2xl:h-90 p-6 space-y-6 bg-dark-600 border-2 ${
          props.premium ? "border-olive-700" : "border-gray-800"
        } rounded overflow-hidden`}
      >
        <Identity favicon={props.favicon} name={props.name} online={props.online} />
        <div className="flex flex-col items-start justify-start w-full h-full space-y-3">
          <Tags
            monthly_votes={props.monthly_votes}
            players_online={props.players_online}
            tags={props.tags}
          />
          <Description description={props.description} />
        </div>
        <Buttons
          user={props.user}
          server_id={props.server_id}
          owner_id={props.owner_id}
          host={props.host}
          port={props.port}
          premium={props.premium}
        />
        {props.premium && (
          <i
            data-tip="Premium Server"
            className="fad fa-diamond text-3xl text-olive-500 absolute -top-2 right-4"
          />
        )}
      </div>
    </>
  );
}

function ServerCardSkeleton(): JSX.Element {
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 800 });
  const is1280p = useMediaQuery({ minWidth: 1280, maxWidth: 1536 });

  return (
    <SkeletonTheme color="#222730" highlightColor="#20242E">
      <div className="relative flex flex-col items-start justify-between w-80 lg:w-96 xl:w-88 2xl:w-96 h-84 md:h-88 xl:h-84 2xl:h-90 p-6 bg-dark-600 border-2 border-gray-800 rounded">
        <div className="flex flex-col items-start justify-start space-y-8">
          <IdentitySkeleton is1280p={is1280p} isMobile={isMobile} />
          <DescriptionSkeleton is1280p={is1280p} isMobile={isMobile} />
        </div>
        <ButtonsSkeleton is1280p={is1280p} isMobile={isMobile} />
      </div>
    </SkeletonTheme>
  );
}

export default ServerCard;
export { ServerCardSkeleton };
