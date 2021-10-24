import { useState } from "react";

import Modal from "ui/layouts/Modal";

export default function Confirm(props) {
  const servers = props.user.servers.filter((server) => !server.premium);
  const [selected, setSelected] = useState(servers[0]);
  const [dropdown, setDropdown] = useState(false);

  return (
    <Modal showModal={props.showModal}>
      <div
        className="flex flex-col items-start justify-between w-[800px] h-[400px] p-8 space-y-8 bg-olive-950 border-2 border-olive-930 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start justify-start w-full space-y-4">
          <span className="text-[32px] text-white text-opacity-90 max-w-lg leading-tight">
            Select the server you want to purchase Premium for:
          </span>
          <div className="relative flex flex-col items-start justify-start w-[400px] space-y-1">
            <div
              className="flex flex-row items-center justify-between w-full px-5 py-2 bg-white bg-opacity-10 rounded cursor-pointer"
              onClick={() => setDropdown((dd) => !dd)}
            >
              <span className="text-[24px] text-white text-opacity-80 select-none">
                {selected.name}
              </span>
              <i
                className={`far ${
                  props.dropdown ? "fa-angle-up" : "fa-angle-down"
                } text-[24px] text-white text-opacity-80`}
              />
            </div>
            {dropdown && (
              <Dropdown servers={servers} setSelected={setSelected} setDropdown={setDropdown} />
            )}
          </div>
        </div>
        <div
          className="flex flex-row items-center justify-start w-full space-x-4"
          onClick={() => props.showModal(false)}
        >
          <div className="flex flex-row items-center justify-center w-full py-2 bg-white bg-opacity-5 hover:bg-opacity-[0.08] cursor-pointer rounded transition duration-300">
            <span className="text-[24px] text-white text-opacity-80 select-none">Cancel</span>
          </div>
          <div className="flex flex-row items-center justify-center w-full py-2 bg-olive-900 bg-opacity-80 hover:bg-opacity-100 cursor-pointer rounded transition duration-300">
            <span className="text-[24px] text-white text-opacity-80 select-none">Subscribe</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Dropdown(props) {
  return (
    <div className="absolute top-14 left-0 flex flex-col items-start justify-start w-full max-h-[175px] py-2 bg-[#1d2c24] rounded overflow-y-auto border-2 border-olive-920">
      {props.servers.map((server, index) => (
        <DropdownElement
          key={server.server_id}
          index={index}
          label={server.name}
          servers={props.servers}
          setSelected={props.setSelected}
          setDropdown={props.setDropdown}
        />
      ))}
    </div>
  );
}

function DropdownElement(props) {
  const onClick = () => {
    props.setSelected(props.servers[props.index]);
    props.setDropdown(false);
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center justify-start w-full pl-5 py-1 hover:bg-black hover:bg-opacity-10 cursor-pointer"
    >
      <span className="text-[22px] text-white text-opacity-60 select-none">{props.label}</span>
    </div>
  );
}
