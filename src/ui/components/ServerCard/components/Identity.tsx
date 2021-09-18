import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

type IdentityProps = {
  favicon: string;
  name: string;
  online: boolean;
};

function Identity(props: IdentityProps): JSX.Element {
  return (
    <>
      <ReactTooltip
        effect="solid"
        className="!bg-dark-600 !border-2 !border-gray-800 !text-gray-300 !font-medium"
      />
      <div className="flex flex-row items-center justify-start w-full space-x-4 overflox-x-hidden whitespace-nowrap">
        <div className="relative flex flex-col items-center justify-center overflow-elipsis">
          <div
            className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 z-50 rounded-full ${
              props.online ? "bg-olive-500" : "bg-red-400"
            } border-4 border-dark-600`}
            data-tip={props.online ? "Online" : "Offline"}
          />
          <div className="absolute w-16 h-16 z-30 bg-dark-300 bg-opacity-30 rounded" />
          <img
            src={props.favicon || "/images/default_server_favicon.png"}
            alt={props.name}
            className="w-16 h-16 min-w-[4rem] rounded"
          />
        </div>
        <span className="font-bold text-5xl text-gray-300 tracking-tight truncate">
          {props.name}
        </span>
      </div>
    </>
  );
}

export default Identity;
