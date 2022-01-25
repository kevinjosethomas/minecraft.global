import Link from "next/link";

export default function Tags(props) {
  return (
    <div className="no-scrollbar flex w-full flex-row items-center justify-start space-x-3 overflow-x-auto">
      {props.tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
}

function Tag(props) {
  return (
    <Link href={`/tag/${props.tag}`}>
      <a className="group flex cursor-pointer flex-row items-center justify-start space-x-1 rounded-[4px] bg-white bg-opacity-[0.06] px-2 py-0.5 transition duration-300 hover:bg-opacity-10">
        <i className="far fa-hashtag text-xs text-olive-600" />
        <h3 className="whitespace-nowrap text-xs text-white text-opacity-70 transition duration-300 group-hover:text-opacity-80 md:text-base">
          {props.tag}
        </h3>
      </a>
    </Link>
  );
}
