import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, Fragment } from "react";

import Popup from "./Popup";
import { GetSearchResults } from "api/search";

export default function Searchbar(props) {
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [input, setInput] = useState(router.query.q || "");
  const [query, setQuery] = useState("");
  const [popup, showPopup] = useState(false);
  const [previewResults, setPreviewResults] = useState([]);

  const node = useRef();

  const onSearch = (e) => {
    if (e.key) {
      if (e.key === "Enter" && input) {
        router.push(`/search?q=${input}`);
        showPopup(false);
      }
    } else {
      if (input) {
        router.push(`/search?q=${input}`);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const [response, error] = await GetSearchResults({
        amount: 6,
        sort: "upvotes",
        track_tags: false,
      });

      setResults(response.payload.entries);
      setPreviewResults(response.payload.entries);
    })();
  }, []);

  useEffect(() => {
    input && setPreviewResults([]);
    const id = setTimeout(() => setQuery(input), 400);
    return () => clearTimeout(id);
  }, [input]);

  useEffect(() => {
    (async () => {
      if (!query) {
        setPreviewResults(results);
        return;
      }

      const [response, error] = await GetSearchResults({
        query: query,
        sort: "upvotes",
        amount: 6,
      });

      setPreviewResults(
        response.payload.entries.length ? response.payload.entries : null
      );
    })();
  }, [query]);

  useEffect(() => {
    showPopup(false);
  }, [router.asPath]);

  return (
    <Fragment>
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed top-0 left-0 z-20 hidden h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-60 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <div
        ref={node}
        className="relative mt-2 flex w-full items-center justify-start"
      >
        <input
          value={input}
          className="focus:outline-none z-30 flex h-[50px] w-full items-center justify-start rounded bg-white bg-opacity-[0.06] px-4 text-white text-opacity-60 placeholder-white placeholder-opacity-60 md:h-[75px] md:rounded-xl md:px-6 md:text-2xl"
          placeholder="Search for Minecraft servers..."
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => showPopup(true)}
          onKeyPress={onSearch}
        />
        <SearchButton onClick={onSearch} />
        <AnimatePresence>
          {popup && (
            <Popup
              query={query}
              results={previewResults}
              parentNode={node}
              showPopup={showPopup}
            />
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
}

function SearchButton(props) {
  return (
    <div
      className="z-30 ml-[8px] flex min-h-[50px] min-w-[50px] cursor-pointer items-center justify-center rounded bg-olive-700 transition duration-300 hover:bg-olive-800 md:ml-[16px] md:min-h-[75px] md:min-w-[75px] md:rounded-xl"
      onClick={props.onClick}
    >
      <i className="far fa-search text-lg text-white text-opacity-90 md:text-2xl" />
    </div>
  );
}
