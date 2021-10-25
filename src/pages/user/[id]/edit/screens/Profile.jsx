import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import { EditUser } from "api/user";
import Input from "../components/Input";
import UserCard from "../components/UserCard";
import TextArea from "../components/TextArea";

export default function Profile(props) {
  const [parameters, setParameters] = useState({
    name: props.user.name || "",
    description: props.user.description || "",
  });

  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128`
    : "/images/steve.png";

  const onNameChange = (e) => {
    setParameters((parameters) => ({ ...parameters, name: e.target.value.slice(0, 32) }));
  };

  const onDescriptionChange = (e) => {
    setParameters((parameters) => ({ ...parameters, description: e.target.value.slice(0, 200) }));
  };

  const submit = async () => {
    if (parameters.name.length < 3) {
      toast.error("Your name is too short! (3 chars) :/");
      return;
    }
    if (parameters.name.length > 32) {
      toast.error("Your name is too long! (32 chars) :/");
      return;
    }
    if (parameters.description?.length > 200) {
      toast.error("Your description is too long! (200 chars) :/");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await EditUser(
      props.user.user_id,
      {
        name: parameters.name,
        description: parameters.description || null,
      },
      token
    );

    if (error) {
      if (error.response?.status === 401) {
        toast.error("Please login and try again!");
      } else if (error.response?.status === 409) {
        toast.error("You are being ratelimit. Please try again later!");
      } else {
        toast.error("An unknown error occured. Please try again later!");
      }
      return;
    }

    toast.success("Successfully edited your profile!");
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 bg-olive-950 rounded border-2 border-olive-940">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="font-medium text-[50px] text-white text-opacity-90">Edit Profile</h1>
        <div
          className="flex flex-row items-center justify-center px-3 py-1 bg-olive-800 rounded cursor-pointer hover:bg-olive-700 transition duration-300"
          onClick={submit}
        >
          <span className="font-medium text-[20px] text-white text-opacity-80 select-none">
            Save Changes
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-start space-y-4">
          <Input label="Username" value={parameters.name} onChange={onNameChange} />
          <TextArea
            label="Description"
            value={parameters.description}
            onChange={onDescriptionChange}
          />
        </div>
        <UserCard name={parameters.name} avatar={avatar} description={parameters.description} />
      </div>
    </div>
  );
}
