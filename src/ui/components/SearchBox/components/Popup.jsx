import { useEffect, useRef } from "react";

import Search from "./Search";

export default function Popup(props) {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target) || props.parentNode.current.contains(e.target)) {
      return;
    }

    props.showPopup(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      ref={node}
      className="absolute top-[85px] left-0 flex flex-col items-start justify-start w-full p-6 rounded-[12px] bg-olive-940 bg-opacity-50 border-2 border-olive-940"
      // onClick={() => props.inputRef.current.focus()}
    >
      <Search results={props.results} />
    </div>
  );
}
