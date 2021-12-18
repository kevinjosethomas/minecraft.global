import moment from "moment";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { UpvoteServer } from "api/server";
import Identity from "../components/Identity";

export default function Upvote(props) {
  const [captchaCode, setCaptchaCode] = useState(null);
  const [username, setUsername] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value.substring(0, 16));
  };

  const onChange = (code) => {
    setCaptchaCode(code);
  };

  useEffect(() => {
    if (username) return;

    const stored = localStorage.getItem("upvote_playername");
    if (stored) {
      setUsername(stored);
    }
  }, []);

  const submit = async () => {
    const [response, error] = await UpvoteServer(props.server_id, username, captchaCode);

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error("Invalid captcha, please reload and try again!");
          break;
        case 422:
          toast.error("Invalid username, please try again!");
          break;
        case 429:
          const vote = moment(error.response.data.payload.detail.last_vote)
            .add(18, "hours")
            .fromNow();
          toast.error(`Too early! You can vote again in ${vote}`);
          break;
        default:
          toast.error("An unknown error occured, please try again later!");
      }
      return;
    }

    toast.success("Successfully upvoted the server! Check out other servers in the meantime!");
    props.setUpvoted(true);
    localStorage.setItem("upvote_playername", username);
  };

  return (
    <motion.div
      className="flex flex-col items-start justify-between w-full md:h-[416px] p-4 md:p-8 space-y-4 md:space-y-0 bg-olive-950 rounded border-2 border-olive-920"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Identity name={props.name} favicon={props.favicon} />
      <div className="flex flex-col items-start justify-start">
        <p className="text-lg md:text-2xl text-white text-opacity-80">Your Minecraft Username</p>
        <input
          value={username}
          onChange={onUsernameChange}
          className="w-full px-2 py-1 bg-white bg-opacity-10 text-xl text-white text-opacity-90 rounded focus:outline-none"
        />
      </div>
      <ReCAPTCHA
        theme="dark"
        onChange={onChange}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      />
      <div className="flex flex-row items-center justify-center w-full space-x-4">
        <Link href={`/server/${props.server_id}`}>
          <a className="flex flex-row items-center justify-center w-full py-2 bg-white bg-opacity-10 cursor-pointer rounded hover:bg-opacity-[0.15] transition duration-300">
            <p className="text-xl md:text-2xl text-white text-opacity-80 select-none">Go Back</p>
          </a>
        </Link>
        <div
          className={`flex flex-row items-center justify-center w-full py-2 ${
            username && captchaCode
              ? "bg-olive-900 hover:bg-olive-800 cursor-pointer transition duration-300"
              : "bg-olive-940 cursor-not-allowed"
          } rounded`}
          onClick={() => (username && captchaCode ? submit() : void 0)}
        >
          <p className="text-xl md:text-2xl text-white text-opacity-80 select-none">Upvote</p>
        </div>
      </div>
    </motion.div>
  );
}
