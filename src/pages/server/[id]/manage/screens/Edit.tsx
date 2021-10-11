import { useState } from "react";
import Input from "../components/Input";

type EditProps = {
  server: Record<string, any>;
};

function Edit(props: EditProps): JSX.Element {
  const [parameters, setParameters] = useState({
    name: props.server.name,
    host: "",
    port: "25565",
    description: "",
    tags: [],
    whitelisted: false,
    bedrock: false,
    cracked: false,
    website_url: "",
    discord_url: "",
    trailer_url: "",
    long_description: "",
  });

  const onNameChange = (e: any) => {
    if (e.target.value.length >= 32) {
      return;
    }
    setParameters({ ...parameters, name: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 bg-dark-800 rounded border-2 border-gray-800">
      <Input label="Server Name" value={parameters.name} setValue={onNameChange} />
    </div>
  );
}

export default Edit;
