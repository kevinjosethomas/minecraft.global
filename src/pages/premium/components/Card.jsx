import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function Card(props) {
  const features = [
    { icon: "fad fa-diamond text-olive-500", label: "Premium Badge" },
    { icon: "far fa-link text-yellow-700", label: "Custom Server URL" },
    { icon: "fab fa-discord text-[#5865F2]", label: "Exclusive Discord Role" },
    { icon: "far fa-stars text-red-700", label: "Prominent Server Card" },
    { icon: "fal fa-chart-bar text-teal-500", label: "Advanced Server Analytics" },
    {
      icon: "fal fa-sack-dollar text-orange-500",
      label: "$5 Monthly Auction Credit",
    },
    { icon: "fal fa-heartbeat text-red-700", label: "Support Us" },
  ];

  const openModal = () => {
    if (!props.user.servers.filter((s) => !s.premium).length) {
      toast.error("You don't have any servers :(");
      return;
    }

    props.showModal(true);
  };

  return (
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} tiltReverse className="w-full md:w-auto">
      <motion.div
        className="flex flex-col items-start justify-start w-full md:w-[450px] rounded-[12px] border-2 border-olive-940 overflow-hidden"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex flex-col items-start justify-center w-full h-40 md:h-48 px-5 bg-gradient-to-br from-olive-800 to-olive-930">
          <div className="flex flex-row items-center justify-center py-1 px-4 space-x-1.5 bg-white rounded-full">
            <i className="fad fa-diamond text-base text-olive-500" />
            <span className="font-medium text-base text-olive-500 select-none">MONTHLY</span>
          </div>
          <span className="font-bold text-6xl md:text-7xl text-white tracking-tight leading-tight select-none">
            $4.99
          </span>
        </div>
        <div className="flex flex-col items-start justify-start w-full p-3 md:p-6 space-y-5 bg-olive-980">
          <div className="flex flex-col items-start justify-start space-y-1 select-none">
            <span className="font-bold text-2xl md:text-3xl text-white text-opacity-90">
              Features
            </span>
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
          {props.user ? (
            <div
              className="flex flex-row items-center justify-center w-full py-3 space-x-2 bg-white bg-opacity-[0.08] hover:bg-opacity-10 rounded cursor-pointer transition duration-300"
              onClick={openModal}
            >
              <i className="fad fa-shopping-cart text-lg md:text-xl text-olive-400" />
              <span className="font-bold text-lg md:text-xl text-olive-400">SUBSCRIBE</span>
            </div>
          ) : (
            <Link href="/login">
              <a className="flex flex-row items-center justify-center w-full py-3 space-x-2 bg-white bg-opacity-[0.08] hover:bg-opacity-10 rounded cursor-pointer transition duration-300">
                <i className="fad fa-sign-in text-lg md:text-xl text-olive-400" />
                <span className="font-bold text-lg md:text-xl text-olive-400">LOGIN</span>
              </a>
            </Link>
          )}
        </div>
      </motion.div>
    </Tilt>
  );
}

function Feature(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-2">
      <i className={`${props.icon} w-[23px] md:w-[32px] text-lg md:text-2xl text-center`} />
      <span className="text-lg md:text-2xl text-white text-opacity-70">{props.label}</span>
    </div>
  );
}
