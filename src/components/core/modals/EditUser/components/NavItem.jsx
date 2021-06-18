function NavItem(props) {
  return (
    <div
      className={`flex flex-row items-center justify-center md:justify-start w-10 md:w-full h-10 md:h-auto md:pl-5 md:pr-16 md:py-2 ${
        props.active && "bg-dark-70"
      } hover:bg-dark-70 cursor-pointer rounded`}
      onClick={props.onClick}
    >
      <i className={`${props.icon} md:hidden text-xl text-gray-300`} />
      <span className="hidden md:inline font-medium text-2xl text-gray-400">
        {props.label}
      </span>
    </div>
  );
}

export default NavItem;
