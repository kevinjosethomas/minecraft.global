import Input from "../components/Input";
import TextArea from "../components/TextArea";

type VotifierProps = {
  params: Record<string, any>;
  setParams: CallableFunction;
};

function Votifier(props: VotifierProps): JSX.Element {
  const onHostChange = (e: any) => {
    props.setParams({ ...props.params, votifier_host: e.target.value.substring(0, 258) });
  };

  const onPortChange = (e: any) => {
    if (e.target.value < 0 || e.target.value > 65535) {
      return;
    }
    props.setParams({ ...props.params, votifier_port: e.target.value.replace(/[^0-9]/g, "") });
  };

  const onTokenChange = (e: any) => {
    props.setParams({ ...props.params, votifier_token: e.target.value.substring(0, 1000) });
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-6">
      <div className="flex flex-col items-center justify-start">
        <span className="font-medium text-xl text-gray-400 max-w-xl format-links">
          We only support{" "}
          <a
            href="https://www.spigotmc.org/resources/nuvotifier.13449/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            NuVotifier
          </a>
          . This section is optional but we recommend setting up vote rewards!
        </span>
      </div>
      <Input label="Votifier Host" value={props.params.votifier_host} onChange={onHostChange} />
      <Input label="Votifier Port" value={props.params.votifier_port} onChange={onPortChange} />
      <TextArea
        label="Votifier Token"
        height="h-20"
        value={props.params.votifier_token}
        onChange={onTokenChange}
      />
      <span className="font-medium text-gray-400 max-w-md format-links">
        <a
          href="https://github.com/NuVotifier/NuVotifier/wiki/Setup-Guide#key-vs-token"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          This is the token in your NuVotifier config.yml! Do not provide your RSA key!
        </a>
      </span>
    </div>
  );
}

export default Votifier;
