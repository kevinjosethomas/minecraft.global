function Connection(props) {
  return (
    <div className="flex flex-row items-center justify-start w-60 md:w-80 px-4 py-2 space-x-2 bg-olive-80 rounded">
      <i
        className={`fab ${
          props.type == "discord" ? "fa-discord" : "fa-google"
        } md:text-xl text-gray-300`}
      />
      <span className="md:text-xl text-gray-300">{props.label}</span>
    </div>
  );
}

export default Connection;
