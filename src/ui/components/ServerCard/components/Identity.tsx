type IdentityProps = {
  favicon: string;
  name: string;
};

function Identity(props: IdentityProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-4 overflox-x-hidden whitespace-nowrap">
      <div className="relative flex flex-col items-center justify-center overflow-elipsis">
        <div className="absolute w-16 h-16 bg-dark-300 bg-opacity-30 rounded" />
        <img src={props.favicon} alt={props.name} className="w-16 h-16 min-w-[4rem] rounded" />
      </div>
      <span className="font-bold text-5xl text-gray-300 tracking-tight truncate">{props.name}</span>
    </div>
  );
}

export default Identity;
