import moment from "moment";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { UpvoteServer } from "api/upvote";
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
    const [response, error] = await UpvoteServer(
      props.server_id,
      username,
      captchaCode
    );

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

    toast.success(
      "Successfully upvoted the server! Check out other servers in the meantime!"
    );
    props.setUpvoted(true);
    props.setCanVoteAt(moment().add(18, "hours").toDate());
    localStorage.setItem("upvote_playername", username);
  };

  return (
    <motion.div
      className="flex w-full flex-col items-start justify-between space-y-4 rounded border-2 border-olive-920 bg-olive-950 p-4 md:h-[416px] md:space-y-0 md:p-8"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Identity name={props.name} favicon={props.favicon} />
      <div className="flex flex-col items-start justify-start">
        <p className="text-lg text-white text-opacity-80 md:text-2xl">
          Your Minecraft Username
        </p>
        <input
          value={username}
          onChange={onUsernameChange}
          className="focus:outline-none w-full rounded bg-white bg-opacity-10 px-2 py-1 text-xl text-white text-opacity-90"
        />
      </div>
      <ReCAPTCHA
        theme="dark"
        onChange={onChange}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      />
      <div className="flex w-full flex-row items-center justify-center space-x-4">
        <Link href={`/server/${props.server_id}`}>
          <a className="flex w-full cursor-pointer flex-row items-center justify-center rounded bg-white bg-opacity-10 py-2 transition duration-300 hover:bg-opacity-[0.15]">
            <p className="select-none text-xl text-white text-opacity-80 md:text-2xl">
              Go Back
            </p>
          </a>
        </Link>
        <div
          className={`flex w-full flex-row items-center justify-center py-2 ${
            username && captchaCode
              ? "cursor-pointer bg-olive-900 transition duration-300 hover:bg-olive-800"
              : "cursor-not-allowed bg-olive-940"
          } rounded`}
          onClick={() => (username && captchaCode ? submit() : void 0)}
        >
          <p className="select-none text-xl text-white text-opacity-80 md:text-2xl">
            Upvote
          </p>
        </div>
      </div>
    </motion.div>
  );
}
