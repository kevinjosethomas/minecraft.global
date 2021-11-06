import Link from "next/link";
import { motion } from "framer-motion";

export default function Back(props) {
  return (
    <Link href={`/server/${props.server_id}`}>
      <motion.a
        className="group flex flex-row items-center justify-center px-4 py-1 space-x-3 bg-white bg-opacity-[0.08] hover:bg-opacity-10 rounded-lg cursor-pointer transition duration-300"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <i className="far fa-arrow-left text-[20px] text-white text-opacity-80 group-hover:-translate-x-0.5 transition duration-300" />
        <span className="font-medium text-[24px] text-white text-opacity-80">Go Back</span>
      </motion.a>
    </Link>
  );
}
