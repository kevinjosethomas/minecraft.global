function Filter(props) {
  const updateCheckedOption = (id) => {
    const newOptions = { ...props.options };
    newOptions.filter.forEach((option, index) => {
      if (option.id == id) {
        if (option.checked) {
          newOptions.filter[index].checked = false;
        } else {
          newOptions.filter[index].checked = true;
        }
      }
    });
    props.setOptions(newOptions);
  };

  return (
    <div className="flex flex-col items-start justify-center rounded-xl space-y-3">
      <h1 className="font-semibold text-2xl text-gray-400">Filter</h1>
      <div className="flex flex-col items-start justify-center space-y-1 select-none">
        {props.options.filter.map((option, index) => (
          <FilterOption key={index} {...option} onClick={updateCheckedOption} />
        ))}
      </div>
    </div>
  );
}

function FilterOption(props) {
  return (
    <div
      className="flex flex-row items-center justify-center space-x-2 text-lg"
      onClick={() => props.onClick(props.id)}
    >
      <div
        className={`flex flex-col items-center justify-center w-5 h-5 ${
          props.checked ? "bg-olive-60" : "bg-dark-60"
        } rounded`}
      >
        <i className="fas fa-check text-[0.6rem] text-dark-60" />
      </div>
      <span className="font-medium text-gray-400 text-lg">{props.label}</span>
    </div>
  );
}

export default Filter;
