import Link from "next/link";
import toast from "react-hot-toast";

import Toast from "ui/components/Toast/Toast";

type ButtonsProps = {
  server_id: number;
  host: string;
  port: number;
};

function Buttons(props: ButtonsProps): JSX.Element {
  function CopyIP() {
    const ip = props.port === 25565 ? props.host : `${props.host}:${props.port}`;
    navigator.clipboard.writeText(ip);
    toast.custom((t) => (
      <Toast
        icon="fas fa-check-circle text-green-600"
        title="Successfully copied IP Address!"
        subtitle={`Copied ${ip} to your clipboard!`}
      />
    ));
  }

  return (
    <div className="flex flex-row items-center justify-between w-full space-x-4 rounded">
      <div
        className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300"
        onClick={CopyIP}
      >
        <span className="font-medium text-gray-400 select-none">Copy IP</span>
      </div>
      <Link href={`/server/${props.server_id}`}>
        <a className="flex flex-row items-center justify-center py-3 w-full bg-dark-200 cursor-pointer rounded hover:scale-[1.02] transform duration-300">
          <span className="font-medium text-gray-400 select-none">View Server</span>
        </a>
      </Link>
    </div>
  );
}

export default Buttons;
