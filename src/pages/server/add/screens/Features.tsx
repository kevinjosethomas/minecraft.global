import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

type FeaturesProps = {
  params: Record<string, any>;
  setParams: CallableFunction;
};

function Features(props: FeaturesProps): JSX.Element {
  const onWebsiteChange = (e: any) => {
    if (e.target.value.length >= 220) {
      return;
    }
    props.setParams({ ...props.params, website_url: e.target.value });
  };

  const onDiscordChange = (e: any) => {
    if (e.target.value.length >= 32) {
      return;
    }
    props.setParams({ ...props.params, discord_url: e.target.value });
  };

  const onTrailerChange = (e: any) => {
    if (e.target.value.length >= 220) {
      return;
    }
    props.setParams({ ...props.params, trailer_url: e.target.value });
  };

  const onWhitelistedChange = (e: any) => {
    props.setParams({ ...props.params, whitelisted: !props.params.whitelisted });
  };

  const onBedrockChange = (e: any) => {
    props.setParams({ ...props.params, bedrock: !props.params.bedrock });
  };

  const onCrackedChange = (e: any) => {
    props.setParams({ ...props.params, cracked: !props.params.cracked });
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-6">
      <div className="flex flex-col items-start justify-start space-y-2">
        <span className="font-medium text-2xl text-gray-400">Server Properties</span>
        <div className="flex flex-col items-start justify-start space-y-1">
          <Checkbox
            label="Whitelisted"
            checked={props.params.whitelisted}
            onClick={onWhitelistedChange}
          />
          <Checkbox
            label="Bedrock Edition"
            checked={props.params.bedrock}
            onClick={onBedrockChange}
          />
          <Checkbox label="Cracked" checked={props.params.cracked} onClick={onCrackedChange} />
        </div>
      </div>
      <Input label="Website" value={props.params.website_url} onChange={onWebsiteChange} />
      <Input label="Discord" value={props.params.discord_url} onChange={onDiscordChange} />
      <Input label="Trailer" value={props.params.trailer_url} onChange={onTrailerChange} />
    </div>
  );
}

export default Features;
