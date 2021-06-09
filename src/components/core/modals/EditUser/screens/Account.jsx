import Input from "../components/Input";
import TextArea from "../components/TextArea";

function Account(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <Input label="Name" />
      <TextArea
        label="Description"
        parentClassName="w-124 h-72"
        maxLength={512}
        counter={true}
      />
    </div>
  );
}

export default Account;
