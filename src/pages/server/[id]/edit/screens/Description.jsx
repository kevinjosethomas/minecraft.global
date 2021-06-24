import TextArea from "../components/TextArea";

function Description(props) {
  const updateLongDescription = (e) => {
    props.setDetails({ ...props.details, long_description: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <TextArea
        label="Long Description"
        className="w-full h-full"
        parentClassName="w-full h-full"
        maxLength={5000}
        default={props.details.long_description}
        onChange={updateLongDescription}
        counter={true}
      />
    </div>
  );
}

export default Description;
