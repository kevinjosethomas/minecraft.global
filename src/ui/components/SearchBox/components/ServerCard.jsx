export default function ServerCard(props) {
  return (
    <div className="flex flex-row items-start justify-start p-3 space-x-2 hover:bg-white hover:bg-opacity-[0.04] rounded-[6px] cursor-pointer select-none">
      <img src={props.favicon} alt={`${props.name}'s Logo`} className="rounded-full" />
      <div className="flex flex-col items-start justify-start">
        <span className="text-[24px] text-white text-opacity-80">{props.name}</span>
        <div className="flex flex-row items-center justify-start space-x-3">
          <div className="flex flex-row items-center justify-start space-x-1">
            <i className="far fa-arrow-alt-up text-[16px] text-white text-olive-500" />
            <span className="text-[16px] text-white text-opacity-80">{props.monthly_votes}</span>
          </div>
          <div className="flex flex-row items-center justify-start space-x-1">
            <i className="far fa-user text-[16px] text-white text-olive-500" />
            <span className="text-[16px] text-white text-opacity-80">{props.players_online}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
