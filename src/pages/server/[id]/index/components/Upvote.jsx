import Link from "next/link";
import { motion } from "framer-motion";
import SimplifyNumber from "simplify-number";

export default function Upvote(props) {
  return (
    <Link href={`/server/${props.server_id}/vote`} passHref>
      <motion.a
        className="flex flex-row items-center justify-center h-[72px] px-8 space-x-2 bg-olive-900 rounded-[12px] hover:bg-olive-910 transition duration-300 select-none"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <i className="fas fa-arrow-alt-up text-3xl text-white text-opacity-90" />
        <h5 className="font-medium text-3xl text-white text-opacity-90">
          Upvote ({SimplifyNumber(props.monthly_votes, { decimal: 1 })})
        </h5>
      </motion.a>
    </Link>
  );
}
