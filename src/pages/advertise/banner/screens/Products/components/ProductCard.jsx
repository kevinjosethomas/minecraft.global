import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import EditProduct from "../modals/EditProduct";
import DeleteProduct from "../modals/DeleteProduct";

export default function ProductCard(props) {
  const [editModal, showEditModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);

  return (
    <div className="flex h-40 flex-col justify-between rounded-lg border-2 border-olive-940 bg-olive-950 p-4">
      <div className="flex flex-col">
        <p className="text-3xl font-medium text-white">{props.name}</p>
        <div className="flex items-center space-x-2">
          <i className="far fa-link text-lg text-white text-opacity-80" />{" "}
          <p className="text-lg text-white text-opacity-80">{props.url}</p>
        </div>
      </div>
      <AnimatePresence>
        {editModal && <EditProduct showModal={showEditModal} {...props} />}
        {deleteModal && (
          <DeleteProduct showModal={showDeleteModal} {...props} />
        )}
      </AnimatePresence>
      <div className="flex select-none items-center space-x-3 text-lg text-white text-opacity-80">
        <a
          rel="noopener"
          target="_blank"
          className="group"
          href={`${process.env.NEXT_PUBLIC_API_URL}/a/product/${props.product_id}/image`}
        >
          <i className="far fa-external-link-alt" />{" "}
          <span className="group-hover:underline">View Banner</span>
        </a>
        <span>•</span>
        <p className="group cursor-pointer" onClick={() => showEditModal(true)}>
          <i className="far fa-pencil-paintbrush" />{" "}
          <span className="group-hover:underline">Edit</span>
        </p>
        <span>•</span>
        <p
          className="group cursor-pointer"
          onClick={() => showDeleteModal(true)}
        >
          <i className="far fa-trash" />{" "}
          <span className="group-hover:underline">Delete</span>
        </p>
      </div>
    </div>
  );
}
