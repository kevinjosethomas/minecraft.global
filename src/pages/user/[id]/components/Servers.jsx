import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetUsernameFromUUID } from "api/minecraft";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  return (
    <div className="flex flex-col md:flex-row items-start justify-center w-full space-y-6 md:space-y-0 md:space-x-8">
      <ServerList name={props.name} servers={props.servers} user={props.user} />
      <Info
        user_id={props.user_id}
        user={props.user}
        created_at={props.created_at}
        minecraft_username={props.minecraft_username}
      />
    </div>
  );
}

function ServerList(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2 md:space-y-4">
      <motion.h2
        className="font-medium text-3xl md:text-4xl text-white text-opacity-90"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        Servers
      </motion.h2>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
        {props.servers.map((server, index) => (
          <ServerCard key={index} index={index + 3} user={props.user} {...server} animate />
        ))}
      </div>
    </div>
  );
}

function Info(props) {
  const [username, setUsername] = useState("...");

  useEffect(() => {
    (async () => {
      setUsername(props.minecraft_username || "Not Linked");
    })();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full md:min-w-[400px] md:w-[400px] md:max-w-[400px] space-y-4">
      <div className="flex flex-col items-start justify-start w-full space-y-1 md:space-y-2">
        <div className="flex flex-row items-center justify-start">
          <motion.h3
            className="font-medium text-3xl md:text-4xl text-white text-opacity-90"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            User Info
          </motion.h3>
        </div>
        <motion.div
          className="flex flex-col items-start justify-start"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Field label="Joined" value={moment(props.created_at).format("MMM Do YYYY")} />
          <Field label="IGN" value={username} />
        </motion.div>
      </div>
      {props.user?.user_id === props.user_id && (
        <motion.div
          className="flex flex-col items-start justify-start w-full p-5 space-y-2 bg-olive-950 rounded"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h3 className="text-3xl text-white text-opacity-80">Manage Billing</h3>
          <Link href={`/user/${props.user.user_id}/edit?screen=billing`}>
            <a className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 hover:bg-olive-800 transition duration-300 rounded">
              <p className="text-2xl text-white text-opacity-90">View Payments</p>
            </a>
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function Field(props) {
  return (
    <div className="flex flex-row items-center justify-start">
      <h3 className="font-medium text-xl md:text-2xl text-white text-opacity-90">
        {props.label} <span className="font-normal text-white text-opacity-60">{props.value}</span>
      </h3>
    </div>
  );
}
