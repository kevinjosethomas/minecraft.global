import TextArea from "../components/TextArea";

function Description(props) {
  const updateLongDescription = (e) => {
    props.setDetails({ ...props.details, longDescription: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <TextArea
        label="Long Description"
        className="w-full h-full"
        parentClassName="w-full h-full"
        maxLength="5000"
        default={props.details.longDescription}
        onChange={updateLongDescription}
      />
    </div>
  );
}

export default Description;
