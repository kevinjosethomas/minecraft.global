import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function Details(props) {
  function onValueChange(key, value, max) {
    let formatted = max ? value.substring(0, max) : value;
    if (key === "votifier_port") {
      formatted = formatted.replace(/[^0-9]/g, "");
      if (formatted < 0 || formatted > 65535) {
        return;
      }
    }
    props.setDetails((d) => ({
      ...d,
      votifier: { ...d.votifier, [key]: formatted },
    }));
  }

  return (
    <div className="flex w-full flex-col items-start justify-start">
      <div className="flex w-full flex-col items-start justify-start space-y-8">
        <p className=" text-lg text-white text-opacity-80">
          We support Votifier and NuVotifier. Although this section is optional,
          we recommend setting up vote rewards. Since servers are ranked based
          on the number of votes they have, rewarding your players for voting is
          a great way to grow your server.
        </p>
        <Input
          label="Votifier Host"
          description="Your Votifier server IP (likely the same as your server's IP)"
          value={props.details.votifier.votifier_host}
          onChange={(e) => onValueChange("votifier_host", e.target.value, 32)}
        />
        <Input
          label="Votifier Port"
          description="Your Votifier port (in config.yml, usually 8192)"
          value={props.details.votifier.votifier_port}
          onChange={(e) => onValueChange("votifier_port", e.target.value, 32)}
        />
        <TextArea
          label="Votifier Token"
          description="Your Votifier token or key (in config.yml, or the public RSA key file)"
          value={props.details.votifier.votifier_token}
          onChange={(e) =>
            onValueChange("votifier_token", e.target.value, 1024)
          }
        />
      </div>
    </div>
  );
}
