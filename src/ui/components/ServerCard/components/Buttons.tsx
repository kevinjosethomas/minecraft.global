import Link from "next/link";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import Toast from "ui/components/Toast/Toast";

type ButtonsProps = {
  user?: Record<string, any>;
  server_id: number;
  owner_id: number;
  host: string;
  port: number;
  premium: boolean;
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
      {props.user?.user_id === props.owner_id ? (
        <Link href={`/server/${props.server_id}/manage`}>
          <a
            className={`flex flex-row items-center justify-center py-3 w-full ${
              props.premium ? "bg-olive-700" : "bg-dark-200"
            } cursor-pointer rounded hover:scale-102 transform duration-300`}
          >
            <span
              className={`font-medium ${
                props.premium ? "text-gray-300" : "text-gray-400"
              } select-none`}
            >
              Manage Server
            </span>
          </a>
        </Link>
      ) : (
        <div
          className={`flex flex-row items-center justify-center py-3 w-full ${
            props.premium ? "bg-olive-700" : "bg-dark-200"
          } cursor-pointer rounded hover:scale-102 transform duration-300`}
          onClick={CopyIP}
        >
          <span
            className={`font-medium ${
              props.premium ? "text-gray-300" : "text-gray-400"
            } select-none`}
          >
            Copy IP
          </span>
        </div>
      )}
      <Link href={`/server/${props.server_id}`}>
        <a
          className={`flex flex-row items-center justify-center py-3 w-full ${
            props.premium ? "bg-olive-700" : "bg-dark-200"
          } cursor-pointer rounded hover:scale-102 transform duration-300`}
        >
          <span
            className={`font-medium ${
              props.premium ? "text-gray-300" : "text-gray-400"
            } select-none`}
          >
            View Server
          </span>
        </a>
      </Link>
    </div>
  );
}

function ButtonsSkeleton({ is1280p, isMobile }: any): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between w-full space-x-4 rounded">
      <Skeleton width={isMobile ? 126 : is1280p ? 142 : 158} height={50} />
      <Skeleton width={isMobile ? 126 : is1280p ? 142 : 158} height={50} />
    </div>
  );
}

export default Buttons;
export { ButtonsSkeleton };
