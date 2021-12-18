import Link from "next/link";

export default function Advertise(props) {
  return (
    <div className="flex flex-col items-star justify-start w-full md:h-[416px] p-4 md:p-8 space-y-4 bg-olive-950 rounded border-2 border-olive-920">
      <div className="flex flex-col items-start justify-start w-full space-y-1">
        <p className="font-medium text-2xl md:text-3xl text-white text-opacity-90">
          Thanks for voting for {props.name}!
        </p>
        <p className="text-lg md:text-2xl text-white text-opacity-60">
          Check out similar servers in these categories now!
        </p>
      </div>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-xl overflow-hidden">
        {props.tags.map((tag, index) => (
          <Link key={index} href={`/tag/${tag}`}>
            <a
              className={`flex flex-row items-center justify-between w-full py-2.5 pl-4 pr-8 bg-olive-940 hover:bg-olive-930 transition duration-300 cursor-pointer`}
            >
              <p className="text-xl text-white text-opacity-80 select-none">{tag}</p>
              <i className="far fa-angle-right text-xl text-white text-opacity-80" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
