import Skeleton from "react-loading-skeleton";

type DescriptionProps = {
  description: string;
};

function Description(props: DescriptionProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start w-full overflow-hidden">
      <span className="font-medium text-[0.85rem] md:text-sm 2xl:text-base text-gray-400 break-anywhere">
        {props.description}
      </span>
    </div>
  );
}

function DescriptionSkeleton({ is1280p, isMobile }: any): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start">
      <Skeleton count={3} width={isMobile ? 268 : is1280p ? 296 : 332} />
      <Skeleton width={isMobile ? 220 : is1280p ? 200 : 256} />
    </div>
  );
}
export default Description;
export { DescriptionSkeleton };
