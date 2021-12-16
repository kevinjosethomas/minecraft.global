import moment from "moment";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import EditModal from "../modals/Edit";

export default function Comment(props) {
  const [editModal, showEditModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);

  const avatar = props.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.minecraft_uuid}?size=128`
    : "/images/steve.png";

  return (
    <div
      className={`flex flex-col items-start justify-start w-full p-5 space-y-1 ${
        props.user.user_id === props.user_id ? "bg-olive-960" : "bg-olive-970"
      } ${props.first && "rounded-t-xl"} ${props.last && "rounded-b-xl"}`}
    >
      <div className="!m-0">
        <AnimatePresence>
          {editModal && <EditModal showModal={showEditModal} content={props.content} />}
        </AnimatePresence>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center justify-start space-x-2">
          <img
            src={avatar}
            alt={`${props.name}'s' Name`}
            draggable="false"
            className="w-10 h-10 rounded-sm"
          />
          <p className="text-3xl text-white text-opacity-90">{props.name}</p>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start w-full">
        <p className="text-xl text-white text-opacity-70">{props.content}</p>
      </div>
      <div className="flex flex-row items-center justify-end w-full space-x-4">
        <p className="text-xl text-white text-opacity-80 select-none">
          -{" "}
          <span className="text-opacity-90">{moment(props.created_at).format("MMM Do YYYY")}</span>
        </p>
        {props.edited && <p className="text-xl text-white text-opacity-60 select-none">(edited)</p>}
        {props.user.user_id === props.user_id && (
          <div className="flex flex-row items-center justify-center space-x-2">
            <i
              className="far fa-edit text-xl text-olive-600 cursor-pointer"
              onClick={() => showEditModal(true)}
            />
            <i
              className="far fa-trash-alt text-xl text-red-900 cursor-pointer"
              onClick={() => showDeleteModal(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
