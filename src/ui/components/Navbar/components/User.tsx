import { useState } from "react";

type User = {
  user: Record<string, any>;
};
const User = (props: User): JSX.Element => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className="group flex flex-row items-center justify-center w-10 h-10 bg-dark-600 rounded"
        onClick={() => setDropdown(!dropdown)}
      >
        <i
          className={`far ${
            dropdown ? "fa-chevron-up" : "fa-chevron-down"
          } text-lg text-gray-400 group-hover:text-gray-300 transition duration-500`}
        />
      </div>
      {dropdown && (
        <div className="absolute flex flex-col items-center justify-center p-4 space-y-2 top-12 right-0 bg-dark-700 border-2 border-gray-800 select-none rounded">
          <div className="flex flex-col items-start justify-center pr-6">
            <span className="font-medium text-sm text-gray-400">Logged in as</span>
            <span className="font-bold text-lg text-gray-300">{props.user.name}</span>
          </div>
          <div className="h-0.5 w-full bg-dark-100" />
          <div className="flex flex-col items-start justify-start w-full">
            <DropdownElement
              icon="fas fa-info-circle fa-swap-opacity"
              title="View Profile"
              href="/user"
            />
            <DropdownElement
              icon="fas fa-plus-circle fa-swap-opacity"
              title="Add Server"
              href="/server/add"
            />
            <DropdownElement icon="fas fa-sign-out-alt" title="Log out" href="/server/add" />
          </div>
        </div>
      )}
    </div>
  );
};

type DropdownElement = {
  icon: string;
  title: string;
  href: string;
};
function DropdownElement(props: DropdownElement): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full py-2 px-4 pr-12 space-x-2 hover:bg-dark-500 cursor-pointer rounded">
      <i className={`${props.icon} text-lg text-gray-400`} />
      <span className="font-medium text-lg text-gray-400 whitespace-nowrap">{props.title}</span>
    </div>
  );
}

export default User;
