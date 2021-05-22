import { useState } from "react";

import Tags from "../modals/Tags";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

function Features(props) {
  const [tagsModal, setTagsModal] = useState(false);

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
      {tagsModal && <Tags setTagsModal={setTagsModal} />}
      <div className="flex flex-col items-start justify-center space-y-1">
        <span className="font-medium text-lg text-gray-400">Tags</span>
        <div className="flex flex-row items-center justify-center">
          <div
            className="flex flex-row items-center justify-center px-5 py-1 bg-olive-70 rounded-full cursor-pointer hover:brightness-110 filter duration-500"
            onClick={() => setTagsModal(true)}
          >
            <span className="select-none text-gray-300 whitespace-nowrap">
              Choose Tags
            </span>
          </div>
        </div>
      </div>
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
