import Link from "next/link";

import tags from "lib/tags.json";

export default function TopTags(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-2 px-4">
        <i className="fas fa-tags text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Popular Tags</p>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
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
      <a className="flex w-full items-center justify-start space-x-2 rounded py-1.5 transition duration-300 hover:bg-white hover:bg-opacity-5">
        <p className="w-8 text-center text-2xl text-white text-opacity-60">
          {props.index}
        </p>
        <p className="text-2xl text-white text-opacity-80">{props.name}</p>
      </a>
    </Link>
  );
}
