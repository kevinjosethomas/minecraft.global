export default function Filter(props) {
  const update = (key) => {
    props.setParameters({
      ...props.parameters,
      [key]: !props.parameters[key],
    });
  };

  return (
    <div className="relative flex w-full flex-col items-start justify-start space-y-2 overflow-hidden rounded-lg border-2 border-olive-960 bg-olive-940 bg-opacity-30 py-4 px-6">
      <p
        className="text-4xl text-white"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Filter
      </p>
      <div className="flex w-full flex-col items-start justify-start space-y-0.5">
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
      <img
        alt="creeper"
        draggable="false"
        src="/images/illustrations/creeper.png"
        className="absolute right-14 -bottom-14 !m-0 w-16 rotate-[-15deg] select-none"
      />
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
          props.checked ? "bg-olive-900" : "bg-white bg-opacity-5"
        } rounded`}
      >
        {props.checked && (
          <i className="fas fa-check text-xs text-white text-opacity-80" />
        )}
      </div>
      <p className="select-none text-xl text-white text-opacity-80">
        {props.label}
      </p>
    </div>
  );
}
