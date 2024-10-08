import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { TestUpvoteServer } from "api/upvote";

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
    props.setDetails((d) => ({
      ...d,
      votifier: { ...d.votifier, [key]: formatted },
    }));
  }

  const testUpvote = async () => {
    if (!username || username.length < 3 || username.length > 16) {
      toast.error("Invalid username provided!");
      return;
    }

    const token = cookie.get("token");
    const [response, error] = await TestUpvoteServer(
      props.server_id,
      username,
      token
    );

    if (error) {
      switch (error.response?.status) {
        case 401:
          toast.error(
            "An authorization error occured, please relogin and try again!"
          );
          break;
        case 400:
          toast.error(
            "Your server doesn't have any votifier data. Make sure you save changes first!"
          );
          break;
        default:
          toast.error("An unknown error occurred, please try again later!");
          break;
      }
      return;
    }

    if (response.payload.success) {
      toast.success("Successfully sent a test upvote!");
      return;
    }

    switch (response.payload.reason) {
      case "connection_error": {
        toast.error("Couldn't connect to your server! (check your firewall)");
        break;
      }
      case "invalid_response": {
        toast.error("Your server provided invalid data.");
        break;
      }
      case "timeout": {
        toast.error("Your server took too long to response! (check your firewall)");
        break;
      }
      case "not_ok_response": {
        toast.error("Your server provided an invalid response!");
        break;
      }
      case "unsupported_votifier_version": {
        toast.error(response.payload.message);
        break;
      }
      default: {
        toast.error("An unknown error occurred!");
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-10">
      <div className="flex w-full flex-col items-start justify-start space-y-8">
        <p className="max-w-lg text-lg text-white text-opacity-80">
          We support Votifier and NuVotifier. This section is optional, however,
          we recommend setting up vote rewards.
        </p>
        <Input
          label="Votifier Host"
          description="Your Votifier server IP (probably the same as your server's IP)"
          value={props.details.votifier.votifier_host}
          onChange={(e) => onValueChange("votifier_host", e.target.value, 32)}
        />
        <Input
          label="Votifier Port"
          description="Your Votifier port (in config.yml, usually 8192)"
          value={props.details.votifier.votifier_port}
          onChange={(e) => onValueChange("votifier_port", e.target.value, 32)}
        />
        <TextArea
          label="Votifier Token"
          description="Your Votifier token or key (in config.yml, or the public RSA key file"
          value={props.details.votifier.votifier_token}
          onChange={(e) =>
            onValueChange("votifier_token", e.target.value, 1024)
          }
        />
      </div>
      <div className="h-0.5 w-full bg-white bg-opacity-20" />
      <div className="flex w-full flex-col items-start justify-start space-y-6">
        <div className="flex w-full flex-col items-start justify-start space-y-2">
          <h1 className="text-4xl font-medium text-white text-opacity-90">
            Test Votifier
          </h1>
          <p className="max-w-lg text-lg text-white text-opacity-80">
            Make sure you save any changes before testing Votifier! We will send
            a test vote to reward the specified user!
          </p>
        </div>
        <Input
          label="Minecraft Username"
          description="Username of a player on your server"
          value={username}
          onChange={(e) => setUsername(e.target.value.substring(0, 16))}
        />
        <div
          className="flex cursor-pointer items-center justify-center space-x-2 rounded bg-olive-800 px-4 py-2 transition duration-300 hover:bg-olive-900"
          onClick={testUpvote}
        >
          <i className="fas fa-arrow-alt-up text-xl text-white text-opacity-80" />
          <p className="select-none text-xl font-medium text-white text-opacity-80">
            Send Test Upvote
          </p>
        </div>
      </div>
    </div>
  );
}
