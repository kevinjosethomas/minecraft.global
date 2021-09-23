import moment from "moment";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";

import { Server } from "lib/types";
import { UpvoteServer } from "api/server";
import Toast from "ui/components/Toast/Toast";

type UpvoteProps = {
  voters: Record<string, any>[];
  server: Server;
  showUpvoteModal: CallableFunction;
};

function Upvote(props: UpvoteProps): JSX.Element {
  const [captcha, setCaptcha] = useState(false);
  const [playername, setPlayername] = useState("");
  const [canUpvote, setCanUpvote] = useState(false);

  const placeholders = ["Steve", "Alex", "Dream", "DanTDM", "Creeper"];
  const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  const voters = [];
  for (let i = 0; i < 10; i++) {
    if (props.voters[i]) {
      voters.push(props.voters[i]);
    } else {
      voters.push({ minecraft_username: "...", vote_count: "" });
    }
  }

  const onCaptchaChange = (code: string | null) => {
    if (code) {
      setCaptcha(true);
    }
  };

  const onUpvote = async () => {
    const [response, error] = await UpvoteServer(props.server.server_id.toString(), playername);

    if (error) {
      if (error?.response?.status == 422) {
        toast.custom((t) => (
          <Toast
            icon="fas fa-times-circle text-red-500 text-opacity-75"
            title="Invalid username provided!"
            subtitle="Please make sure your Minecraft username is correct!"
          />
        ));
      } else if (error?.response?.status == 429) {
        const lastvote = moment
          .duration(error.response.data.payload.detail.last_vote)
          .add(18, "hours")
          .humanize(true);
        toast.custom((t) => (
          <Toast
            icon="fas fa-times-circle text-red-500 text-opacity-75"
            title={`Already upvoted ${props.server.name}!`}
            subtitle={`You can vote again in ${lastvote}!`}
          />
        ));
      } else {
        toast.custom((t) => (
          <Toast
            icon="fas fa-times-circle text-red-500 text-opacity-75"
            title="An unknown error occurred!"
            subtitle="This error was automatically broadcasted!"
          />
        ));
      }
      return;
    }

    toast.custom((t) => (
      <Toast
        icon="fas fa-check-circle text-green-600"
        title={`Successfully upvoted ${props.server.name}!`}
        subtitle={`You can upvote ${props.server.name} again in 18 hours!`}
      />
    ));
    props.showUpvoteModal(false);
  };

  useEffect(() => {
    if (captcha && playername && playername.length <= 16) {
      setCanUpvote(true);
    } else {
      setCanUpvote(false);
    }
  }, [captcha, playername]);

  return (
    <div
      className="fixed grid grid-flow-row md:grid-flow-col content-center gap-y-4 md:gap-y-0 md:gap-x-10 justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-10 overflow-y-hidden"
      onClick={() => props.showUpvoteModal(false)}
    >
      <div
        className="flex flex-col items-start justify-center md:justify-between p-4 md:p-10 bg-dark-800 border-2 border-gray-800 rounded space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-4xl text-gray-400">Upvote {props.server.name}</span>
        <div className="flex flex-col items-start justify-center w-full md:pr-72">
          <span className="font-medium text-lg text-gray-400">Your Minecraft username</span>
          <input
            className="px-2 py-1 w-full text-gray-400 placeholder-gray-500 bg-dark-300 rounded focus:outline-none"
            onChange={(e) => setPlayername(e.target.value)}
            value={playername}
            placeholder={placeholder}
          />
        </div>
        <ReCAPTCHA
          theme="dark"
          onChange={onCaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        />
        <div className="flex flex-row items-center justify-center w-full space-x-4">
          <div
            className="flex flex-row items-center justify-center w-full py-1.5 bg-dark-400 rounded cursor-pointer select-none"
            onClick={() => props.showUpvoteModal(false)}
          >
            <span className="font-medium text-lg text-gray-400">Cancel</span>
          </div>
          <div
            className={`flex flex-row items-center justify-center w-full py-1.5 ${
              canUpvote ? "cursor-pointer hover:bg-olive-700" : "cursor-not-allowed"
            } bg-olive-800 rounded select-none`}
            onClick={() => canUpvote && onUpvote()}
          >
            <span className="font-medium text-lg text-gray-300">Upvote</span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-start justify-center p-4 space-y-2 bg-dark-800 border-2 border-gray-800 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-2xl text-gray-300">
          {moment(new Date()).format("MMM")}’s top voters
        </span>
        <div className="flex flex-col items-start justify-cente w-full space-y-0.5">
          {voters.map((voter, index) => (
            <div key={index} className="flex flex-row items-center justify-between w-full">
              <span className="pr-20 font-medium text-gray-400">{voter.minecraft_username}</span>
              <span className="font-medium text-gray-400">{voter.vote_count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upvote;
