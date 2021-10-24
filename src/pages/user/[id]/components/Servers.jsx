import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { GetUsernameFromUUID } from "api/mojang";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Servers(props) {
  return (
    <div className="flex flex-row items-start justify-center w-full space-x-8">
      <ServerList name={props.name} servers={props.servers} />
      <Info
        user_id={props.user_id}
        user={props.user}
        created_at={props.created_at}
        minecraft_uuid={props.minecraft_uuid}
      />
    </div>
  );
}

function ServerList(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <motion.h2
        className="font-medium text-[40px] text-white text-opacity-90"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {props.name}&apos;s servers
      </motion.h2>
      <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
        {props.servers.map((server, index) => (
          <ServerCard key={index} index={index + 3} {...server} animate />
        ))}
      </div>
    </div>
  );
}

function Info(props) {
  const [username, setUsername] = useState("...");

  useEffect(() => {
    (async () => {
      if (props.minecraft_uuid) {
        const [response, error] = await GetUsernameFromUUID(props.minecraft_uuid);

        if (error) {
          return;
        }

        setUsername(response.name);
      } else {
        setUsername("Not Linked");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px] space-y-6">
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-row items-center justify-start">
          <motion.h3
            className="font-medium text-[40px] text-white text-opacity-90"
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
      {props.user.user_id === props.user_id && (
        <motion.div
          className="flex flex-col items-start justify-start w-full p-5 space-y-2 bg-olive-940 rounded-[8px]"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h3 className="font-medium text-[32px] text-white text-opacity-90">Manage Billing</h3>
          <Link href={`/user/${props.user.user_id}/edit`}>
            <a className="flex flex-row items-center justify-center w-full py-1 bg-olive-900 hover:bg-olive-800 transition duration-300 rounded-[8px]">
              <span className="text-[24px] text-white text-opacity-90">View Payments</span>
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
      <h3 className="font-medium text-[24px] text-white text-opacity-90">
        {props.label} <span className="font-normal text-white text-opacity-60">{props.value}</span>
      </h3>
    </div>
  );
}
