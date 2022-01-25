import Tilt from "react-parallax-tilt";

export default function Players(props) {
  return (
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} tiltReverse>
      <div className="flex w-full flex-col items-start justify-start overflow-hidden rounded-xl">
        <div className="flex h-32 w-full flex-col items-start justify-center bg-gradient-to-tr from-blue-400 to-blue-800 p-8">
          <h1 className="select-none text-5xl font-bold text-white">
            For Players
          </h1>
        </div>
        <div className="flex w-full flex-col items-start justify-start bg-olive-940 p-8">
          <div className="flex flex-col items-start justify-start space-y-2">
            <Line
              icon="fas fa-keyboard text-teal-400"
              content="Autofill username when upvoting"
            />
            <Line
              icon="fas fa-clock text-yellow-400"
              content="Reduced 18 hour upvote cooldown"
            />
            <Line
              icon="fas fa-arrow-alt-up text-green-400"
              content="Increased 5 server daily upvote limit"
            />
            <Line
              icon="fas fa-tags text-blue-400"
              content="Server tags, categories & versions"
            />
            <Line
              icon="fas fa-comments text-indigo-400"
              content="Server comment & feedback system"
            />
            <Line
              icon="far fa-search text-red-400"
              content="Incredible search & filter features"
            />
            <Line
              icon="fas fa-sparkles text-blue-400"
              content="Clean & intuitive user experience"
            />
            <Line
              icon="fas fa-plug text-purple-400"
              content="Minecraft Account Linking"
            />
            <Line
              icon="fas fa-ban text-orange-400"
              content="No pay-for-upvote features"
            />
          </div>
        </div>
      </div>
    </Tilt>
  );
}

function Line(props) {
  return (
    <div className="flex items-start justify-start space-x-2 md:items-center">
      <i className={`${props.icon} w-[30px] text-center text-xl md:text-2xl`} />
      <p className="select-none text-xl text-white text-opacity-80 md:text-2xl">
        {props.content}
      </p>
    </div>
  );
}
