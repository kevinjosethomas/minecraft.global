import Links from "./components/Links";
import Disclaimer from "./components/Disclaimer";

export default function Footer(props) {
  return (
    <div className="flex flex-col items-center justify-start w-full pt-4 md:pt-24 space-y-8">
      <Links />
      <div className="w-full h-0.5 bg-white bg-opacity-10" />
      <Disclaimer />
    </div>
  );
}
