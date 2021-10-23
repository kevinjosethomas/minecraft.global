import SimplifyNumber from "simplify-number";

export default function Identity(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full h-[66px] ">
      <div className="flex flex-col items-start justify-start">
        <h3 className="text-[28px] text-white text-opacity-90">{props.name}</h3>
        <Meta monthly_votes={props.monthly_votes} players_online={props.players_online} />
      </div>
      <CopyButton host={props.host} port={props.port} />
    </div>
  );
}

function Meta(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-4 select-none">
      <div className="flex flex-row items-center justify-start space-x-1">
        <i className="far fa-arrow-alt-up text-[16px] text-olive-500" />
        <span className="text-[16px] text-white text-opacity-80">
          {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
        </span>
      </div>
      <div className="flex flex-row items-center justify-start space-x-1">
        <i className="far fa-user text-[16px] text-olive-500" />
        <span className="text-[16px] text-white text-opacity-80">
          {SimplifyNumber(props.players_online, { decimal: 1 })}
        </span>
      </div>
    </div>
  );
}

function CopyButton(props) {
  const onClick = (e) => {
    e.preventDefault();
    const ip = !props.port || props.port === 25565 ? props.host : `${props.host}:${props.port}`;
    navigator.clipboard.writeText(ip);
  };

  return (
    <div
      className="flex flex-row items-center justify-center px-4 py-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300"
      onClick={onClick}
    >
      <span className="font-medium text-[18px] text-white">Copy IP</span>
    </div>
  );
}
