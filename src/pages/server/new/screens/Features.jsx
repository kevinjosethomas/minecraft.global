import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

function Features(props) {
  const updateWebsite = (e) => {
    props.setDetails({ ...props.details, website: e.target.value });
  };
  const updateDiscord = (e) => {
    props.setDetails({ ...props.details, discord: e.target.value });
  };
  const updateTrailer = (e) => {
    props.setDetails({ ...props.details, trailer: e.target.value });
  };
  const toggleWhitelisted = () => {
    props.setDetails({
      ...props.details,
      whitelisted: !props.details.whitelisted,
    });
  };
  const toggleBedrock = () => {
    props.setDetails({
      ...props.details,
      bedrock: !props.details.bedrock,
    });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      <div className="flex flex-col items-start justify-center">
        <span className="font-medium text-lg text-gray-400">Properties</span>
        <Checkbox
          checked={props.details.whitelisted}
          toggle={toggleWhitelisted}
          label="Whitelisted"
        />
        <Checkbox
          checked={props.details.bedrock}
          toggle={toggleBedrock}
          label="Bedrock"
        />
      </div>
      <Input label="Website" onChange={updateWebsite} />
      <Input label="Discord" onChange={updateDiscord} />
      <Input label="Trailer" onChange={updateTrailer} />
    </div>
  );
}

export default Features;
