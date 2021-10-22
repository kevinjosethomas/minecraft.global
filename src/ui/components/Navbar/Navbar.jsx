import User from "./components/User";
import Links from "./components/Links";

export default function Navbar(props) {
  return (
    <div className="flex flex-row items-center justify-between py-[32px] w-full">
      <Links />
      <User user={props.user} />
    </div>
  );
}
