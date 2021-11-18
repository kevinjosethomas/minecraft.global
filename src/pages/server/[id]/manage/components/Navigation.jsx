export default function Navigation(props) {
  const screens = [
    {
      name: "details",
      label: "Details",
      icon: "far fa-pencil-paintbrush",
    },
    {
      name: "votifier",
      label: "Votifier",
      icon: "far fa-bell",
    },
    {
      name: "analytics",
      label: "Analytics",
      icon: "far fa-poll",
    },
    {
      name: "webhooks",
      label: "Webhooks",
      icon: "fab fa-discord",
    },
    {
      name: "rcon",
      label: "RCON Console",
      icon: "far fa-tools",
    },
    {
      name: "delete",
      label: "Delete",
      icon: "far fa-trash-alt",
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-80 px-5 py-8 space-y-4 bg-olive-950 border-2 border-olive-930 rounded-lg">
      <Identity name={props.name} favicon={props.favicon} />
      <div className="flex flex-col items-start justify-start w-full px-2 space-y-1.5">
        {screens.map((screen, index) => (
          <div key={index} className="flex flex-row items-center justify-start w-full space-x-2.5">
            <i
              className={`${screen.icon} w-[25px] text-xl text-center text-white text-opacity-90`}
            />
            <span className="text-xl text-white text-opacity-90">{screen.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Identity(props) {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-2">
      <img src={props.favicon} alt={`${props.name} Favicon`} className="w-10 rounded-full" />
      <h3 className="text-2xl text-white">{props.name}</h3>
    </div>
  );
}
