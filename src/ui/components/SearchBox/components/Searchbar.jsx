import { AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import Popup from "./Popup";
import { SearchByQuery } from "api/search";

export default function Searchbar(props) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [popup, showPopup] = useState(false);
  const [previewResults, setPreviewResults] = useState(props.defaultResults);

  const node = useRef();

  useEffect(() => {
    input && setPreviewResults([]);
    const id = setTimeout(() => setQuery(input), 400);
    return () => clearTimeout(id);
  }, [input]);

  useEffect(() => {
    (async () => {
      if (!query) {
        setPreviewResults(props.defaultResults);
        return;
      }
      const [response, error] = await SearchByQuery(query, 9);
      setPreviewResults(response.entries.length ? response.entries : null);
    })();
  }, [query]);

  return (
    <div ref={node} className="relative flex flex-row items-center justify-start w-full">
      <input
        value={input}
        className="flex flex-row items-center justify-start w-full h-[75px] px-6 mr-[8px] text-[24px] text-white text-opacity-60 placeholder-white placeholder-opacity-60 bg-white bg-opacity-[0.06] rounded-[12px] focus:outline-none"
        placeholder="Search for Minecraft servers..."
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => showPopup(true)}
        // onBlur={(e) => showPopup(false)}
      />
      <SearchButton />
      <AnimatePresence>
        {popup && (
          <Popup query={query} results={previewResults} parentNode={node} showPopup={showPopup} />
        )}
      </AnimatePresence>
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
