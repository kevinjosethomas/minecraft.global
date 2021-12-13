import Tilt from "react-parallax-tilt";

export default function Players(props) {
  return (
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} tiltReverse>
      <div className="flex flex-col items-start justify-start w-full rounded-xl overflow-hidden">
        <div className="flex flex-col items-start justify-center w-full h-32 p-8 bg-gradient-to-tr from-blue-400 to-blue-800">
          <h1 className="font-bold text-5xl text-white select-none">For Players</h1>
        </div>
        <div className="flex flex-col items-start justify-start w-full p-8 bg-olive-940">
          <div className="flex flex-col items-start justify-start space-y-2">
            <Line icon="fas fa-keyboard text-teal-400" content="Autofill username when upvoting" />
            <Line icon="fas fa-clock text-yellow-400" content="Reduced 18 hour upvote cooldown" />
            <Line
              icon="fas fa-arrow-alt-up text-green-400"
              content="Increased 5 server daily upvote limit"
            />
            <Line icon="fas fa-tags text-blue-400" content="Server tags, categories & versions" />
            <Line
              icon="fas fa-comments text-indigo-400"
              content="Server comment & feedback system"
            />
            <Line icon="far fa-search text-red-400" content="Incredible search & filter features" />
            <Line
              icon="fas fa-sparkles text-blue-400"
              content="Clean & intuitive user experience"
            />
            <Line icon="fas fa-plug text-purple-400" content="Minecraft Account Linking" />
            <Line icon="fas fa-ban text-orange-400" content="No pay-for-upvote features" />
          </div>
        </div>
      </div>
    </Tilt>
  );
}

function Line(props) {
  return (
    <div className="flex flex-row items-start md:items-center justify-start space-x-2">
      <i className={`${props.icon} w-[30px] text-center text-xl md:text-2xl`} />
      <p className="text-xl md:text-2xl text-white text-opacity-80 select-none">{props.content}</p>
    </div>
  );
}
