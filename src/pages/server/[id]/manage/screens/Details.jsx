import Input from "../components/Input";

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
          onChange={(e) => onChange("name", e.target.value, 32)}
        />
        <Input
          label="Server Address"
          description="Your server's IP address + port"
          value={props.details.host}
          onChange={(e) => onChange("host", e.target.value, 258)}
        />
      </div>
    </div>
  );
}
