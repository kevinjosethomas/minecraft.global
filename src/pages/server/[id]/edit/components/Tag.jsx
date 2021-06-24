function Tag(props) {
  return (
    <div
      className={`${
        props.className
      } flex flex-row items-center justify-center px-2 md:px-6 py-1 ${
        props.selected ? "bg-olive-70" : "bg-dark-60"
      } rounded-full cursor-pointer hover:brightness-125 filter duration-500`}
      onClick={props.selected ? props.deselect : props.select}
    >
      <span
        className={`select-none ${
          props.selected ? "text-gray-300" : "text-gray-400"
        } text-xs md:text-lg whitespace-nowrap`}
      >
        {props.label}
      </span>
    </div>
  );
}

export default Tag;
