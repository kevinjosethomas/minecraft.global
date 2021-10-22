import { useEffect, useState } from "react";

import Popup from "./Popup";

export default function Searchbar(props) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [popup, showPopup] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setQuery(input), 1000);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <div className="relative flex flex-row items-center justify-start w-full">
      <input
        value={input}
        className="input-focus-outline flex flex-row items-center justify-start w-full h-[75px] px-6 mr-[8px] text-[24px] text-white text-opacity-60 placeholder-white placeholder-opacity-60 bg-white bg-opacity-[0.06] rounded-[12px]"
        placeholder="Search for Minecraft servers..."
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => showPopup(true)}
        onBlur={() => showPopup(false)}
      />
      <SearchButton />
      {popup && <Popup />}
    </div>
  );
}

function SearchButton() {
  return (
    <div className="flex flex-row items-center justify-center min-w-[75px] min-h-[75px] ml-[8px] bg-olive-700 hover:bg-olive-800 rounded-[12px] transition duration-300 cursor-pointer">
      <i className="far fa-search text-[24px] text-white text-opacity-90" />
    </div>
  );
}
