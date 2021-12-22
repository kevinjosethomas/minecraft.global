import { useEffect, useState } from "react";

import Tags from "../components/Tags";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Properties from "../components/Properties";

export default function Features(props) {
  const platforms = [
    { id: 1, label: "Java Edition Only" },
    { id: 2, label: "Bedrock Edition Only" },
    { id: 3, label: "Java & Bedrock Edition" },
  ];
  const [platform, setPlatform] = useState(platforms[0]);

  useEffect(() => {
    switch (platform.id) {
      case 1:
        props.setDetails((d) => ({ ...d, bedrock: false, supports_bedrock: false }));
        break;
      case 2:
        props.setDetails((d) => ({ ...d, bedrock: true, supports_bedrock: false }));
        break;
      case 3:
        props.setDetails((d) => ({ ...d, bedrock: false, supports_bedrock: true }));
        break;
    }
  }, [platform]);

  function onValueChange(key, value, max, premium) {
    if (premium && !props.server.premium) {
      return;
    }
    let formatted = max ? value.substring(0, max) : value;
    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <Dropdown
          label="Server Platform"
          description="Select the platform your server runs on"
          value={platform}
          setValue={setPlatform}
          options={platforms}
        />
        <Tags tags={props.details.tags} setDetails={props.setDetails} />
        <Properties details={props.details} setDetails={props.setDetails} />
        <Input
          label="Server Website"
          description="Your server's website (with https://)"
          value={props.details.website_url}
          onChange={(e) => onValueChange("website_url", e.target.value, 258)}
        />
        <Input
          label="Server Discord"
          description="Invite to your server's Discord server"
          value={props.details.discord_url}
          onChange={(e) => onValueChange("discord_url", e.target.value, 258)}
        />
        <Input
          label="Server Trailer"
          description="A video that represents your server"
          value={props.details.trailer_url}
          onChange={(e) => onValueChange("trailer_url", e.target.value, 258)}
        />
        <Input
          label="Server Store"
          description="Your server's store (with https://)"
          value={props.details.store_url}
          onChange={(e) => onValueChange("store_url", e.target.value, 258)}
        />
      </div>
    </div>
  );
}
