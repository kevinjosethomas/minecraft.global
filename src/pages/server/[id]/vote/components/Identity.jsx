import Link from "next/link";

import Favicon from "./Favicon";

export default function Identity(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-4">
      <Favicon name={props.name} favicon={props.favicon} />
      <h1 className="font-medium text-[32px] text-white text-opacity-90">Upvote {props.name}</h1>
      {props.premium && (
        <Link href="/premium" passHref>
          <i
            className="fad fa-diamond text-[42px] text-olive-500 cursor-pointer"
            data-tip="Premium Server"
          />
        </Link>
      )}
    </div>
  );
}
