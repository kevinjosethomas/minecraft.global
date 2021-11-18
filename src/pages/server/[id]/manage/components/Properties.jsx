export default function Properties(props) {
  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">Server Properties</p>
        <p className="text-lg text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <div className="flex flex-col items-start justify-start min-w-[450px]">
        <Checkbox
          label="Whitelisted"
          value={props.details.whitelisted}
          toggle={() => props.setDetails((d) => ({ ...d, whitelisted: !d.whitelisted }))}
        />
        <Checkbox
          label="Bedrock Edition"
          value={props.details.bedrock}
          toggle={() => props.setDetails((d) => ({ ...d, bedrock: !d.bedrock }))}
        />
        <Checkbox
          label="Cracked"
          value={props.details.cracked}
          toggle={() => props.setDetails((d) => ({ ...d, cracked: !d.cracked }))}
        />
      </div>
    </div>
  );
}

function Checkbox(props) {
  return (
    <div className="flex flex-row items-center justify-between space-x-2">
      <div
        className={`flex flex-col items-center justify-center w-6 h-6 ${
          props.value
            ? "bg-olive-900 border-2 border-white border-opacity-20"
            : "bg-white bg-opacity-10 border-2 border-white border-opacity-20"
        } cursor-pointer rounded`}
        onClick={props.toggle}
      >
        {props.value && <i className="far fa-check text-xs text-white text-opacity-60" />}
      </div>
      <p className="text-2xl text-white text-opacity-80">{props.label}</p>
    </div>
  );
}
