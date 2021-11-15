import Link from "next/link";

import tags from "lib/tags.json";

export default function TopTags(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="fal fa-tags text-3xl text-olive-600" />
        <span className="text-3xl text-white text-opacity-80">Popular Tags</span>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        {tags.slice(0, 5).map((tag, index) => (
          <Tag key={index} index={index + 1} {...tag} />
        ))}
      </div>
    </div>
  );
}

function Tag(props) {
  return (
    <Link href={`/tag/${props.name}`}>
      <a className="flex flex-row items-center justify-start w-full py-1 space-x-2 hover:bg-white hover:bg-opacity-5 transition duration-300 rounded">
        <span className="w-8 text-center text-2xl text-white text-opacity-60">{props.index}</span>
        <span className="text-2xl text-white text-opacity-80">{props.name}</span>
      </a>
    </Link>
  );
}
