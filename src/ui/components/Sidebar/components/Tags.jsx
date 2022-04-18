import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import storedTags from "lib/tags.json";
import Container from "ui/components/core/Container";

export default function Tags(props) {
  const [maximum, setMaximum] = useState(
    props.servers != null
      ? (props.servers - 1) * 4 > storedTags.length
        ? storedTags.length
        : (props.servers - 1) * 4
      : storedTags.length
  );

  useEffect(() => {
    const newMax =
      props.servers != null
        ? (props.servers - 1) * 4 > storedTags.length
          ? storedTags.length
          : (props.servers - 1) * 4
        : storedTags.length;

    setMaximum(newMax);

    if (tags.length > newMax) {
      setTags(storedTags.slice(0, newMax < 5 ? 5 : newMax));
    }
  }, [props.servers]);

  const [tags, setTags] = useState(storedTags.slice(0, 5));

  const loadMore = (page) => {
    setTags(storedTags.slice(0, page));
  };

  return (
    <Container className="flex w-full flex-col items-start justify-start space-y-2 overflow-hidden py-6 px-4">
      <div className="flex items-center justify-start space-x-2 px-4">
        <i className="fas fa-tags text-3xl text-olive-600" />
        <p className="text-3xl text-white text-opacity-80">Popular Tags</p>
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <InfiniteScroll
          pageStart={5}
          loadMore={loadMore}
          hasMore={tags.length < maximum}
          className="w-full"
        >
          {tags.map((tag, index) => (
            <Tag index={index} {...tag} />
          ))}
        </InfiniteScroll>
      </div>
    </Container>
  );
}

function Tag(props) {
  return (
    <Link href={`/tag/${props.name}`} passHref>
      <a className="flex w-full items-center justify-start space-x-2 rounded py-1.5 px-2 transition duration-300 hover:bg-black hover:bg-opacity-10">
        <p className="w-8 text-center text-2xl text-white text-opacity-70">
          {props.index + 1}
        </p>
        <p className="text-2xl text-white text-opacity-90">{props.name}</p>
      </a>
    </Link>
  );
}
