import Input from "../components/Input";

function Features(props) {
  const updateWebsite = (e) => {
    props.setDetails({ ...props.details, website: e.target.value });
  };
  const updateDiscord = (e) => {
    props.setDetails({ ...props.details, discord: e.target.value });
  };
  const updateTrailer = (e) => {
    props.setDetails({ ...props.details, trailer: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-5">
      <Input label="Website" onChange={updateWebsite} />
      <Input label="Discord" onChange={updateDiscord} />
      <Input label="Trailer" onChange={updateTrailer} />
    </div>
  );
}

export default Features;
