import moment from "moment";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useToasts } from "react-toast-notifications";

import upvoteServer from "../../../../api/server/vote";

function Upvote(props) {
  const { addToast } = useToasts();
  const [captcha, setCaptcha] = useState(false);
  const [playername, setPlayername] = useState("");

  const onCaptchaChange = (captchaCode) => {
    if (captchaCode) {
      setCaptcha(true);
    }
  };

  const onSubmit = async () => {
    if (captcha && playername && playername.length >= 3 && playername.length <= 16) {
      const [response, error] = await upvoteServer(props.server.server_id, playername);

      if (error) {
        if (error?.response?.status == 429) {
          const lastVote = moment
            .duration(error.response.data.payload.detail.last_vote)
            .add(18, "hours");
          addToast(
            `You have already upvoted this server in the last 18 hours! You can vote again ${lastVote.humanize(
              true
            )}`,
            { appearance: "error" }
          );
          return;
        } else if (error?.response?.status == 422) {
          addToast("Invalid information provided, please try again!", {
            appearance: "error",
          });
        } else {
          addToast("An unknown error occured, please contact support!", {
            appearance: "error",
          });
        }
        return;
      }

      props.closeModal();
      addToast(`Successfully upvoted ${props.server.name}!`, {
        appearance: "success",
      });
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-50"
      onClick={props.closeModal}
    >
      <div
        className="flex flex-col items-center justify-center bg-dark-70 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between w-full px-20 py-5 bg-black bg-opacity-50 rounded-t-md">
          <span className="font-bold text-3xl text-gray-400">Upvote {props.server.name}</span>
          <div
            className="flex flex-row items-center justify-center w-10 h-10 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-full cursor-pointer transition duration-500"
            onClick={props.closeModal}
          >
            <i className="far fa-times text-xl text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pl-20 pr-96 py-10 space-y-8 bg-black bg-opacity-30 rounded-b-md">
          <div className="flex flex-col items-start justify-center space-y-2">
            <span className="font-medium text-lg text-gray-400">Your Minecraft username</span>
            <input
              className="w-full px-3 py-2 focus:outline-none bg-white bg-opacity-10 rounded-sm text-sm text-gray-400"
              onChange={(e) => setPlayername(e.target.value)}
              placeholder="Steve"
            />
          </div>
          <ReCAPTCHA
            theme="dark"
            onChange={onCaptchaChange}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          />
          <div
            className={`flex flex-row items-center justify-center px-10 py-3 ${
              captcha && playername && playername.length >= 3 && playername.length <= 16
                ? "bg-olive-60 cursor-pointer"
                : "bg-olive-70 cursor-not-allowed"
            } rounded-sm`}
            onClick={onSubmit}
          >
            <span className="font-semibold text-xl text-gray-300">Upvote</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upvote;
