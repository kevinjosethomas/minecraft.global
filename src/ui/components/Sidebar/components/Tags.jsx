import Link from "next/link";

import tags from "lib/tags.json";

export default function Tags(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start px-4 space-x-2">
        <i className="fas fa-tags text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Popular Tags</p>
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        {tags.slice(0, 5).map((tag, index) => (
          <Link key={index} href={`/tag/${tag.name}`}>
            <a className="flex flex-row items-center justify-start w-full py-1.5 space-x-2 hover:bg-white hover:bg-opacity-5 transition duration-300 rounded">
              <p className="w-8 text-center text-2xl text-white text-opacity-60">{index + 1}</p>
              <p className="text-2xl text-white text-opacity-80">{tag.name}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
