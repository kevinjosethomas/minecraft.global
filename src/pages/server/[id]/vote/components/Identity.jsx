import Link from "next/link";

import Favicon from "./Favicon";

export default function Identity(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
      <Favicon name={props.name} favicon={props.favicon} />
      <h1 className="text-xl font-medium text-white text-opacity-90 md:text-3xl">
        Upvote {props.name}
      </h1>
      {props.premium && (
        <Link href="/premium" passHref>
          <i
            className="fad fa-diamond cursor-pointer text-4xl text-olive-500"
            data-tip="Premium Server"
          />
        </Link>
      )}
    </div>
  );
}
