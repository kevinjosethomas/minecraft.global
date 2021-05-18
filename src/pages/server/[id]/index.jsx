import Link from "next/link";
import ReactTooltip from "react-tooltip";
import ReactMarkdown from "react-markdown";
import { useToasts } from "react-toast-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

import getAuth from "../../../api/auth";
import getServer from "../../../api/server/[id]";
import StandardLayout from "../../../layouts/Standard";

function Server(props) {
  const { addToast } = useToasts();

  return (
    <StandardLayout>
      {/* <ReactTooltip
        effect="solid"
        className="server-status-tooltip"
        backgroundColor="#000"
        arrowColor="#000"
      /> */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full px-10 lg:px-20 2xl:px-56 py-20 md:py-40 space-y-10 md:space-y-0 md:space-x-10 bg-dark-80">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="relative flex flex-col items-center justify-center">
            <img
              src={props.server.favicon || "/images/default_favicon.png"}
              className="w-64 image-pixelated"
              onError={(e) => (e.target.src = "/images/default_favicon.png")}
              draggable="false"
            />
            <div
              className={`absolute w-12 h-12 -bottom-4 -right-4 ${
                props.server.online ? "bg-green-500" : "bg-red-500"
              } rounded-full border-[10px] border-dark-80`}
              data-tip={props.server.online ? "Online" : "Offline"}
            />
          </div>
          <div className="flex flex-col items-center md:items-start justify-center w-full space-y-2">
            <div className="flex flex-row items-center justify-start w-full pl-4 py-2 space-x-2 bg-dark-70 hover:bg-dark-60 select-none rounded-sm cursor-pointer transition duration-300">
              <i className="fas fa-arrow-alt-up text-2xl text-olive-60" />
              <span className="font- font-semibold text-xl text-gray-400">
                Upvote
              </span>
            </div>
            <CopyToClipboard
              text={props.server.host + ":" + props.server.port}
              onCopy={() =>
                addToast(
                  `Copied ${
                    props.server.host + ":" + props.server.port
                  } to your clipboard!`,
                  {
                    appearance: "success",
                  }
                )
              }
            >
              <div className="flex flex-row items-center justify-start w-full pl-4 py-2 space-x-2 bg-dark-70 hover:bg-dark-60 select-none rounded-sm cursor-pointer transition duration-300">
                <i className="fas fa-copy text-2xl text-olive-60" />
                <span className="font- font-semibold text-xl text-gray-400">
                  Copy IP
                </span>
              </div>
            </CopyToClipboard>
            {props.server.website_url ? (
              <a
                href={props.server.website_url}
                className="flex flex-row items-center justify-start w-full pl-4 py-2 space-x-2 bg-dark-70 hover:bg-dark-60 select-none rounded-sm cursor-pointer transition duration-300"
                target="_blank"
              >
                <i className="fas fa-link text-2xl text-olive-60" />
                <span className="font- font-semibold text-xl text-gray-400">
                  Website
                </span>
              </a>
            ) : (
              <></>
            )}
            {props.server.discord_url ? (
              <a
                href={props.server.discord_url}
                className="flex flex-row items-center justify-start w-full pl-4 py-2 space-x-2 bg-dark-70 hover:bg-dark-60 select-none rounded-sm cursor-pointer transition duration-300"
                target="_blank"
              >
                <i className="fab fa-discord text-2xl text-olive-60" />
                <span className="font- font-semibold text-xl text-gray-400">
                  Discord
                </span>
              </a>
            ) : (
              <></>
            )}
            {props.server.trailer_url ? (
              <a
                href={props.server.trailer_url}
                className="flex flex-row items-center justify-start w-full pl-4 py-2 space-x-2 bg-dark-70 hover:bg-dark-60 select-none rounded-sm cursor-pointer transition duration-300"
                target="_blank"
              >
                <i className="fas fa-film-alt text-2xl text-olive-60" />
                <span className="font- font-semibold text-xl text-gray-400">
                  Trailer
                </span>
              </a>
            ) : (
              <></>
            )}
            {props.user.user_id &&
            props.user.user_id == props.server.owner_id ? (
              <Link href={`/server/${props.server.server_id}/edit`}>
                <a className="font-medium text-gray-400 hover:text-gray-300 transition duration-300">
                  Edit Server
                </a>
              </Link>
            ) : (
              <Link href={`/server/${props.server.server_id}/report`}>
                <a className="font-medium text-red-700 hover:text-red-600 transition duration-300">
                  Report Server
                </a>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center space-y-4 w-full h-full overflow-hidden">
          <div className="flex flex-col items-start justify-center space-y-2">
            <div className="flex flex-col items-start justify-center">
              <div className="flex flex-row items-center justify-center space-x-2">
                <h1 className="font-bold text-4xl text-gray-300">
                  {props.server.name}
                </h1>
                <div
                  className="flex flex-row items-center justify-center rounded-full px-3 space-x-1 bg-dark-60 bg-opacity-[0.8]"
                  data-tip="Upvotes"
                >
                  <i className="fas fa-angle-up text-olive-50" />
                  <h6 className="font-proxima font-bold text-gray-400 cursor-default">
                    {props.server.monthly_votes || 0}
                  </h6>
                </div>
              </div>
              <span className="font-proxima font-bold text-lg text-gray-400">
                {props.server.players_online || 0} players
              </span>
            </div>
            <p className="max-w-md font-semibold text-sm md:text-lg text-gray-400 tracking-tight">
              {props.server.description}
            </p>
          </div>
          <div className="flex flex-row items-center justify-start space-x-2">
            {props.server.tags.map((tag, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center px-2 py-1 bg-dark-70"
              >
                <span className="font-semibold text-sm text-gray-400">
                  {tag}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-start w-full min-h-[2rem] h-full p-5 bg-dark-70">
            <ReactMarkdown className="long-description w-full font-medium text-sm md:text-md text-gray-400 overflow-hidden">
              {props.server.long_description ||
                (props.server.scraped
                  ? "Uh, so the owner of the server hasn't provided a description for us to use yet... ┬─┬ ノ( ゜-゜ノ) If you own this server, you can claim it in our [discord server]()"
                  : "Looks like the owner of this server was a little lazy and decided not to provide a long description (╯°□°）╯︵ ┻━┻")}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const [user, server] = Promise.all([getAuth(ctx.req, ctx.res), getServer(ctx.params.id)]);
  return {
    props: {
      user: user.payload,
      server: server.payload,
    },
  };
}

export default Server;
