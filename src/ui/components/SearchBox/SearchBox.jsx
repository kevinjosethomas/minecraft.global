import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import tags from "lib/tags.json";
import Searchbar from "./components/Searchbar";

export default function SearchBox(props) {
  return (
    <div className="!mt-0 flex w-full flex-col items-start justify-start">
      <Searchbar />
      <PopularTags />
    </div>
  );
}

function PopularTags() {
  const ref = useRef(null);

  const scroll = (amt) => {
    ref.current.scrollLeft -= amt;
  };

  return (
    <div className="mt-2 flex w-full items-center gap-2">
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-olive-700 transition duration-300 hover:bg-olive-800"
        onClick={() => scroll(600)}
      >
        <i className="far fa-angle-left text-2xl text-white" />
      </div>
      <ScrollContainer
        horizontal
        innerRef={ref}
        className="no-scrollbar scroll-smooth flex w-full items-center justify-start gap-2 !overflow-x-scroll p-1"
      >
        {tags.map((tag, index) => (
          <Tag key={index} {...tag} />
        ))}
      </ScrollContainer>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-olive-700 transition duration-300 hover:bg-olive-800"
        onClick={() => scroll(-600)}
      >
        <i className="far fa-angle-right text-2xl text-white" />
      </div>
    </div>
  );
}

function Tag(props) {
  return (
    <Link href={`/tag/${props.name}`} shallow={false}>
      <a className="group flex h-10 cursor-pointer items-center justify-start space-x-1 rounded-lg bg-white bg-opacity-5 px-4 py-1 ring-olive-800 transition duration-300 hover:ring-2">
        <h3 className="whitespace-nowrap text-white text-opacity-80 transition duration-300 group-hover:text-opacity-80 md:text-xl">
          {props.name}
        </h3>
      </a>
    </Link>
  );
}
