import { motion } from "framer-motion";
import Searchbar from "./components/Searchbar";

export default function SearchBox(props) {
  return (
    <motion.div
      className="flex flex-col items-start justify-start w-full"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <Searchbar defaultResults={props.defaultResults} />
    </motion.div>
  );
}

function Header() {
  return (
    <h1 className="font-bold text-[56px] text-white text-opacity-90">
      The y=12 for Minecraft Servers
    </h1>
  );
}
