import Link from "next/link";
import { motion } from "framer-motion";

import Tags from "./components/Tags";
import Favicon from "./components/Favicon";
import Identity from "./components/Identity";
import Description from "./components/Description";

export default function ServerCard(props) {
  return (
    <Container
      index={props.index}
      animate={props.animate}
      server_id={props.server_id}
      premium={props.premium}
    >
      <div className="flex w-full items-center justify-start space-x-3 overflow-x-hidden">
        <Favicon favicon={props.favicon} name={props.name} />
        <Identity
          user={props.user}
          name={props.name}
          host={props.host}
          port={props.port}
          premium={props.premium}
          owner_id={props.owner_id}
          server_id={props.server_id}
          monthly_votes={props.monthly_votes}
          players_online={props.players_online}
        />
      </div>
      <Description description={props.description} />
      <Tags tags={props.tags} />
    </Container>
  );
}

const Container = (props) => {
  const background = props.premium
    ? "bg-olive-910 hover:bg-olive-900"
    : "bg-olive-930 hover:bg-olive-920";
  // props.premium
  //   ? "bg-olive-500 bg-opacity-[0.12] hover:bg-opacity-[0.17]"
  //   : "bg-white bg-opacity-[0.06] hover:bg-opacity-[0.08]";

  return (
    <Link href={`/server/${props.server_id}`} passHref>
      {props.animate ? (
        <motion.div
          className={`flex w-full flex-col items-start justify-start space-y-1 p-4 md:space-y-2 md:p-6 ${background} cursor-pointer overflow-x-hidden transition duration-300`}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2, delay: props.index * 0.1 }}
        >
          {props.children}
        </motion.div>
      ) : (
        <div
          className={`flex w-full flex-col items-start justify-start space-y-1 p-4 md:space-y-2 md:p-6 ${background} cursor-pointer overflow-x-hidden transition duration-300`}
        >
          {props.children}
        </div>
      )}
    </Link>
  );
};
