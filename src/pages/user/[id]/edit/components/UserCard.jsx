export default function UserCard(props) {
  return (
    <div className="flex flex-col items-start justify-start w-[500px] max-w-[500px] h-[250px] p-6 space-y-2 bg-olive-960 border-2 border-olive-940 overflow-x-hidden rounded">
      <div className="flex flex-row items-center justify-start space-x-4">
        <img
          src={props.avatar}
          alt={`${props.name}'s skinhead'`}
          className="w-[64px] h-[64px] rounded"
        />
        <span className="text-[32px] text-white text-opacity-80">{props.name}</span>
      </div>
      <span className="text-2xl text-white text-opacity-50 break-anywhere">
        {props.description}
      </span>
    </div>
  );
}
