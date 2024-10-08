import Link from "next/link";
import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { RegenToken } from "api/server";
import { GetAnalyticsPlugin } from "api/premium";

export default function Instructions(props) {
  const [token, setToken] = useState(props.server.server_token);
  const [downloadUrl, setDownloadUrl] = useState("");

  const regenerateToken = async () => {
    const token = cookie.get("token");
    const [response, error] = await RegenToken(props.server.server_id, token);

    if (error) {
      toast.error("Failed to regenerate token!");
      return;
    }

    toast.success("Successfully regenerated token!");
    setToken(response.payload);
  };

  useEffect(() => {
    (async () => {
      const [response, error] = await GetAnalyticsPlugin();

      if (error) {
        console.log(error);
        toast.error("Failed to fetch plugin download!");
        return;
      }

      setDownloadUrl(response);
    })();
  }, []);

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-6 overflow-hidden">
      <p className="text-xl text-white text-opacity-80">
        Thanks for purchasing Premium! Here are the steps to setup Server
        Analytics -
      </p>
      <div className="flex w-full flex-col items-start justify-start space-y-8">
        <Download url={downloadUrl} />
        <Token token={token} regen={regenerateToken} />
        <Analytics server_id={props.server.server_id} />
      </div>
    </div>
  );
}

function Download(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-900">
          <p className="select-none text-xl text-white text-opacity-90">1</p>
        </div>
        <p className="text-3xl text-white text-opacity-90">
          Download Analytics Plugin
        </p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <p className="text-xl text-white text-opacity-80">
          Download our Analytics plugin and add it to your server&apos;s plugin
          directory! The plugin supports 1.8 - 1.18 Bukkit, Spigot & Paper
          servers!
        </p>
        <a
          href={props.url}
          className="flex cursor-pointer items-center justify-center rounded bg-olive-800 px-4 py-2 transition duration-300 hover:bg-olive-900"
          download
        >
          <p className="select-none text-xl text-white text-opacity-90">
            Download Plugin
          </p>
        </a>
      </div>
    </div>
  );
}

function Token(props) {
  const copyCommand = (e) => {
    navigator.clipboard.writeText(`/settoken ${props.token}`);
    toast.success("Successfully copied command!");
  };

  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-900">
          <p className="select-none text-xl text-white text-opacity-90">2</p>
        </div>
        <p className="text-3xl text-white text-opacity-90">Set Server Token</p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <p className="text-xl text-white text-opacity-80">
          Restart your server once you add the plugin and run the command below
          to use your server&apos;s token to initialize plugin. If your token is
          compromised, regenerate it via the button below -
        </p>
        <div className="flex items-center justify-start space-x-4">
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-olive-800 px-4 py-2 transition duration-300 hover:bg-olive-900"
            onClick={copyCommand}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Copy Command
            </p>
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded bg-olive-800 px-4 py-2 transition duration-300 hover:bg-olive-900"
            onClick={props.regen}
          >
            <p className="select-none text-xl text-white text-opacity-90">
              Regenerate Token
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Analytics(props) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive-900">
          <p className="select-none text-xl text-white text-opacity-90">3</p>
        </div>
        <p className="text-3xl text-white text-opacity-90">
          Analyze Statistics
        </p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2">
        <p className="format-links text-xl text-white text-opacity-80">
          Congratulations! Your server will now send statistics to our website
          every hour! Join our{" "}
          <a
            href="https://discord.minecraft.global/"
            target="_blank"
            rel="noreferrer nofollow"
          >
            Discord
          </a>{" "}
          if you have any questions, suggestions or issues regarding analytics!
        </p>
        <div className="flex items-center justify-start">
          <Link href={`/server/${props.server_id}/analytics`}>
            <a className="flex cursor-pointer items-center justify-center rounded bg-olive-800 px-4 py-2 transition duration-300 hover:bg-olive-900">
              <p className="select-none text-xl text-white text-opacity-90">
                View Analytics
              </p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
