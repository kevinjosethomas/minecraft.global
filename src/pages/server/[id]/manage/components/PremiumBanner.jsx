import moment from "moment";
import Link from "next/link";

export default function PremiumBanner(props) {
  return (
    <div className="relative flex flex-col items-start justify-start w-full bg-olive-800 rounded-lg overflow-hidden">
      <Background />
      <div className="flex flex-row items-center justify-between w-full h-32 z-20 px-10">
        <div className="flex flex-col items-start justify-start">
          <p className="font-bold text-5xl text-white text-opacity-90 select-none">Premium</p>
        </div>
        {props.server.premium ? <Renews server={props.server} /> : <Subscribe />}
      </div>
    </div>
  );
}

function Subscribe(props) {
  return (
    <Link href="/premium">
      <a className="flex flex-row items-center justify-start py-2 px-5 space-x-2 bg-white bg-opacity-90 hover:bg-opacity-80 rounded cursor-pointer transition duration-300">
        <i className="far fa-badge-dollar text-xl text-olive-600" />
        <p className="font-medium text-xl text-olive-600 tracking-tight select-none">Subscribe</p>
      </a>
    </Link>
  );
}

function Renews(props) {
  return (
    <div className="flex flex-col items-start justify-start py-2 px-4 bg-white bg-opacity-90 rounded">
      <p className="font-bold text-olive-900 leading-snug tracking-tight select-none">RENEWS ON</p>
      <p className="font-bold text-lg text-olive-400 leading-tight select-none">
        {moment(props.server.premium_expires).format("MMMM Do YYYY")}
      </p>
    </div>
  );
}

function Background(props) {
  return (
    <div className="absolute top-10 left-0 w-full h-32">
      <svg
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full rotate-[-60deg]"
      >
        <path
          fill="#234231"
          fillOpacity="1"
          d="M0,96L24,85.3C48,75,96,53,144,64C192,75,240,117,288,133.3C336,149,384,139,432,128C480,117,528,107,576,122.7C624,139,672,181,720,176C768,171,816,117,864,133.3C912,149,960,235,1008,240C1056,245,1104,171,1152,165.3C1200,160,1248,224,1296,224C1344,224,1392,160,1416,128L1440,96L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>
      <div className="absolute -top-24 -right-12 w-96 h-72 rotate-[-60deg] bg-olive-920" />
    </div>
  );
}
