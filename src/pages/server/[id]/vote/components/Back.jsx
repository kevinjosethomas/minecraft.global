import Link from "next/link";
import { motion } from "framer-motion";

export default function Back(props) {
  return (
    <Link href={`/server/${props.server_id}`}>
      <motion.a
        className="flex cursor-pointer items-center justify-center space-x-3 rounded-lg bg-white bg-opacity-[0.08] px-4 py-1 transition duration-300 hover:bg-opacity-10"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <i className="far fa-eye text-xl text-white text-opacity-80 transition duration-300" />
        <p className="text-2xl font-medium text-white text-opacity-80">
          View Server
        </p>
      </motion.a>
    </Link>
  );
}
