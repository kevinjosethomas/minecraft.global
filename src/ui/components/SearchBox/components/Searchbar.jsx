import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, Fragment } from "react";

import Popup from "./Popup";
import { GetSearchResults } from "api/search";

export default function Searchbar(props) {
  const router = useRouter();

  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [popup, showPopup] = useState(false);
  const [previewResults, setPreviewResults] = useState(props.defaultResults);

  const node = useRef();

  const onSearch = (e) => {
    if (e.key) {
      if (e.key === "Enter" && input) {
        router.push(`/search?q=${input}`);
      }
    } else {
      if (input) {
        router.push(`/search?q=${input}`);
      }
    }
  };

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

      const [response, error] = await GetSearchResults({
        query: query,
        sort: "upvotes",
        amount: 9,
      });
      setPreviewResults(response.payload.entries.length ? response.payload.entries : null);
    })();
  }, [query]);

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popup]);

  return (
    <Fragment>
      <AnimatePresence>
        {popup && (
          <motion.div
            className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <div ref={node} className="relative flex flex-row items-center justify-start w-full mt-2">
        <input
          value={input}
          className="z-30 flex flex-row items-center justify-start w-full h-[75px] px-6 mr-[8px] text-2xl text-white text-opacity-60 placeholder-white placeholder-opacity-60 bg-white bg-opacity-[0.06] rounded-[12px] focus:outline-none"
          placeholder="Search for Minecraft servers..."
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => showPopup(true)}
          onKeyPress={onSearch}
        />
        <SearchButton onClick={onSearch} />
        <AnimatePresence>
          {popup && (
            <Popup query={query} results={previewResults} parentNode={node} showPopup={showPopup} />
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}

function SearchButton(props) {
  return (
    <div
      className="z-30 flex flex-row items-center justify-center min-w-[75px] min-h-[75px] ml-[8px] bg-olive-700 hover:bg-olive-800 rounded-[12px] transition duration-300 cursor-pointer"
      onClick={props.onClick}
    >
      <i className="far fa-search text-2xl text-white text-opacity-90" />
    </div>
  );
}
