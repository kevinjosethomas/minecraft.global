import { useEffect, useState } from "react";

import { GetUsernameFromUUID } from "api/mojang";

export default function Connections(props) {
  const [username, setUsername] = useState("...");

  useEffect(() => {
    (async () => {
      if (props.minecraft_uuid) {
        const [response, error] = await GetUsernameFromUUID(props.minecraft_uuid);

        if (error) {
          return;
        }

        setUsername(response.name);
      } else {
        setUsername("Link your Minecraft Account");
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 space-y-2 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-[50px] text-white text-opacity-90">Connections</h1>
      <div className="flex flex-col items-start justify-start space-y-2">
        {props.discord_id && (
          <div className="flex flex-row items-center justify-start w-[400px] px-4 py-1.5 space-x-2 bg-[#5865F2] hover:bg-opacity-70 rounded-lg transition duration-300 cursor-default">
            <i className="fab fa-discord w-[30px] text-[24px] text-white" />
            <span className="text-[24px] text-white">{props.discord_id}</span>
          </div>
        )}
        {props.google_id && (
          <div className="flex flex-row items-center justify-start w-[400px] px-4 py-1.5 space-x-2 bg-[#DCA504] hover:bg-opacity-80 rounded-lg transition duration-300 cursor-default">
            <i className="fab fa-google w-[30px] text-[24px] text-white" />
            <span className="text-[24px] text-white">{props.google_name}</span>
          </div>
        )}
        {props.minecraft_uuid && (
          <div className="flex flex-row items-center justify-start w-[400px] px-4 py-1.5 space-x-2 bg-olive-800 hover:bg-opacity-80 rounded-lg transition duration-300 cursor-default">
            <i className="far fa-cube w-[30px] text-[24px] text-white" />
            <span className="text-[24px] text-white">{username}</span>
          </div>
        )}
      </div>
    </div>
  );
}
