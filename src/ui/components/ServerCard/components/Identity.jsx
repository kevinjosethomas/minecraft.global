import Link from "next/link";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { PostEvent } from "api/analytics";
import SimplifyNumber from "simplify-number";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function Identity(props) {
  return (
    <div className="flex flex-row items-center justify-between w-full h-[66px]">
      <ReactTooltip
        effect="solid"
        className="!bg-olive-800 !border-2 !border-olive-930 !text-white !text-opacity-90 !rounded-md"
      />
      <div className="flex flex-col items-start justify-start">
        <div className="flex flex-row items-center justify-start space-x-2">
          <h3 className="text-xl md:text-3xl text-white text-opacity-90">{props.name}</h3>
          {props.premium && (
            <Link href="/premium" passHref>
              <i
                className="fad fa-diamond text-xl md:text-3xl text-olive-500 cursor-pointer"
                data-tip="Premium Server"
              />
            </Link>
          )}
        </div>
        <Meta monthly_votes={props.monthly_votes} players_online={props.players_online} />
      </div>
      <div className="flex flex-row items-center justify-start space-x-2">
        {props.owner_id === props.user?.user_id && <ManageServer server_id={props.server_id} />}
        <CopyButton
          host={props.host}
          port={props.port}
          server_id={props.server_id}
          user_id={props.user?.user_id}
        />
      </div>
    </div>
  );
}

function Meta(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-4 select-none">
      <div className="flex flex-row items-center justify-start space-x-1">
        <i className="far fa-arrow-alt-up text-sm md:text-base text-olive-500" />
        <p className="text-sm md:text-base text-white text-opacity-80">
          {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
        </p>
      </div>
      <div className="flex flex-row items-center justify-start space-x-1">
        <i className="far fa-user text-sm md:text-base text-olive-500" />
        <p className="text-sm md:text-base text-white text-opacity-80">
          {SimplifyNumber(props.players_online, { decimal: 1 })}
        </p>
      </div>
    </div>
  );
}

function ManageServer(props) {
  return (
    <Link href={`/server/${props.server_id}/manage`}>
      <a className="flex flex-row items-center justify-center px-3 py-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300">
        <i className="far fa-tools text-lg text-white" />
      </a>
    </Link>
  );
}

function CopyButton(props) {
  const router = useRouter();

  const onClick = async (e) => {
    e.preventDefault();
    const ip = !props.port || props.port === 25565 ? props.host : `${props.host}:${props.port}`;
    navigator.clipboard.writeText(ip);
    toast.success("Successfully copied IP!");

    await PostEvent("COPY-IP", {
      user_id: props.user_id,
      server_id: props.server_id,
      metadata: {
        type: "Server Card",
        loc: router.asPath,
      },
    });
  };

  return (
    <div
      className="hidden md:flex flex-row items-center justify-center px-4 py-2 bg-olive-600 bg-opacity-25 hover:bg-opacity-50 rounded-[6px] select-none transition duration-300"
      onClick={onClick}
    >
      <p className="font-medium text-lg text-white">Copy IP</p>
    </div>
  );
}
