import { useState } from "react";

import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function Profile(props) {
  const [parameters, setParameters] = useState({
    name: props.user.name || "",
    description: props.user.description || "",
  });

  const onNameChange = (e) => {
    setParameters((parameters) => ({ ...parameters, name: e.target.value.slice(0, 32) }));
  };

  const onDescriptionChange = (e) => {
    setParameters((parameters) => ({ ...parameters, description: e.target.value.slice(0, 200) }));
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-[50px] text-white text-opacity-90">Edit Profile</h1>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-start justify-start space-y-4">
          <Input label="Username" value={parameters.name} onChange={onNameChange} />
          <TextArea
            label="Description"
            value={parameters.description}
            onChange={onDescriptionChange}
          />
        </div>
      </div>
    </div>
  );
}
