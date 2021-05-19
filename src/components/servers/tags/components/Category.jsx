function Category(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center px-6 py-2 ${
        props.checked
          ? "bg-olive-70 hover:bg-olive-60"
          : "bg-dark-70 hover:bg-dark-60"
      } rounded-full cursor-pointer transition duration-500`}
      onClick={() => {
        props.checked
          ? props.setInactiveCategory(props.id)
          : props.setActiveCategory(props.id);
      }}
    >
      <span
        className={`text-lg select-none ${
          props.checked ? "text-gray-300" : "text-gray-400"
        } whitespace-nowrap`}
      >
        {props.label}
      </span>
    </div>
  );
}

export default Category;
