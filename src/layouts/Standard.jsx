import { useRouter } from "next/router";

import Footer from "../components/core/Footer";
import Navbar from "../components/core/Navbar/Navbar";

function Standard(props) {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col items-center justify-start h-full overflow-x-hidden ${
        router.pathname == "/" ? "bg-index" : ""
      }`}
    >
      <Navbar user={props.user} dark={router.pathname == "/" ? true : false} />
      {props.children}
      {(props.footer != null ? props.footer : true) && (
        <Footer dark={router.pathname == "/" ? true : false} />
      )}
    </div>
  );
}

export default Standard;
