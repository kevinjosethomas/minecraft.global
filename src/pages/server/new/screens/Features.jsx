import { Fragment, useState } from "react";

import Tags from "../modals/Tags";
import Tag from "../components/Tag";
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

  const removeTag = (tag) => {
    props.setDetails({
      ...props.details,
      tags: props.details.tags.filter((el) => el.name !== tag.name),
    });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      {tagsModal && (
        <Tags
          setTagsModal={setTagsModal}
          details={props.details}
          setDetails={props.setDetails}
        />
      )}
      <div className="flex flex-col items-start justify-center space-y-1">
        <span className="font-medium text-lg text-gray-400">Tags</span>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div
            className="flex flex-row items-center justify-center px-5 py-1 bg-olive-70 rounded-full cursor-pointer hover:brightness-110 filter duration-500"
            onClick={() => setTagsModal(true)}
          >
            <span className="select-none text-gray-300 whitespace-nowrap">
              Choose Tags
            </span>
          </div>
          {props.details.tags.length ? (
            <div className="w-0.5 h-5 bg-dark-60" />
          ) : (
            <Fragment />
          )}
          {props.details.tags.map((tag) => (
            <Tag
              {...tag}
              selected={false}
              select={() => removeTag(tag)}
              deselect={() => void 0}
            />
          ))}
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
      <Input
        label="Website"
        default={props.details.website}
        onChange={updateWebsite}
      />
      <Input
        label="Discord"
        default={props.details.discord}
        onChange={updateDiscord}
      />
      <Input
        label="Trailer"
        default={props.details.trailer}
        onChange={updateTrailer}
      />
    </div>
  );
}

export default Features;
