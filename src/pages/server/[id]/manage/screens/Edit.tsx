import cookie from "js-cookie";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import Tags from "../modals/Tags";
import validate from "lib/validate";
import Input from "../components/Input";
import { EditServer } from "api/server";
import Toast from "ui/components/Toast/Toast";
import Checkbox from "../components/Checkbox";
import TextArea from "../components/TextArea";
import TagsButton from "../components/TagsButton";
import LongDescription from "../components/LongDescription";

type EditProps = {
  server: Record<string, any>;
  user: Record<string, any>;
};

function Edit(props: EditProps): JSX.Element {
  const [parameters, setParameters] = useState({
    name: props.server.name,
    host: props.server.host,
    port: props.server.port,
    description: props.server.description,
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
    setParameters({ ...parameters, name: e.target.value.substring(0, 32) });
  };

  const onHostnameChange = (e: any) => {
    setParameters({ ...parameters, host: e.target.value.substring(0, 258) });
  };

  const onPortChange = (e: any) => {
    if (e.target.value < 0 || e.target.value > 65535) {
      return;
    }
    setParameters({ ...parameters, port: e.target.value.replace(/[^0-9]/g, "") });
  };

  const onDescriptionChange = (e: any) => {
    setParameters({ ...parameters, description: e.target.value.substring(0, 150) });
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
    setParameters({ ...parameters, website_url: e.target.value.substring(0, 220) });
  };

  const onDiscordChange = (e: any) => {
    setParameters({ ...parameters, discord_url: e.target.value.substring(0, 32) });
  };

  const onTrailerChange = (e: any) => {
    setParameters({ ...parameters, trailer_url: e.target.value.substring(0, 220) });
  };

  const onLongDescriptionChange = (e: any) => {
    setParameters({ ...parameters, long_description: e.target.value.substring(0, 5000) });
  };

  useEffect(() => {
    if (tagsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [tagsModal]);

  const submit = async () => {
    for (const key of Object.keys(parameters)) {
      const check = (validate as Record<string, CallableFunction>)[key](parameters);
      if (check !== true) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title={`Invalid ${key} provided`}
            subtitle={check}
          />
        ));
        return;
      }
    }

    const data: Record<string, any> = { ...parameters };

    const optional = ["website_url", "discord_url", "trailer_url"];

    for (const element of Object.keys(data)) {
      if (!element && optional.includes(element)) {
        data[element] = null;
      }
    }

    const token = cookie.get("token") as string;
    const [response, error]: any[] = await EditServer(
      props.server.server_id,
      {
        ...data,
        owner_id: props.user.user_id,
        port: parseInt(data.port),
      },
      token
    );

    if (error) {
      if (error?.response?.status === 401) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid user access!"
            subtitle="Please try again when you are logged in!"
          />
        ));
      } else if (error?.response?.status === 409) {
        if (error?.response?.data.payload.detail === "Duplicate servers are not allowed.") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Another server already uses this host and port!"
              subtitle="Report it or contact support if you believe this is an error!"
            />
          ));
        } else if (error?.response?.data.payload.detail === "Duplicate vanities are not allowed.") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Duplicate vanity URL provided!"
              subtitle="This vanity URL is already taken!"
            />
          ));
        } else {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Another server already uses this host and port!"
              subtitle="Report it or contact support if you believe this is an error!"
            />
          ));
        }
      } else if (error?.response?.status === 422) {
        if (error?.response?.data.payload.detail === "Invalid server address.") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Invalid server address provided!"
              subtitle="Please provide a valid server address!"
            />
          ));
        } else if (error?.response?.data.payload.detail === "Invalid vanity.") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Invalid vanity URL provided!"
              subtitle="Please make sure your vanity is valid!"
            />
          ));
        } else {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Invalid info provided!"
              subtitle="Please make sure all provided input is valid!"
            />
          ));
        }
      }
      return;
    }

    toast.custom((t) => (
      <Toast
        icon="fas fa-check-circle text-green-600"
        title="Successfully updated your server details!"
        subtitle="You can check it out on your server page!"
      />
    ));
  };

  return (
    <>
      {tagsModal && (
        <Tags parameters={parameters} setParameters={setParameters} showTagsModal={showTagsModal} />
      )}
      <div className="flex flex-col items-start justify-start w-full p-10 space-y-6 bg-dark-800 rounded border-2 border-gray-800">
        <div className="flex flex-row items-center justify-between w-full">
          <span className="font-bold text-6xl text-gray-300">Edit Server</span>
          <div
            className="flex flex-row items-center justify-center px-2.5 py-0.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
            onClick={submit}
          >
            <span className="font-medium md:text-lg text-gray-300">Save Changes</span>
            <i className="fas fa-map-marker-check md:text-lg text-gray-300" />
          </div>
        </div>
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
