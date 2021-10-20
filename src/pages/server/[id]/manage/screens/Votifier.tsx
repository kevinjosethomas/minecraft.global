import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import validate from "lib/validate";
import Input from "../components/Input";
import Toast from "ui/components/Toast/Toast";
import TextArea from "../components/TextArea";
import { EditServer, TestUpvoteServer } from "api/server";

type VotifierProps = {
  server: Record<string, any>;
  user: Record<string, any>;
  reload: CallableFunction;
};

function Votifier(props: VotifierProps): JSX.Element {
  const [parameters, setParameters] = useState({
    votifier_host: props.server.votifier?.votifier_host || "",
    votifier_port: props.server.votifier?.votifier_port,
    votifier_token: props.server.votifier?.votifier_token || "",
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

  const [playername, setPlayername] = useState("");

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

    const optional = ["votifier_hostname", "votifier_port", "votifier_token"];

    for (const element of Object.keys(data)) {
      if (!data[element] && optional.includes(element)) {
        data[element] = null;
      }
    }

    const token = cookie.get("token") as string;
    const [response, error]: any[] = await EditServer(
      props.server.server_id,
      {
        votifier: {
          ...data,
        },
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

    props.reload();
  };

  const testvote = async () => {
    if (!playername || playername.length < 3 || playername.length > 16) {
      toast.custom((t) => (
        <Toast
          icon="far fa-times-circle text-olive-600"
          title="Invalid player name provided!"
          subtitle="Please make sure you provide a valid Minecraft username!"
        />
      ));
      return;
    }

    const token = cookie.get("token") as string;
    const [response, error]: any[] = await TestUpvoteServer(
      props.server.server_id,
      playername,
      token
    );

    if (error) {
      if (error?.response?.status === 422) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="No Votifier data provided!"
            subtitle="Please add the votifier fields above and try again!"
          />
        ));
      } else if (error?.response?.status === 502) {
        if (error?.response?.data.payload.detail.reason === "timeout") {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Your server's Votifier took to long to respond!"
              subtitle="Please make sure you have Votifier set up and it is not being blocked by a firewall!"
            />
          ));
        } else {
          toast.custom((t) => (
            <Toast
              icon="far fa-times-circle text-olive-600"
              title="Your server's Votifier provided an invalid response!"
              subtitle="Please make sure you have NuVotifier set up correctly!"
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
        icon="far fa-check-circle text-olive-600"
        title="Successfully sent a test Votifier request!"
        subtitle="Check your server console or chat to make sure it worked!"
      />
    ));
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 space-y-16 bg-dark-800 rounded border-2 border-gray-800">
      <div className="flex flex-col items-start justify-start w-full space-y-6">
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
          <span className="font-medium text-xl text-gray-400 max-w-xl format-links">
            We only support{" "}
            <a
              href="https://www.spigotmc.org/resources/nuvotifier.13449/"
              target="_blank"
              rel="noreferrer"
            >
              NuVotifier
            </a>
            . This section is optional but we recommend setting up vote rewards!
          </span>
        </div>
        <Input label="Votifier Host" value={parameters.votifier_host} setValue={onHostnameChange} />
        <Input label="Votifier Port" value={parameters.votifier_port} setValue={onPortChange} />
        <TextArea
          label="Votifier Token"
          height="h-20"
          value={parameters.votifier_token}
          setValue={onTokenChange}
        />
        <span className="font-medium text-gray-400 max-w-md format-links">
          <a
            href="https://github.com/NuVotifier/NuVotifier/wiki/Setup-Guide#key-vs-token"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            This is the token in your NuVotifier config.yml! Do not provide your RSA key!
          </a>
        </span>
      </div>
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <div className="flex flex-row items-center justify-start w-full">
          <span className="font-bold text-6xl text-gray-300">Test Votifier</span>
        </div>
        <span className="font-medium text-xl text-gray-400 max-w-xl format-links">
          Make sure you save any changes you make before testing Votifier! We will send a test vote
          to reward the specified user to test Votifier, this will not count as a real vote!
        </span>
        <Input
          label="Minecraft Username"
          value={playername}
          setValue={(e: any) => setPlayername(e.target.value)}
        />
        <div
          className="flex flex-row items-center justify-center px-2.5 py-0.5 space-x-2 bg-olive-800 hover:bg-olive-700 rounded select-none cursor-pointer transition duration-300"
          onClick={testvote}
        >
          <i className="fas fa-arrow-alt-up md:text-lg text-gray-300" />
          <span className="font-medium md:text-lg text-gray-300">Send Test Upvote</span>
        </div>
      </div>
    </div>
  );
}

export default Votifier;
