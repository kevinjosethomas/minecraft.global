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
        case 400:
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
      className="flex w-full flex-col items-start justify-between space-y-4 rounded-xl border-2 border-olive-930 bg-olive-940 bg-opacity-80 p-4 md:h-[416px] md:space-y-0 md:p-8"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Identity name={props.name} favicon={props.favicon} />
      <div className="flex flex-col items-start justify-start space-y-1">
        <p className="text-lg text-white text-opacity-80 md:text-2xl">
          Your Minecraft Username
        </p>
        <input
          value={username}
          onChange={onUsernameChange}
          className="focus:outline-none w-[304px] rounded-lg border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-4 py-2 text-xl text-white text-opacity-90"
        />
      </div>
      <ReCAPTCHA
        theme="dark"
        onChange={onChange}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      />
      <div className="flex w-full items-center justify-end space-x-4">
        <div
          className={`flex items-center justify-center py-2 px-6  ${
            username && captchaCode
              ? "cursor-pointer transition duration-300 hover:bg-olive-900"
              : "cursor-not-allowed"
          } rounded-xl bg-olive-800`}
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
