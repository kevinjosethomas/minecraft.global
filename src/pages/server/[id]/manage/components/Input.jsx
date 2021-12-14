import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Input(props) {
  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <ReactTooltip
        effect="solid"
        className="!bg-olive-800 !border-2 !border-olive-930 !text-white !text-opacity-90 !rounded-md"
      />
      <div className="flex flex-col items-start justify-start !ml-0">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && <p className="ml-1 text-xl text-red-800 select-none">*</p>}
          {props.premium && (
            <i className="fad fa-diamond ml-2 text-2xl text-olive-500" data-tip="Premium Feature" />
          )}
        </p>
        <p className="text-lg text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <input
        value={props.value}
        onChange={props.onChange}
        className="min-w-[450px] min-h-[50px] p-3 text-lg text-white text-opacity-80 bg-white bg-opacity-5 border-2 border-white border-opacity-10 focus:outline-none rounded-md"
      />
    </div>
  );
}
