function Tag(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center px-4 py-1 mr-3 my-1 ${
        props.checked
          ? "bg-olive-70 hover:bg-olive-60"
          : "bg-dark-70 hover:bg-dark-60"
      } rounded-full cursor-pointer transition duration-500`}
      onClick={() => {
        props.checked
          ? props.setInactiveTag(props.id)
          : props.setActiveTag(props.id);
      }}
    >
      <span
        className={`select-none ${
          props.checked ? "text-gray-300" : "text-gray-400"
        } whitespace-nowrap`}
      >
        {props.label}
      </span>
    </div>
  );
}

export default Tag;
