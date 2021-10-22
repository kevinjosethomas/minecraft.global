import { motion } from "framer-motion";

import Navbar from "ui/components/Navbar/Navbar";
// import Footer from "ui/components/Footer/Footer";

const Default = (props) => {
  return (
    <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 bg-gradient w-full h-full" />
      <div className="z-[1] flex flex-col items-center justify-start w-1200 h-full space-y-10">
        <Navbar user={props.user} />
        <motion.div
          className="z-[2] flex flex-col items-start justify-start w-full h-full"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {props.children}
        </motion.div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Default;
