import { useState } from "react";

import Input from "../components/Input";

export default function Votifier(props) {
  const [username, setUsername] = useState("");

  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;
    if (key === "votifier_port") {
      formatted = formatted.replace(/[^0-9]/g, "");
      if (formatted < 0 || formatted > 65535) {
        return;
      }
    }
    props.setDetails((d) => ({ ...d, votifier: { ...d.votifier, [key]: formatted } }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-10">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <p className="max-w-lg text-lg text-white text-opacity-80">
          We only support Votifier and NuVotifier. This section is optional. However, we recommend
          setting up vote rewards (read more).
        </p>
        <Input
          label="Votifier Host"
          description="Your Votifier IP address (in config.yml)"
          value={props.details.votifier.votifier_host}
          onChange={(e) => onValueChange("votifier_host", e.target.value, 32)}
        />
        <Input
          label="Votifier Port"
          description="Your Votifier Port (in config.yml)"
          value={props.details.votifier.votifier_port}
          onChange={(e) => onValueChange("votifier_port", e.target.value, 32)}
        />
        <Input
          label="Votifier Token"
          description="Your Votifier Token (in config.yml)"
          value={props.details.votifier.votifier_token}
          onChange={(e) => onValueChange("votifier_token", e.target.value, 32)}
        />
      </div>
      <div className="w-full h-0.5 bg-white bg-opacity-20" />
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <div className="flex flex-col items-start justify-start w-full space-y-2">
          <h1 className="font-medium text-4xl text-white text-opacity-90">Test Votifier</h1>
          <p className="max-w-lg text-lg text-white text-opacity-80">
            Make sure you save any changes before testing Votifier! We will send a test vote to
            reward the specified user!
          </p>
        </div>
        <Input
          label="Minecraft Username"
          description="Username of a player on your server"
          value={username}
          onChange={(e) => setUsername(e.target.value.substring(0, 16))}
        />
        <div className="flex flex-row items-center justify-center px-4 py-2 space-x-2 bg-olive-800 hover:bg-olive-900 rounded cursor-pointer transition duration-300">
          <i className="fas fa-arrow-alt-up text-xl text-white text-opacity-80" />
          <p className="font-medium text-xl text-white text-opacity-80 select-none">
            Send Test Upvote
          </p>
        </div>
      </div>
    </div>
  );
}
