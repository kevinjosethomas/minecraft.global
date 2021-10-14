import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Navbar from "ui/components/Navbar/Navbar";
import Footer from "ui/components/Footer/Footer";
import Banner from "ui/components/Navbar/components/Banner";

type Default = {
  children?: React.ReactNode;
  user?: Record<string, any>;
  background: string;
};

const Default = (props: Default): JSX.Element => {
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    setBanner(localStorage.getItem("banner") !== "false");
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full">
      {banner && <Banner banner={banner} setBanner={setBanner} />}
      <Navbar user={props.user} />
      <div
        className={`flex flex-col items-start justify-start w-full h-full p-5 md:p-20 3xl:px-40 ${props.background}`}
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
