import Links from "./components/Links";
import Disclaimer from "./components/Disclaimer";

export default function Footer(props) {
  return (
    <div className="flex w-full flex-col items-center justify-start space-y-8 pt-4 md:pt-24">
      <Links />
      <div className="h-0.5 w-full bg-white bg-opacity-10" />
      <Disclaimer />
    </div>
  );
}
