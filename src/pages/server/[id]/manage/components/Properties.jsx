export default function Properties(props) {
  return (
    <div className="flex w-full items-start justify-between space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">Server Properties</p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          Select the options that apply
        </p>
      </div>
      <div className="flex min-w-[450px] flex-col items-start justify-start">
        <Checkbox
          label="Whitelisted"
          value={props.details.whitelisted}
          toggle={() =>
            props.setDetails((d) => ({ ...d, whitelisted: !d.whitelisted }))
          }
        />
        <Checkbox
          label="Cracked"
          value={props.details.cracked}
          toggle={() =>
            props.setDetails((d) => ({ ...d, cracked: !d.cracked }))
          }
        />
      </div>
    </div>
  );
}

function Checkbox(props) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div
        className={`flex h-6 w-6 flex-col items-center justify-center ${
          props.value
            ? "border-2 border-white border-opacity-20 bg-olive-900"
            : "border-2 border-white border-opacity-20 bg-white bg-opacity-10"
        } cursor-pointer rounded`}
        onClick={props.toggle}
      >
        {props.value && (
          <i className="far fa-check text-xs text-white text-opacity-60" />
        )}
      </div>
      <p className="text-2xl text-white text-opacity-80">{props.label}</p>
    </div>
  );
}
