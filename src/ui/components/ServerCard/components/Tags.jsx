import Link from "next/link";

export default function Tags(props) {
  return (
    <div className="flex flex-row items-center justify-start no-scrollbar w-full space-x-3 overflow-x-auto">
      {props.tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
}

function Tag(props) {
  return (
    <Link href={`/tag/${props.tag}`}>
      <a className="group flex flex-row items-center justify-start space-x-1 px-2 py-0.5 bg-white bg-opacity-[0.06] hover:bg-opacity-10 rounded-[4px] cursor-pointer transition duration-300">
        <i className="far fa-hashtag text-xs text-olive-600" />
        <span className="text-xs md:text-base text-white text-opacity-70 group-hover:text-opacity-80 transition duration-300 whitespace-nowrap">
          {props.tag}
        </span>
      </a>
    </Link>
  );
}
