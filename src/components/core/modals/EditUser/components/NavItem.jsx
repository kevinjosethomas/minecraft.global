function NavItem(props) {
  return (
    <div
      className={`flex flex-row items-center justify-start w-full pl-5 pr-16 py-2 ${
        props.active && "bg-dark-70"
      } hover:bg-dark-70 cursor-pointer rounded`}
      onClick={props.onClick}
    >
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
    </div>
  );
}

export default NavItem;
