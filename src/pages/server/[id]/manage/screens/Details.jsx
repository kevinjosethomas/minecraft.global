import Tags from "../components/Tags";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Properties from "../components/Properties";
import LongDescription from "../components/LongDescription";
import filterInvalidChars from "lib/filterText";

export default function Details(props) {
  function onValueChange(key, value, max, premium) {
    if (premium && !props.server.premium) {
      return;
    }

    let formatted = max ? value.substring(0, max) : value;

    // if (key === "name" || key === "description" || key === "long_description") {
    //   formatted = filterInvalidChars(formatted);
    // }

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
        <Input
          label="Server Vanity URL"
          description="A custom URL for your server"
          value={props.details.vanity}
          onChange={(e) => onValueChange("vanity", e.target.value, 258, true)}
          server={props.server}
          premium
        />
        <TextArea
          label="Server Description"
          description="Brief description about your server! Make it enticing enough so players fall for your server in the few seconds they take to read it!"
          value={props.details.description}
          onChange={(e) => onValueChange("description", e.target.value, 150)}
          required
        />
        <Tags tags={props.details.tags} setDetails={props.setDetails} />
        <Properties details={props.details} setDetails={props.setDetails} />
        <Input
          label="Server Website"
          description="Your server's website (with https://)"
          value={props.details.website_url}
          onChange={(e) => onValueChange("website_url", e.target.value, 258)}
        />
        <Input
          label="Server Discord"
          description="Invite to your server's Discord server"
          value={props.details.discord_url}
          onChange={(e) => onValueChange("discord_url", e.target.value, 258)}
        />
        <Input
          label="Server Trailer"
          description="A video that represents your server"
          value={props.details.trailer_url}
          onChange={(e) => onValueChange("trailer_url", e.target.value, 258)}
        />
        <LongDescription
          value={props.details.long_description}
          onChange={(e) => onValueChange("long_description", e.target.value, 5000)}
        />
      </div>
    </div>
  );
}
