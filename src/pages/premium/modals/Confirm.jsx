import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Modal from "ui/layouts/Modal";
import { CreatePremiumSession } from "api/premium";

export default function Confirm(props) {
  const router = useRouter();

  const servers = props.user.servers.filter((server) => !server.premium);
  const [selected, setSelected] = useState(servers[0]);
  const [dropdown, setDropdown] = useState(false);

  const onClick = async () => {
    const token = cookies.get("token");
    const [response, error] = await CreatePremiumSession(
      selected.server_id,
      token
    );
    if (error) {
      toast.error("Failed to redirect you! Please try again later!");
      return;
    }

    router.push(response);
  };

  return (
    <Modal showModal={props.showModal}>
      <motion.div
        className="flex h-[400px] w-[800px] flex-col items-start justify-between space-y-8 rounded-md border-2 border-olive-930 bg-olive-950 p-8"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex w-full flex-col items-start justify-start space-y-4">
          <p className="max-w-lg text-3xl leading-tight text-white text-opacity-90">
            Select the server you want to purchase Premium for:
          </p>
          <div className="relative flex w-[400px] flex-col items-start justify-start space-y-1">
            <div
              className="flex w-full cursor-pointer flex-row items-center justify-between rounded bg-white bg-opacity-10 px-5 py-2"
              onClick={() => setDropdown((dd) => !dd)}
            >
              <p className="select-none text-2xl text-white text-opacity-80">
                {selected.name}
              </p>
              <i
                className={`far ${
                  props.dropdown ? "fa-angle-up" : "fa-angle-down"
                } text-2xl text-white text-opacity-80`}
              />
            </div>
            {dropdown && (
              <Dropdown
                servers={servers}
                setSelected={setSelected}
                setDropdown={setDropdown}
              />
            )}
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-start space-x-4">
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center rounded bg-white bg-opacity-5 py-2 transition duration-300 hover:bg-opacity-[0.08]"
            onClick={() => props.showModal(false)}
          >
            <p className="select-none text-2xl text-white text-opacity-80">
              Cancel
            </p>
          </div>
          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center rounded bg-olive-900 bg-opacity-80 py-2 transition duration-300 hover:bg-opacity-100"
            onClick={onClick}
          >
            <p className="select-none text-2xl text-white text-opacity-80">
              Subscribe
            </p>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}

function Dropdown(props) {
  return (
    <div className="absolute top-14 left-0 flex max-h-[175px] w-full flex-col items-start justify-start overflow-y-auto rounded border-2 border-olive-920 bg-[#1d2c24] py-2">
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
      className="flex w-full cursor-pointer flex-row items-center justify-start py-1 pl-5 hover:bg-black hover:bg-opacity-10"
    >
      <p className="select-none text-xl text-white text-opacity-60">
        {props.label}
      </p>
    </div>
  );
}
