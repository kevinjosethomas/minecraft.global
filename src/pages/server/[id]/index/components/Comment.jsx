import moment from "moment";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import EditModal from "../modals/Edit";

export default function Comment(props) {
  const [editModal, showEditModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);

  const avatar = props.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.minecraft_uuid}?size=128&overlay`
    : "/images/steve.png";

  return (
    <div
      className={`flex w-full flex-col items-start justify-start space-y-1 p-5 ${
        props.user.user_id === props.user_id ? "bg-olive-960" : "bg-olive-970"
      } ${props.first && "rounded-t-xl"} ${props.last && "rounded-b-xl"}`}
    >
      <div className="!m-0">
        <AnimatePresence>
          {editModal && (
            <EditModal
              content={props.content}
              showModal={showEditModal}
              server_id={props.server_id}
              comment_id={props.comment_id}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start space-x-2">
          <img
            src={avatar}
            alt={`${props.name}'s' Name`}
            draggable="false"
            className="h-6 w-6 rounded-sm md:h-10 md:w-10"
          />
          <p className="text-xl text-white text-opacity-90 md:text-3xl">
            {props.name}
          </p>
        </div>
      </div>
      <div className="flex w-full items-start justify-start">
        <p className="text-white text-opacity-70 md:text-xl">{props.content}</p>
      </div>
      <div className="flex w-full items-center justify-end space-x-2 md:space-x-4">
        <p className="select-none text-sm text-white text-opacity-80 md:text-xl">
          -{" "}
          <span className="text-opacity-90">
            {moment(props.created_at).format("MMM Do YYYY")}
          </span>
        </p>
        {props.edited && (
          <p className="select-none text-sm text-white text-opacity-60 md:text-xl">
            (edited)
          </p>
        )}
        {props.user.user_id === props.user_id && (
          <div className="flex items-center justify-center space-x-1 md:space-x-2">
            <i
              className="far fa-edit cursor-pointer text-sm text-olive-600 md:text-xl"
              onClick={() => showEditModal(true)}
            />
            {/* <i
              className="far fa-trash-alt text-sm md:text-xl text-red-900 cursor-pointer"
              onClick={() => showDeleteModal(true)}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
