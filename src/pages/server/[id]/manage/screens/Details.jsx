import Tags from "../components/Tags";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Properties from "../components/Properties";
import LongDescription from "../components/LongDescription";

export default function Details(props) {
  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;
    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
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
          description="Brief description about your server! Make it attractive enough so players fall for your server in the few seconds they take to read it!"
          value={props.details.description}
          onChange={(e) => onValueChange("description", e.target.value, 150)}
          required
        />
        <Tags tags={props.details.tags} setDetails={props.setDetails} />
        <Properties details={props.details} setDetails={props.setDetails} />
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
        <LongDescription
          value={props.details.long_description}
          onChange={(e) => onValueChange("discord_url", e.target.value, 5000)}
        />
      </div>
    </div>
  );
}
