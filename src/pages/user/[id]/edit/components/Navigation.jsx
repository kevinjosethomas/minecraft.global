export default function Navigation(props) {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-4">
      {props.screens.map((screen, index) => (
        <Title
          key={index}
          screen={screen}
          active={props.activeScreen.id === screen.id}
          setActiveScreen={props.setActiveScreen}
        />
      ))}
    </div>
  );
}

function Title(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center py-2 w-full ${
        props.active
          ? "bg-olive-900"
          : "bg-white bg-opacity-5 hover:bg-opacity-10 cursor-pointer transition duration-300"
      } rounded select-none`}
      onClick={() => props.setActiveScreen(props.screen)}
    >
      <span className="text-[32px] text-white text-opacity-90">{props.screen.label}</span>
    </div>
  );
}
