import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

type FeaturesProps = {
  params: Record<string, any>;
  setParams: CallableFunction;
  showTagsModal: CallableFunction;
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
        <span className="font-medium text-2xl text-gray-400">Server Tags</span>
        <div className="flex flex-col items-start justify-start space-y-2">
          <div
            className="flex flex-row items-center justify-center px-6 py-2 bg-olive-800 hover:bg-olive-700 rounded-full cursor-pointer select-none transition duration-300"
            onClick={() => props.showTagsModal(true)}
          >
            <span className="font-bold text-xl text-gray-300">Choose Tags</span>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2">
            {props.params.tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="px-2 py-0.5 bg-dark-400 hover:bg-dark-200 rounded select-none cursor-pointer transition duration-300"
                onClick={() => {
                  props.setParams({
                    ...props.params,
                    tags: props.params.tags.filter((t: string) => t !== tag),
                  });
                }}
              >
                <span className="text-gray-400">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
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
