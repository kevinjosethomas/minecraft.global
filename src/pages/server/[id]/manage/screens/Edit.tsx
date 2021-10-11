import { useEffect, useState } from "react";

import Tags from "../modals/Tags";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import TextArea from "../components/TextArea";
import TagsButton from "../components/TagsButton";
import LongDescription from "../components/LongDescription";

type EditProps = {
  server: Record<string, any>;
};

function Edit(props: EditProps): JSX.Element {
  const [parameters, setParameters] = useState({
    name: props.server.name,
    host: props.server.host,
    port: "25565",
    description: "",
    tags: [...props.server.tags],
    whitelisted: props.server.whitelisted,
    bedrock: props.server.bedrock,
    cracked: props.server.cracked,
    website_url: props.server.website_url || "",
    discord_url: props.server.discord_url || "",
    trailer_url: props.server.trailer_url || "",
    long_description: props.server.long_description,
  });

  const [tagsModal, showTagsModal] = useState(false);

  const onNameChange = (e: any) => {
    if (e.target.value.length >= 32) {
      return;
    }
    setParameters({ ...parameters, name: e.target.value });
  };

  const onHostnameChange = (e: any) => {
    if (e.target.value.length >= 258) {
      return;
    }
    setParameters({ ...parameters, host: e.target.value });
  };

  const onPortChange = (e: any) => {
    if (e.target.value < 0 || e.target.value > 65535) {
      return;
    }
    setParameters({ ...parameters, port: e.target.value.replace(/[^0-9]/g, "") });
  };

  const onDescriptionChange = (e: any) => {
    if (e.target.value.length >= 150) {
      return;
    }
    setParameters({ ...parameters, description: e.target.value });
  };

  const onWhitelistedChange = () => {
    setParameters({ ...parameters, whitelisted: !parameters.whitelisted });
  };

  const onBedrockChange = () => {
    setParameters({ ...parameters, bedrock: !parameters.bedrock });
  };

  const onCrackedChange = () => {
    setParameters({ ...parameters, cracked: !parameters.cracked });
  };

  const onWebsiteChange = (e: any) => {
    if (e.target.value.length >= 220) {
      return;
    }
    setParameters({ ...parameters, website_url: e.target.value });
  };

  const onDiscordChange = (e: any) => {
    if (e.target.value.length >= 32) {
      return;
    }
    setParameters({ ...parameters, discord_url: e.target.value });
  };

  const onTrailerChange = (e: any) => {
    if (e.target.value.length >= 220) {
      return;
    }
    setParameters({ ...parameters, trailer_url: e.target.value });
  };

  const onLongDescriptionChange = (e: any) => {
    if (e.target.value.length >= 5000) {
      return;
    }
    setParameters({ ...parameters, long_description: e.target.value });
  };

  useEffect(() => {
    if (tagsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [tagsModal]);

  return (
    <>
      {tagsModal && (
        <Tags parameters={parameters} setParameters={setParameters} showTagsModal={showTagsModal} />
      )}
      <div className="flex flex-col items-start justify-start w-full p-10 space-y-6 bg-dark-800 rounded border-2 border-gray-800">
        <Input label="Server Name" value={parameters.name} setValue={onNameChange} />
        <Input label="Server Hostname" value={parameters.host} setValue={onHostnameChange} />
        <Input label="Server Port" value={parameters.port} setValue={onPortChange} />
        <TextArea
          label="Server Description"
          value={parameters.description}
          setValue={onDescriptionChange}
        />
        <TagsButton
          tagsModal={tagsModal}
          showTagsModal={showTagsModal}
          parameters={parameters}
          setParameters={setParameters}
        />
        <div className="flex flex-col items-start justify-start space-y-2">
          <span className="font-medium text-3xl text-gray-400">Server Properties</span>
          <Checkbox
            label="Whitelisted"
            checked={parameters.whitelisted}
            onClick={onWhitelistedChange}
          />
          <Checkbox
            label="Bedrock Edition"
            checked={parameters.bedrock}
            onClick={onBedrockChange}
          />
          <Checkbox label="Cracked" checked={parameters.cracked} onClick={onCrackedChange} />
        </div>
        <Input label="Website" value={parameters.website_url} setValue={onWebsiteChange} />
        <Input label="Discord" value={parameters.discord_url} setValue={onDiscordChange} />
        <Input label="Trailer" value={parameters.trailer_url} setValue={onTrailerChange} />
        <LongDescription value={parameters.long_description} setValue={onLongDescriptionChange} />
      </div>
    </>
  );
}

export default Edit;
