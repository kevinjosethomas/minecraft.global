function Tag(props) {
  return (
    <div
      className={`${
        props.className
      } flex flex-row items-center justify-center px-4 py-1 ${
        props.selected ? "bg-olive-70" : "bg-dark-60"
      } rounded-full cursor-pointer hover:brightness-125 filter duration-500`}
    >
      <span className="select-none text-gray-400 whitespace-nowrap">
        {props.label}
      </span>
    </div>
  );
}

export default Tag;
