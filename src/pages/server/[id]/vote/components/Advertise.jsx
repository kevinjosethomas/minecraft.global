import moment from "moment";
import Link from "next/link";

export default function Advertise(props) {
  return (
    <div className="items-star flex w-full flex-col justify-start space-y-4 rounded-xl border-2 border-olive-930 bg-olive-940 bg-opacity-80 p-4 md:h-[416px] md:p-8">
      <div className="flex w-full flex-col items-start justify-start space-y-1">
        <p className="text-2xl font-medium text-white text-opacity-90 md:text-3xl">
          {props.previouslyVoted
            ? `You already voted for ${props.name}!`
            : `Thanks for voting for ${props.name}!`}
        </p>
        <p className="text-lg text-white text-opacity-60 md:text-2xl">
          You can vote again at {moment(props.canVoteAt).format("h:mma")}! Check
          similar servers out -
        </p>
      </div>
      <div className="flex w-full flex-col items-start justify-start space-y-[1px] overflow-hidden rounded-xl">
        {props.tags.map((tag, index) => (
          <Link key={index} href={`/tag/${tag}`}>
            <a
              className={`flex w-full cursor-pointer items-center justify-between bg-olive-930 py-2.5 pl-4 pr-8 transition duration-300 hover:bg-olive-920`}
            >
              <p className="select-none text-xl text-white text-opacity-80">
                {tag}
              </p>
              <i className="far fa-angle-right text-xl text-white text-opacity-80" />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
