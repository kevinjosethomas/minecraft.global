type PartnerProps = {
  icon: string;
  name: string;
  description: string;
  href: string;
};

function Partner(props: PartnerProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start w-80 md:w-100 h-92 md:h-87.5 p-6 space-y-6 bg-dark-600 border-2 border-gray-800 rounded">
      <div className="flex flex-row items-center justify-start w-full space-x-4 overflow-x-hidden whitespace-nowrap">
        <img src={props.icon} alt={props.name} className="w-16 h-16 min-w-[4rem] rounded" />
        <span className="font-bold text-4xl text-gray-300 tracking-tight">{props.name}</span>
      </div>
      <div className="flex flex-col items-start justify-start flex-1">
        <span className="font-medium text-gray-400">{props.description}</span>
      </div>
      <a
        href={props.href}
        rel="noreferrer nofollow"
        target="_blank"
        className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-102 transform duration-300"
      >
        <span className="font-medium text-gray-400 select-none">View {props.name}</span>
      </a>
    </div>
  );
}

export default Partner;
