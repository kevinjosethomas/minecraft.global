function Checkbox(props) {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 text-lg cursor-pointer"
      onClick={props.toggle}
    >
      <div
        className={`flex flex-col items-center justify-center w-5 h-5 ${
          props.checked ? "bg-olive-60" : "bg-dark-60"
        } rounded-sm transition duration-100`}
      >
        <i className="fas fa-check text-[0.6rem] text-dark-60" />
      </div>
      <span className="font-medium text-gray-400 text-lg select-none">
        {props.label}
      </span>
    </div>
  );
}

export default Checkbox;
