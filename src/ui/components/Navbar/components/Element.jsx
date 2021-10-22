import Link from "next/link";

export default function Element(props) {
  return (
    <Link href={props.href}>
      <a className="group flex flex-row items-center justify-start space-x-2">
        <i
          className={`${props.icon} text-[24px] text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300`}
        />
        <span className="text-[24px] text-white text-opacity-80 group-hover:text-opacity-90 transition duration-300">
          {props.label}
        </span>
      </a>
    </Link>
  );
}
