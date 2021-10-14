import Link from "next/link";
import { useRouter } from "next/router";

type NavElement = {
  id: number;
  icon: string;
  name: string;
  href: string;
};

const NavElement = (props: NavElement): JSX.Element => {
  const router = useRouter();
  const active = router.pathname == props.href;

  return (
    <Link href={props.href}>
      <a className="group flex flex-row items-center justify-center space-x-2">
        <i
          className={`${props.icon} ${
            active ? "text-gray-300" : "text-gray-400"
          } text-lg group-hover:text-gray-300 transition duration-500`}
        />
        <span
          className={`font-medium ${
            active ? "text-gray-300" : "text-gray-400 "
          } text-lg group-hover:text-gray-300 transition duration-500`}
        >
          {props.name}
        </span>
      </a>
    </Link>
  );
};

export default NavElement;
