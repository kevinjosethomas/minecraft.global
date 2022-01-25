import Link from "next/link";
import { motion } from "framer-motion";
import SimplifyNumber from "simplify-number";

export default function Upvote(props) {
  return (
    <Link href={`/server/${props.server_id}/vote`} passHref>
      <motion.a
        className="flex w-full select-none flex-row items-center justify-center space-x-2 rounded-xl bg-olive-900 py-5 px-8 transition duration-300 hover:bg-olive-910 md:w-auto"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <i className="fas fa-arrow-alt-up text-3xl text-white text-opacity-90" />
        <h5 className="text-3xl font-medium text-white text-opacity-90">
          Upvote ({SimplifyNumber(props.monthly_votes, { decimal: 1 })})
        </h5>
      </motion.a>
    </Link>
  );
}
