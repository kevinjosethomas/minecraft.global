import Input from "../components/Input";
import TextArea from "../components/TextArea";

type DetailsProps = {
  params: Record<string, any>;
  setParams: CallableFunction;
};

function Details(props: DetailsProps): JSX.Element {
  const onNameChange = (e: any) => {
    if (e.target.value.length >= 32) {
      return;
    }
    props.setParams({ ...props.params, name: e.target.value });
  };

  const onHostnameChange = (e: any) => {
    if (e.target.value.length >= 258) {
      return;
    }
    props.setParams({ ...props.params, host: e.target.value });
  };

  const onPortChange = (e: any) => {
    if (e.target.value < 0 || e.target.value > 65535) {
      return;
    }
    props.setParams({ ...props.params, port: e.target.value.replace(/[^0-9]/g, "") });
  };

  const onDescriptionChange = (e: any) => {
    if (e.target.value.length >= 150) {
      return;
    }
    props.setParams({ ...props.params, description: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center space-y-6">
      <Input label="Server Name" value={props.params.name} onChange={onNameChange} />
      <Input label="Server Hostname" value={props.params.host} onChange={onHostnameChange} />
      <Input label="Server Port" value={props.params.port} onChange={onPortChange} />
      <TextArea
        label="Server Description"
        value={props.params.description}
        onChange={onDescriptionChange}
      />
    </div>
  );
}

export default Details;
