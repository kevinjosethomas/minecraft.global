function Connection(props) {
  return (
    <div className="flex flex-row items-start justify-start w-80 px-4 py-2 space-x-2 bg-olive-80 rounded">
      <i
        className={`fab ${
          props.type == "discord" ? "fa-discord" : "fa-google"
        } text-xl text-gray-300`}
      />
      <span className="text-xl text-gray-300">{props.label}</span>
    </div>
  );
}

export default Connection;
