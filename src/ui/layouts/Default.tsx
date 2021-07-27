import { motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";
import Footer from "ui/components/Footer/Footer";

type Default = {
  children?: React.ReactNode;
  user?: Record<string, any>;
  background: string;
};

const Default = (props: Default): JSX.Element => {
  return (
    <div className="flex flex-col items-start justify-start w-full overflow-x-hidden">
      <Navbar user={props.user} />
      <div
        className={`flex flex-col items-start justify-start w-full h-full p-5 md:p-20 ${props.background}`}
      >
        <motion.div
          className="flex flex-col items-start justify-start w-full h-full"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {props.children}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Default;
