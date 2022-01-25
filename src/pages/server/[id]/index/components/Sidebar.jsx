import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PostEvent } from "api/analytics";
import SimplifyNumber from "simplify-number";

export default function Sidebar(props) {
  return (
    <div className="flex min-w-[400px] max-w-[400px] flex-col items-start justify-start space-y-8 overflow-hidden">
      <Details
        port={props.port}
        host={props.host}
        name={props.name}
        server_id={props.server_id}
        bedrock={props.bedrock}
        supports_bedrock={props.supports_bedrock}
        players_online={props.players_online}
        whitelisted={props.whitelisted}
        cracked={props.cracked}
        owner_id={props.owner_id}
        owner_name={props.owner_name}
        user_id={props.user_id}
      />
      {(props.discord_url ||
        props.website_url ||
        props.trailer_url ||
        props.store_url) && (
        <Socials
          discord_url={props.discord_url}
          website_url={props.website_url}
          trailer_url={props.trailer_url}
          store_url={props.store_url}
        />
      )}
    </div>
  );
}

function Details(props) {
  const router = useRouter();
  const ip =
    !props.port || props.port === 25565
      ? props.host
      : `${props.host}:${props.port}`;

  const copyIP = async () => {
    navigator.clipboard.writeText(ip);
    toast.success("Successfully copied IP!");

    await PostEvent("COPY-IP", {
      user_id: props.user_id,
      server_id: props.server_id,
      metadata: {
        type: "Server Page",
        loc: router.asPath,
      },
    });
  };

  const platform =
    !props.bedrock && !props.supports_bedrock
      ? "Java Edition"
      : props.bedrock && !props.supports_bedrock
      ? "Bedrock Edition"
      : !props.bedrock && props.supports_bedrock
      ? "Java & Bedrock"
      : "Java Edition";

  return (
    <motion.div
      className="flex flex-col items-start justify-start space-y-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="far fa-gamepad-alt text-3xl text-white text-opacity-90" />
        <p className="text-3xl text-white text-opacity-90">Details</p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <Element
          label={`${props.name}'s IP Address`}
          content={ip}
          onClick={copyIP}
          column
        />
        <Element
          label="Online Players"
          content={SimplifyNumber(props.players_online, { decimal: 1 })}
        />
        <Element label="Platform" content={platform} />
        <Element
          label="Whitelist"
          content={props.whitelisted ? "Enabled" : "Disabled"}
        />
        <Element
          label="Cracked"
          content={props.cracked ? "Enabled" : "Disabled"}
        />
        <Element
          label="Owner"
          content={props.owner_name}
          onClick={() => router.push(`/user/${props.owner_id}`)}
        />
      </div>
    </motion.div>
  );
}

function Socials(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start space-y-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="far fa-share-alt text-3xl text-white text-opacity-90" />
        <p className="text-3xl text-white text-opacity-90">Socials</p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        {props.discord_url && (
          <SocialElement
            icon="fab fa-discord"
            label="Discord Server"
            href={props.discord_url}
          />
        )}
        {props.website_url && (
          <SocialElement
            icon="far fa-link"
            label="Server Website"
            href={props.website_url}
          />
        )}
        {props.trailer_url && (
          <SocialElement
            icon="fab fa-youtube"
            label="Server Trailer"
            href={props.trailer_url}
          />
        )}
        {props.store_url && (
          <SocialElement
            icon="fas fa-shopping-cart"
            label="Server Store"
            href={props.store_url}
          />
        )}
      </div>
    </motion.div>
  );
}

function Element(props) {
  return (
    <div
      className={`flex ${
        props.column
          ? "flex-col items-start justify-start"
          : "flex-row items-center justify-start space-x-2"
      } whitespace-nowrap ${props.onClick && "cursor-pointer"}`}
      onClick={props.onClick}
    >
      <h3 className="text-xl font-medium leading-tight text-white text-opacity-80 md:text-2xl">
        {props.label}
      </h3>
      <h4 className="text-xl leading-tight text-white text-opacity-60 md:text-2xl">
        {props.content}
      </h4>
    </div>
  );
}

function SocialElement(props) {
  return (
    <a
      className="group flex flex-row items-center justify-start space-x-2 whitespace-nowrap"
      rel="noreferrer nofollow"
      href={props.href}
      target="_blank"
    >
      <i
        className={`${props.icon} w-[25px] text-center text-xl text-white text-opacity-60 transition duration-300 group-hover:text-opacity-70 md:w-[30px] md:text-2xl`}
      />
      <h3 className="select-none text-xl leading-tight text-white text-opacity-60 transition duration-300 group-hover:text-opacity-70 md:text-2xl">
        {props.label}
      </h3>
    </a>
  );
}
