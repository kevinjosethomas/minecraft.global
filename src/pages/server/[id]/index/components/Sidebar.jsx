import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import SimplifyNumber from "simplify-number";

export default function Sidebar(props) {
  return (
    <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-8 overflow-hidden">
      <Details
        port={props.port}
        host={props.host}
        bedrock={props.bedrock}
        players_online={props.players_online}
        whitelisted={props.whitelisted}
        cracked={props.cracked}
        owner_id={props.owner_id}
        owner_name={props.owner_name}
      />
      {(props.discord_url || props.website_url || props.trailer_url) && (
        <Socials
          discord_url={props.discord_url}
          website_url={props.website_url}
          trailer_url={props.trailer_url}
        />
      )}
    </div>
  );
}

function Details(props) {
  const router = useRouter();
  const ip = !props.port || props.port === 25565 ? props.host : `${props.host}:${props.port}`;

  const copyIP = () => {
    navigator.clipboard.writeText(ip);
    toast.success("Successfully copied IP!");
  };

  return (
    <motion.div
      className="flex flex-col items-start justify-start space-y-2"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="far fa-gamepad-alt text-[32px] text-white text-opacity-90" />
        <span className="text-[32px] text-white text-opacity-90">Details</span>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <Element label="IP Address" content={ip} onClick={copyIP} column />
        <Element
          label="Online Players"
          content={SimplifyNumber(props.players_online, { decimal: 1 })}
        />
        <Element label="Platform" content={props.bedrock ? "Bedrock Edition" : "Java Edition"} />
        <Element label="Whitelist" content={props.whitelisted ? "Enabled" : "Disabled"} />
        <Element label="Cracked" content={props.cracked ? "Enabled" : "Disabled"} />
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
        <i className="far fa-share-alt text-[32px] text-white text-opacity-90" />
        <span className="text-[32px] text-white text-opacity-90">Socials</span>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        {props.discord_url && (
          <SocialElement icon="fab fa-discord" label="Discord Server" href={props.discord_url} />
        )}
        {props.website_url && (
          <SocialElement icon="far fa-link" label="Server Website" href={props.website_url} />
        )}
        {props.trailer_url && (
          <SocialElement icon="fab fa-youtube" label="Server Trailer" href={props.trailer_url} />
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
      <h3 className="font-medium text-2xl text-white text-opacity-80 leading-tight">
        {props.label}
      </h3>
      <h4 className="text-2xl text-white text-opacity-60 leading-tight">{props.content}</h4>
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
        className={`${props.icon} w-[30px] text-2xl text-white text-opacity-60 text-center group-hover:text-opacity-70 transition duration-300`}
      />
      <h3 className="text-2xl text-white text-opacity-60 leading-tight group-hover:text-opacity-70 transition duration-300 select-none">
        {props.label}
      </h3>
    </a>
  );
}
