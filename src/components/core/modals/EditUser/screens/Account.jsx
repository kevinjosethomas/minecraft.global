import Input from "../components/Input";
import TextArea from "../components/TextArea";

function Account(props) {
  const updateDescription = (e) => {
    props.setNewValues({
      ...props.newValues,
      description: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <Input label="Name" />
      <TextArea
        label="Description"
        parentClassName="w-124 h-72"
        default={props.newValues.description}
        maxLength={512}
        counter={true}
        onChange={updateDescription}
      />
    </div>
  );
}

export default Account;
