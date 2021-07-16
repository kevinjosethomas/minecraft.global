import { Fragment } from "react";
import Link from "next/link";

type Column = {
  title: string;
  rows: Record<string, string>[];
};

function Column(props: Column): JSX.Element {
  return (
    <Fragment>
      <div className="hidden md:flex flex-col items-start justify-center">
        <span className="font-bold text-xl text-gray-300">{props.title}</span>
        <div className="flex flex-col items-start justify-center">
          {props.rows.map((row, index) => (
            <Link key={index} href={row.href}>
              <a className="font-medium text-lg text-gray-400 hover:text-gray-300 duration-300">
                {row.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex md:hidden flex-col items-start justify-center w-full p-4 bg-dark-700 rounded border-2 border-gray-900">
        <div className="flex flex-col items-start justify-center w-full space-y-3">
          {props.rows.map((row, index) => (
            <Link key={index} href={row.href}>
              <a className="flex flex-row items-center justify-start w-full px-2 space-x-2 rounded">
                <i className={`${row.icon} w-6 text-lg text-gray-400`} />
                <span className="font-medium text-lg text-gray-400">{row.label}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Column;
