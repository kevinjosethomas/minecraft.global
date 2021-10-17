import Link from "next/link";
import cookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { DeleteServer } from "api/server";
import Toast from "ui/components/Toast/Toast";

type EditProps = {
  server: Record<string, any>;
  user: Record<string, any>;
};

function Edit(props: EditProps): JSX.Element {
  const router = useRouter();

  const [parameters, setParameters] = useState({
    votifier_host: props.server.votifier_host || "",
    votifier_port: props.server.votifier_port,
    votifier_token: props.server.votifier_token || "",
  });

  const submit = async () => {
    const token = cookie.get("token") as string;
    const [response, error]: any[] = await DeleteServer(props.server.server_id, token);

    if (error) {
      if (error?.response?.status === 401) {
        toast.custom((t) => (
          <Toast
            icon="far fa-times-circle text-olive-600"
            title="Invalid user access!"
            subtitle="Please try again when you are logged in!"
          />
        ));
      }
      return;
    }

    router.push(`/user/${props.user.user_id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-20 space-y-4 bg-dark-800 rounded border-2 border-gray-800">
      <img src="/images/illustration3.gif" alt="Sad crying creeper" draggable="false" />
      <span className="font-bold text-5xl text-gray-300 max-w-xl text-center">
        Are you sure you want to delete your server?
      </span>
      <span className="font-medium text-xl text-gray-300 max-w-md text-center">
        This is irreversible. All server data, upvotes and tokens will be deleted!
      </span>
      <div className="flex flex-row items-center justify-center space-x-4">
        <Link href={`/user/${props.user.user_id}`} passHref={true}>
          <div className="flex flex-row items-center justify-center py-2 px-4 bg-olive-900 rounded cursor-pointer transform hover:scale-102 duration-300">
            <span className="font-bold text-2xl text-gray-300 text-center">Go Back</span>
          </div>
        </Link>
        <div
          onClick={submit}
          className="flex flex-row items-center justify-center py-2 px-4 bg-red-900 rounded cursor-pointer transform hover:scale-102 duration-300"
        >
          <span className="font-bold text-2xl text-gray-300 text-center">Delete</span>
        </div>
      </div>
    </div>
  );
}

export default Edit;
