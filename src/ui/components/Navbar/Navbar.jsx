import Links from "./components/Links";

export default function Navbar(props) {
  return (
    <div className="flex flex-row items-center justify-between py-[32px] w-full">
      <Links />
    </div>
  );
}
