import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// import Navbar from "ui/components/Navbar/Navbar";
// import Footer from "ui/components/Footer/Footer";

const Default = (props) => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      {/* <Navbar user={props.user} /> */}
      <div className="absolute top-0 left-0 bg-gradient w-screen h-full"></div>
      <div className="flex flex-col items-start justify-start w-1200 h-full">
        <motion.div
          className="flex flex-col items-start justify-start w-full h-full"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {props.children}
        </motion.div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Default;
