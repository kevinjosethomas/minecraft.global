import Skeleton from "react-loading-skeleton";

type DescriptionProps = {
  description: string;
};

function Description(props: DescriptionProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start">
      <span className="font-medium text-sm 2xl:text-base text-gray-400">{props.description}</span>
    </div>
  );
}

function DescriptionSkeleton({ is1280p, isMobile }: any): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start">
      <Skeleton count={3} width={is1280p ? 296 : isMobile ? 268 : 332} />
      <Skeleton width={is1280p ? 200 : isMobile ? 220 : 256} />
    </div>
  );
}
export default Description;
export { DescriptionSkeleton };
