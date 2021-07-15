import Link from "next/link";

type Column = {
  title: string;
  rows: Record<string, string>[];
};

function Column(props: Column): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
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
  );
}

export default Column;
