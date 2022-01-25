import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function Profile(props) {
  const onNameChange = (e) => {
    props.setParameters((p) => ({ ...p, name: e.target.value.slice(0, 32) }));
  };

  const onDescriptionChange = (e) => {
    props.setParameters((p) => ({
      ...p,
      description: e.target.value.slice(0, 128),
    }));
  };

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-6 rounded border-2 border-olive-940 bg-olive-950 p-10">
      <h1 className="text-5xl font-medium text-white text-opacity-90">
        Edit Profile
      </h1>
      <div className="flex w-full flex-col items-start justify-start space-y-4">
        <Input
          label="Username"
          value={props.parameters.name}
          onChange={onNameChange}
        />
        <TextArea
          label="Description"
          value={props.parameters.description}
          onChange={onDescriptionChange}
        />
      </div>
    </div>
  );
}
