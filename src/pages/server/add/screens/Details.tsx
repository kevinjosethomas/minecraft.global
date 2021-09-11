import Input from "../components/Input";
import TextArea from "../components/TextArea";

type DetailsProps = {};

function Details(props: DetailsProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-6">
      <Input label="Server Name" />
      <Input label="IP Address" />
      <TextArea label="Server Description" />
    </div>
  );
}

export default Details;
