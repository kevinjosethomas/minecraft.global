import moment from "moment";

export default function Comment(props) {
  const avatar = props.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.minecraft_uuid}?size=128`
    : "/images/steve.png";

  return (
    <div className="flex flex-col items-start justify-start w-full p-5 space-y-1 bg-olive-920 bg-opacity-20 rounded">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start space-x-2">
          <img src={avatar} alt={`${props.name}'s' Name`} className="w-10 h-10 rounded-sm" />
          <p className="text-3xl text-white text-opacity-90">{props.name}</p>
        </div>
        <div className="flex flex-row items-center justify-start">
          <p className="text-xl text-white text-opacity-80">
            Posted on{" "}
            <p className="font-medium text-opacity-90">
              {moment(props.created_at).format("MMM Do YYYY")}
            </p>
          </p>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start w-full">
        <p className="text-xl text-white text-opacity-70">{props.content}</p>
      </div>
    </div>
  );
}
