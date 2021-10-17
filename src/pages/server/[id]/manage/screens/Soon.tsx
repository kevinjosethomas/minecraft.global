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
        ...parameters,
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
    <div className="flex flex-col items-center justify-center w-full py-20 space-y-6 bg-dark-800 rounded border-2 border-gray-800">
      <img
        src="/images/illustration1.png"
        alt="Steve, Alex and Wolf with Pickaxe and Sword"
        draggable="false"
      />
      <span className="font-bold text-4xl md:text-6xl text-gray-300">Coming Soon</span>
    </div>
  );
}

export default Edit;
