export default function Filter(props) {
  const update = (key) => {
    props.setParameters({
      ...props.parameters,
      [key]: !props.parameters[key],
    });
  };

  return (
    <div className="flex flex-col items-start justify-start">
      <p
        className="text-3xl font-medium text-white text-opacity-90"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Filter By
      </p>
      <div className="flex w-full flex-col items-start justify-start">
        <Option
          label="Online"
          checked={props.parameters.online}
          onClick={() => update("online")}
        />
        <Option
          label="Premium"
          checked={props.parameters.premium}
          onClick={() => update("premium")}
        />
        <Option
          label="Whitelisted"
          checked={props.parameters.whitelisted}
          onClick={() => update("whitelisted")}
        />
        <Option
          label="Bedrock"
          checked={props.parameters.bedrock}
          onClick={() => update("bedrock")}
        />
        <Option
          label="Cracked"
          checked={props.parameters.cracked}
          onClick={() => update("cracked")}
        />
      </div>
    </div>
  );
}

function Option(props) {
  return (
    <div
      className="flex cursor-pointer items-center justify-start space-x-2"
      onClick={props.onClick}
    >
      <div
        className={`flex h-6 w-6 flex-col items-center justify-center ${
          props.checked ? "bg-olive-700" : "bg-white bg-opacity-10"
        } rounded`}
      >
        {props.checked && (
          <i className="fas fa-check text-xs text-white text-opacity-80" />
        )}
      </div>
      <p className="select-none text-2xl tracking-[0.015em] text-white text-opacity-80">
        {props.label}
      </p>
    </div>
  );
}
