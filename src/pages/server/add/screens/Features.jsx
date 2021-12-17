import Tags from "../components/Tags";
import Input from "../components/Input";
import Properties from "../components/Properties";
import filterInvalidChars from "api/filterText";

export default function Features(props) {
  function onValueChange(key, value, max, premium) {
    if (premium && !props.server.premium) {
      return;
    }

    let formatted = max ? value.substring(0, max) : value;

    if (key === "name" || key === "description" || key === "long_description") {
      formatted = filterInvalidChars(formatted);
    }
    
    props.setDetails((d) => ({ ...d, [key]: formatted }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
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
      </div>
    </div>
  );
}
