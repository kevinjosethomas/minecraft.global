import { useState } from "react";
import { useRouter } from "next/router";

import Footer from "../components/core/Footer";
import Navbar from "../components/core/Navbar/Navbar";
import EditUser from "../components/core/modals/EditUser/EditUser";

function Standard(props) {
  const router = useRouter();
  const [editUserModal, setEditUserModal] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-start h-full overflow-x-hidden ${
        router.pathname == "/" ? "bg-index" : ""
      }`}
    >
      {editUserModal && (
        <EditUser user={props.user} setEditUserModal={setEditUserModal} />
      )}
      <Navbar
        user={props.user}
        dark={router.pathname == "/" ? true : false}
        setEditUserModal={setEditUserModal}
      />
      {props.children}
      {(props.footer != null ? props.footer : true) && (
        <Footer dark={router.pathname == "/" ? true : false} />
      )}
    </div>
  );
}

export default Standard;
