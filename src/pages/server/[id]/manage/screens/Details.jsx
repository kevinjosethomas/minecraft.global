import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function Details(props) {
  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;
    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-6">
        <Input
          label="Server Name"
          description="Your server's name"
          value={props.details.name}
          onChange={(e) => onValueChange("name", e.target.value, 32)}
          required
        />
        <Input
          label="Server Address"
          description="Your server's IP address + port"
          value={props.details.host}
          onChange={(e) => onValueChange("host", e.target.value, 258)}
          required
        />
        <TextArea
          label="Server Description"
          description="Brief description about your server"
          value={props.details.description}
          onChange={(e) => onValueChange("description", e.target.value, 150)}
          required
        />
        <Input
          label="Server Website"
          description="Your server's website (prefix with https://)"
          value={props.details.website_url}
          onChange={(e) => onValueChange("website_url", e.target.value, 258)}
        />
        <Input
          label="Server Discord"
          description="Invite to your server's Discord community"
          value={props.details.discord_url}
          onChange={(e) => onValueChange("discord_url", e.target.value, 258)}
        />
        <Input
          label="Server Trailer"
          description="A video that represents your server"
          value={props.details.discord_url}
          onChange={(e) => onValueChange("discord_url", e.target.value, 258)}
        />
      </div>
    </div>
  );
}
