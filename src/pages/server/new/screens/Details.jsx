import Input from "../components/Input";
import TextArea from "../components/TextArea";

function Details(props) {
  const updateName = (e) => {
    props.setDetails({ ...props.details, name: e.target.value });
  };
  const updateHost = (e) => {
    props.setDetails({ ...props.details, host: e.target.value });
  };
  const updatePort = (e) => {
    props.setDetails({ ...props.details, port: e.target.value });
  };
  const updateDescription = (e) => {
    props.setDetails({ ...props.details, description: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      <Input
        label="Name"
        className="w-full md:w-auto"
        default={props.details.name}
        onChange={updateName}
      />
      <Input
        label="Server Hostname"
        className="w-full md:w-auto"
        default={props.details.host}
        onChange={updateHost}
      />
      <Input
        label="Server Port"
        className="w-full md:w-auto"
        default={props.details.port}
        onChange={updatePort}
      />
      <TextArea
        label="Description"
        className="w-full md:w-[30rem] !h-40"
        parentClassName="w-full md:w-auto"
        maxLength={220}
        default={props.details.description}
        onChange={updateDescription}
        counter={true}
      />
    </div>
  );
}

export default Details;
