import { useEffect, useState } from "react";

import Tags from "../modals/Tags";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import TagsButton from "../components/TagsButton";

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
    whitelisted: false,
    bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
    long_description: "",
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
      </div>
    </>
  );
}

export default Edit;
