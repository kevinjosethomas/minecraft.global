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
    votifier_host: props.server.votifier_host || "",
    votifier_port: props.server.votifier_port,
    votifier_token: props.server.votifier_token || "",
  });

  const onHostnameChange = (e: any) => {
    setParameters({ ...parameters, votifier_host: e.target.value.substring(0, 32) });
  };

  const onPortChange = (e: any) => {
    if (e.target.value < 0 || e.target.value > 65535) {
      return;
    }
    setParameters({ ...parameters, votifier_port: e.target.value.replace(/[^0-9]/g, "") });
  };

  const onTokenChange = (e: any) => {
    setParameters({ ...parameters, votifier_token: e.target.value.substring(0, 150) });
  };

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

    const token = cookie.get("token") as string;
    const [response, error]: any[] = await EditServer(
      props.server.server_id,
      {
        votifier: {
          ...parameters,
        },
        owner_id: props.user.user_id,
        port: parseInt(parameters.votifier_port),
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
      } else {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="An unknown error occurred!"
            subtitle="Please try again later!"
          />
        ));
      }
      return;
    }

    toast.custom((t) => (
      <Toast
        icon="fas fa-check-circle text-green-600"
        title="Successfully updated your server details!"
        subtitle="You have changed your votifier settings!"
      />
    ));
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start w-full p-10 space-y-6 bg-dark-800 rounded border-2 border-gray-800">
        <div className="flex flex-row items-center justify-between w-full">
          <span className="font-bold text-6xl text-gray-300">Edit Votifier</span>
          <div
            className="flex flex-row items-center justify-center px-2.5 py-0.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
            onClick={submit}
          >
            <span className="font-medium md:text-lg text-gray-300">Save Changes</span>
            <i className="fas fa-map-marker-check md:text-lg text-gray-300" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <span className="font-medium text-xl text-gray-400 max-w-xl">
            We only support{" "}
            <a
              href="https://www.spigotmc.org/resources/nuvotifier.13449/"
              target="_blank"
              rel="noreferrer"
              className="underline format-links"
            >
              NuVotifier
            </a>
            . This section is optional but we recommend setting up vote rewards!
          </span>
        </div>
        <Input label="Votifier Host" value={parameters.votifier_host} setValue={onHostnameChange} />
        <Input label="Votifier Port" value={parameters.votifier_port} setValue={onPortChange} />
        <TextArea
          label="Votifier Token / Public Key"
          value={parameters.votifier_token}
          setValue={onTokenChange}
        />
      </div>
    </>
  );
}

export default Edit;
