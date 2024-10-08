import moment from "moment";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  return (
    <div className="flex w-full flex-col items-start justify-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
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
    <div className="flex w-full flex-col items-start justify-start space-y-2 md:space-y-4">
      <motion.h2
        className="text-3xl font-medium text-white text-opacity-90 md:text-4xl"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {props.servers.length ? "Servers" : "No Servers"}
      </motion.h2>
      <div className="flex w-full flex-col items-start justify-start space-y-0.5 overflow-hidden rounded-[12px]">
        {props.servers.map((server, index) => (
          <ServerCard
            key={index}
            index={index + 3}
            user={props.user}
            {...server}
            animate
          />
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
    <div className="flex w-full flex-col items-start justify-start space-y-4 md:w-[400px] md:min-w-[400px] md:max-w-[400px]">
      <div className="flex w-full flex-col items-start justify-start space-y-1 md:space-y-2">
        <div className="flex items-center justify-start">
          <motion.h3
            className="text-3xl font-medium text-white text-opacity-90 md:text-4xl"
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
          <Field
            label="Joined"
            value={moment(props.created_at).format("MMM Do YYYY")}
          />
          <Field label="IGN" value={username} />
        </motion.div>
      </div>
    </div>
  );
}

function Field(props) {
  return (
    <div className="flex items-center justify-start">
      <h3 className="text-xl font-medium text-white text-opacity-90 md:text-2xl">
        {props.label}{" "}
        <span className="font-normal text-white text-opacity-60">
          {props.value}
        </span>
      </h3>
    </div>
  );
}
