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
    {
      icon: "fal fa-chart-bar text-teal-500",
      label: "Advanced Server Analytics",
    },
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
    <Tilt
      tiltMaxAngleX={2}
      tiltMaxAngleY={2}
      tiltReverse
      className="w-full md:w-auto"
    >
      <motion.div
        className="flex w-full flex-col items-start justify-start overflow-hidden rounded-[12px] border-2 border-olive-940 md:w-[450px]"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex h-40 w-full flex-col items-start justify-center space-y-2 bg-gradient-to-br from-olive-800 to-olive-930 px-5 md:h-48">
          <div className="flex items-center justify-center space-x-1.5 rounded-full bg-white py-1 px-4">
            <i className="fad fa-diamond text-base text-olive-500" />
            <p className="select-none text-base font-medium text-olive-500">
              MONTHLY
            </p>
          </div>
          <p className="select-none text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            $4.99
          </p>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-y-5 bg-olive-980 p-3 md:p-6">
          <div className="flex select-none flex-col items-start justify-start space-y-1">
            <p className="text-2xl font-bold text-white text-opacity-90 md:text-3xl">
              Features
            </p>
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
          {props.user ? (
            <div
              className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-white bg-opacity-[0.08] py-3 transition duration-300 hover:bg-opacity-10"
              onClick={openModal}
            >
              <i className="fad fa-shopping-cart text-lg text-olive-400 md:text-xl" />
              <p className="text-lg font-bold text-olive-400 md:text-xl">
                SUBSCRIBE
              </p>
            </div>
          ) : (
            <Link href="/login">
              <a className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-white bg-opacity-[0.08] py-3 transition duration-300 hover:bg-opacity-10">
                <i className="fad fa-sign-in text-lg text-olive-400 md:text-xl" />
                <p className="text-lg font-bold text-olive-400 md:text-xl">
                  LOGIN
                </p>
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
    <div className="flex items-center justify-start space-x-2">
      <i
        className={`${props.icon} w-[23px] text-center text-lg md:w-[32px] md:text-2xl`}
      />
      <p className="text-lg text-white text-opacity-70 md:text-2xl">
        {props.label}
      </p>
    </div>
  );
}
