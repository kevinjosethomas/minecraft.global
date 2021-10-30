import Link from "next/link";
import SimplifyNumber from "simplify-number";

export default function Upvote(props) {
  return (
    <Link href={`/server/${props.server_id}/vote`}>
      <a className="flex flex-row items-center justify-center h-[72px] px-8 space-x-2 bg-olive-900 rounded-[12px] hover:bg-olive-910 transition duration-300 select-none">
        <i className="fas fa-arrow-alt-up text-[28px] text-white text-opacity-90" />
        <h5 className="font-medium text-[28px] text-white text-opacity-90">
          Upvote ({SimplifyNumber(props.monthly_votes, { decimal: 1 })})
        </h5>
      </a>
    </Link>
  );
}
