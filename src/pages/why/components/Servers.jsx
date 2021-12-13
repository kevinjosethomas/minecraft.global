import Tilt from "react-parallax-tilt";

export default function Servers(props) {
  return (
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} tiltReverse>
      <div className="flex flex-col items-start justify-start w-full rounded-xl overflow-hidden">
        <div className="flex flex-col items-start justify-center w-full h-32 p-8 bg-gradient-to-tr from-green-400 to-green-800">
          <h1 className="font-bold text-5xl text-white select-none">For Servers</h1>
        </div>
        <div className="flex flex-col items-start justify-start w-full p-8 bg-olive-940">
          <div className="flex flex-col items-start justify-start space-y-2">
            <Line
              icon="fas fa-arrow-alt-up text-yellow-400"
              content="Easier upvote experience for players"
            />
            <Line
              icon="fas fa-chart-area text-teal-400"
              content="Server analytics + advertisements"
            />
            <Line
              icon="fas fa-trophy text-purple-400"
              content="Easy-to-rank search & feature pages"
            />
            <Line icon="fas fa-plug text-green-400" content="Discord webhooks for upvote notifs" />
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
            <Line
              icon="fas fa-badge-dollar text-pink-400"
              content="Exclusive auctions & advertising credit"
            />
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
