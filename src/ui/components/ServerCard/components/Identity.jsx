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
    <div className="flex h-[66px] w-full items-center justify-between">
      <ReactTooltip
        effect="solid"
        className="!rounded-md !border-2 !border-olive-930 !bg-olive-800 !text-white !text-opacity-90"
      />
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-start space-x-2">
          <h3 className="whitespace-nowrap text-xl text-white md:text-3xl">
            {props.name}
          </h3>
          {props.premium && (
            <Link href="/premium" passHref>
              <i
                className="fad fa-diamond cursor-pointer text-xl text-olive-500 md:text-3xl"
                data-tip="Premium Server"
              />
            </Link>
          )}
        </div>
        <Meta
          monthly_votes={props.monthly_votes}
          players_online={props.players_online}
        />
      </div>
      <div className="flex items-center justify-start space-x-2">
        {props.owner_id === props.user?.user_id && (
          <ManageServer server_id={props.server_id} />
        )}
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
    <div className="flex select-none items-center justify-start space-x-4">
      <div className="flex items-center justify-start space-x-1">
        <i className="far fa-arrow-alt-up text-sm text-olive-500 md:text-base" />
        <p className="text-sm text-white text-opacity-80 md:text-base">
          {SimplifyNumber(props.monthly_votes, { decimal: 1 })}
        </p>
      </div>
      <div className="flex items-center justify-start space-x-1">
        <i className="far fa-user text-sm text-olive-500 md:text-base" />
        <p className="text-sm text-white text-opacity-80 md:text-base">
          {SimplifyNumber(props.players_online, { decimal: 1 })}
        </p>
      </div>
    </div>
  );
}

function ManageServer(props) {
  return (
    <Link href={`/server/${props.server_id}/manage`}>
      <a className="flex select-none items-center justify-center rounded-[6px] bg-olive-600 bg-opacity-25 px-3 py-2 transition duration-300 hover:bg-opacity-50">
        <i className="far fa-tools text-lg text-white" />
      </a>
    </Link>
  );
}

function CopyButton(props) {
  const router = useRouter();

  const onClick = async (e) => {
    e.preventDefault();
    const ip =
      !props.port || props.port === 25565
        ? props.host
        : `${props.host}:${props.port}`;
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
      className="hidden select-none items-center justify-center rounded-lg bg-olive-900 px-4 py-2 transition duration-300 hover:bg-olive-800 md:flex"
      onClick={onClick}
    >
      <p className="text-lg font-medium text-white">Copy IP</p>
    </div>
  );
}
