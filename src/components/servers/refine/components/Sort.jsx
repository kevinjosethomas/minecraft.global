function Sort(props) {
  const updateCheckedOption = (id) => {
    const newOptions = { ...props.options };
    newOptions.sort.forEach((option, index) => {
      if (option.id == id) {
        newOptions.sort[index].checked = true;
      } else {
        if (option.checked == true) {
          newOptions.sort[index].checked = false;
        }
      }
    });
    props.setOptions(newOptions);
  };

  return (
    <div className="flex flex-col items-start justify-center rounded-xl space-y-3">
      <h1 className="font-semibold text-2xl text-gray-400">Sort</h1>
      <div className="flex flex-col items-start justify-center space-y-1 select-none">
        {props.options.sort.map((option, index) => (
          <SortOption key={index} {...option} onClick={updateCheckedOption} />
        ))}
      </div>
    </div>
  );
}

function SortOption(props) {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2"
      onClick={() => props.onClick(props.id)}
    >
      <div
        className={`flex flex-col items-center justify-center w-5 h-5 ${
          props.checked ? "border-2 border-olive-60" : ""
        } bg-dark-60 rounded-full`}
      >
        {props.checked ? (
          <div className="w-3 h-3 bg-olive-60 rounded-full" />
        ) : (
          <></>
        )}
      </div>
      <span className="font-medium text-gray-400 text-lg">{props.label}</span>
    </div>
  );
}

export default Sort;
