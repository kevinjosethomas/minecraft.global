import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Input(props) {
  return (
    <div className="flex w-full flex-row items-start justify-between space-x-8">
      <ReactTooltip
        effect="solid"
        className="!rounded-md !border-2 !border-olive-930 !bg-olive-800 !text-white !text-opacity-90"
      />
      <div className="!ml-0 flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          {props.label}
          {props.required && (
            <span className="ml-1 select-none text-xl text-red-800">*</span>
          )}
          {props.premium && (
            <i
              className="fad fa-diamond ml-2 text-2xl text-olive-500"
              data-tip="Premium Feature"
            />
          )}
        </p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          {props.description}
        </p>
      </div>
      <input
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none min-h-[60px] min-w-[450px] rounded-md border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-4 text-lg text-white text-opacity-80"
      />
    </div>
  );
}
