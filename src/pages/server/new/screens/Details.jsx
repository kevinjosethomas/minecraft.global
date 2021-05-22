import Input from "../components/Input";
import TextArea from "../components/TextArea";

function Details(props) {
  const updateName = (e) => {
    props.setDetails({ ...props.details, name: e.target.value });
  };
  const updateAddress = (e) => {
    props.setDetails({ ...props.details, address: e.target.value });
  };
  const updateDescription = (e) => {
    props.setDetails({ ...props.details, description: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      <Input label="Name" onChange={updateName} />
      <Input label="Server Address" onChange={updateAddress} />
      <TextArea
        label="Description"
        className="w-[30rem] !h-40"
        maxLength="220"
        onChange={updateDescription}
      />
    </div>
  );
}

export default Details;
