import Input from "../components/Input";
import TextArea from "../components/TextArea";
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
    <div className="flex w-full flex-col items-start justify-start">
      <div className="flex w-full flex-col items-start justify-start space-y-8">
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
          description="Brief description about your server! Make it enticing enough so players fall for your server in the few seconds they take to read it!"
          value={props.details.description}
          onChange={(e) => onValueChange("description", e.target.value, 150)}
          required
        />
      </div>
    </div>
  );
}
