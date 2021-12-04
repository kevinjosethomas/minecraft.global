import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function Profile(props) {
  const avatar = props.user.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.user.minecraft_uuid}?size=128`
    : "/images/steve.png";

  const onNameChange = (e) => {
    props.setParameters((p) => ({ ...p, name: e.target.value.slice(0, 32) }));
  };

  const onDescriptionChange = (e) => {
    props.setParameters((p) => ({ ...p, description: e.target.value.slice(0, 200) }));
  };

  return (
    <div className="flex flex-col items-start justify-start w-full p-10 space-y-6 bg-olive-950 rounded border-2 border-olive-940">
      <h1 className="font-medium text-5xl text-white text-opacity-90">Edit Profile</h1>
      <div className="flex flex-col items-start justify-start w-full space-y-4">
        <Input label="Username" value={props.parameters.name} onChange={onNameChange} />
        <TextArea
          label="Description"
          value={props.parameters.description}
          onChange={onDescriptionChange}
        />
      </div>
    </div>
  );
}
