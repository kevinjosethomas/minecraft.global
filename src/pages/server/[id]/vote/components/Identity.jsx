import Link from "next/link";

import Favicon from "./Favicon";

export default function Identity(props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-start space-y-2 md:space-y-0 md:space-x-4">
      <Favicon name={props.name} favicon={props.favicon} />
      <h1 className="font-medium text-xl md:text-3xl text-white text-opacity-90">
        Upvote {props.name}
      </h1>
      {props.premium && (
        <Link href="/premium" passHref>
          <i
            className="fad fa-diamond text-4xl text-olive-500 cursor-pointer"
            data-tip="Premium Server"
          />
        </Link>
      )}
    </div>
  );
}
