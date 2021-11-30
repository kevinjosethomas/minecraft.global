import Input from "../components/Input";

export default function Details(props) {
  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;
    if (key === "votifier_port") {
      formatted = formatted.replace(/[^0-9]/g, "");
      if (formatted < 0 || formatted > 65535) {
        return;
      }
    }
    props.setDetails((d) => ({ ...d, votifier: { ...d.votifier, [key]: formatted } }));
  }

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <p className="max-w-lg text-lg text-white text-opacity-80">
          We support Votifier and NuVotifier. This section is optional. However, we recommend
          setting up vote rewards (read more).
        </p>
        <Input
          label="Votifier Host"
          description="Your Votifier address or IP (probably the same as your server's address)"
          value={props.details.votifier.votifier_host}
          onChange={(e) => onValueChange("votifier_host", e.target.value, 32)}
        />
        <Input
          label="Votifier Port"
          description="Your Votifier port (in config.yml, usually 8192)"
          value={props.details.votifier.votifier_port}
          onChange={(e) => onValueChange("votifier_port", e.target.value, 32)}
        />
        <Input
          label="Votifier Token"
          description="Your Votifier token or key (in config.yml, or the public RSA key file)"
          value={props.details.votifier.votifier_token}
          onChange={(e) => onValueChange("votifier_token", e.target.value, 256)}
        />
      </div>
    </div>
  );
}
