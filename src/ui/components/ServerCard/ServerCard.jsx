import Link from "next/link";
import { motion } from "framer-motion";

import Tags from "./components/Tags";
import Favicon from "./components/Favicon";
import Identity from "./components/Identity";
import Description from "./components/Description";

export default function ServerCard(props) {
  return (
    <Container index={props.index} animate={props.animate} server_id={props.server_id}>
      <div className="flex flex-row items-start justify-start space-x-3 w-full">
        <Favicon favicon={props.favicon} name={props.name} />
        <Identity
          name={props.name}
          host={props.host}
          port={props.port}
          monthly_votes={props.monthly_votes}
          players_online={props.players_online}
        />
      </div>
      <Description description={props.description} />
      <Tags tags={props.tags} />
    </Container>
  );
}

const Container = (props) => (
  <Link href={`/server/${props.server_id}`} passHref>
    {props.animate ? (
      <motion.div
        className="flex flex-col items-start justify-start w-full p-6 space-y-2 bg-white bg-opacity-[0.06] hover:bg-opacity-[0.08] transition duration-300 cursor-pointer"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: props.index * 0.1 }}
      >
        {props.children}
      </motion.div>
    ) : (
      <div className="flex flex-col items-start justify-start w-full p-6 space-y-2 bg-white bg-opacity-[0.06] hover:bg-opacity-[0.08] transition duration-300 cursor-pointer">
        {props.children}
      </div>
    )}
  </Link>
);
