import Link from "next/link";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Upvote(props) {
  const [captchaCode, setCaptchaCode] = useState(null);
  const [username, setUsername] = useState("");

  const onUsernameChange = (e) => {
    setUsername(e.target.value.substring(0, 16));
  };

  const onChange = (code) => {
    setCaptchaCode(code);
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-8 space-y-6 bg-olive-950 rounded border-2 border-olive-920">
      <div className="flex flex-col items-start justify-start">
        <span className="text-[24px] text-white text-opacity-80">Your Minecraft Username</span>
        <input
          value={username}
          onChange={onUsernameChange}
          className="w-full px-2 py-1 bg-white bg-opacity-10 text-[20px] text-white text-opacity-90 rounded focus:outline-none"
        />
      </div>
      <ReCAPTCHA
        theme="dark"
        onChange={onChange}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      />
      <div className="flex flex-row items-center justify-center w-full space-x-4">
        <Link href={`/server/${props.server_id}`}>
          <a className="flex flex-row items-center justify-center w-full py-2 bg-black bg-opacity-30 cursor-pointer rounded hover:bg-opacity-50 transition duration-300">
            <span className="text-[24px] text-white text-opacity-80 select-none">Go Back</span>
          </a>
        </Link>
        <div className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 cursor-pointer rounded hover:bg-olive-800 transition duration-300">
          <span className="text-[24px] text-white text-opacity-80 select-none">Upvote</span>
        </div>
      </div>
    </div>
  );
}
