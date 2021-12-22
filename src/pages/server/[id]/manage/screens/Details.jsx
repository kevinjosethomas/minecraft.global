import { useEffect, useState } from "react";

import Tags from "../components/Tags";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import TextArea from "../components/TextArea";
import Properties from "../components/Properties";
import LongDescription from "../components/LongDescription";
import filterInvalidChars from "lib/filterText";

export default function Details(props) {
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

    // if (key === "name" || key === "description" || key === "long_description") {
    //   formatted = filterInvalidChars(formatted);
    // }

    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <Input
          label="Server Name"
          description="Your server's name"
          value={props.details.name}
          onChange={(e) => onValueChange("name", e.target.value, 32)}
          required
        />
        <Input
          label="Server Address"
          description="Your server's IP address + port"
          value={props.details.host}
          onChange={(e) => onValueChange("host", e.target.value, 258)}
          required
        />
        <Input
          label="Server Vanity URL"
          description="A custom URL for your server"
          value={props.details.vanity}
          onChange={(e) => onValueChange("vanity", e.target.value, 258, true)}
          server={props.server}
          premium
        />
        <TextArea
          label="Server Description"
          description="Brief description about your server! Make it enticing enough so players fall for your server in the few seconds they take to read it!"
          value={props.details.description}
          onChange={(e) => onValueChange("description", e.target.value, 150)}
          required
        />
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
        <LongDescription
          value={props.details.long_description}
          onChange={(e) => onValueChange("long_description", e.target.value, 5000)}
        />
      </div>
    </div>
  );
}
