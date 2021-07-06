import Input from "../components/Input";
import TextArea from "../components/TextArea";

function Votifier(props) {
  const updateVotifierHost = (e) => {
    props.setDetails({ ...props.details, votifier_host: e.target.value });
  };
  const updateVotifierPort = (e) => {
    props.setDetails({ ...props.details, votifier_port: e.target.value });
  };
  const updateVotifierKey = (e) => {
    props.setDetails({ ...props.details, votifier_key: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      <Input
        label="Votifier Hostname"
        className="w-full md:w-auto"
        default={props.details.votifier_host}
        onChange={updateVotifierHost}
      />
      <Input
        label="Votifier Port"
        className="w-full md:w-auto"
        default={props.details.votifier_port}
        onChange={updateVotifierPort}
      />
      {/* <TextArea
        label="Votifier Public Key"
        className="w-full md:w-[30rem] !h-40"
        parentClassName="w-full md:w-auto"
        maxLength={220}
        default={props.details.votifier_key}
        onChange={updateVotifierKey}
        counter={true}
      /> */}
      <span className="font-semibold text-sm text-gray-400">PS; We only support NuVotifier</span>
    </div>
  );
}

export default Votifier;
