import { useState } from "react";
import OnOutsideClick from "react-outclick";
import SimplifyNumber from "simplify-number";
import { motion, AnimatePresence } from "framer-motion";

export default function PageDropdown(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative flex w-full flex-col items-start justify-start">
      <div className="mb-2 flex w-full flex-col items-start justify-start">
        <p className="text-2xl leading-tight text-white">
          Choose a page for your advertisement
        </p>
        <p className="text-lg text-white text-opacity-80">
          Select a spot that you want to bid for
        </p>
      </div>
      <div
        className="flex w-full cursor-pointer select-none items-center justify-between rounded-lg bg-olive-940 px-4 py-2"
        onClick={() => showDropdown(!dropdown)}
      >
        <p className="text-xl text-white text-opacity-80">{props.page?.name}</p>
        <div className="flex flex-row items-center justify-start space-x-4">
          <div className="flex items-center justify-center space-x-1 rounded bg-olive-920 px-2 py-1">
            <i className="far fa-eye text-sm text-white text-opacity-80" />
            <p className="text-sm text-white text-opacity-80">
              {SimplifyNumber(props.page?.views, { decimal: 1 })}
            </p>
          </div>
          <i className="far fa-angle-down text-xl text-white text-opacity-80" />
        </div>
      </div>
      <AnimatePresence>
        {dropdown && (
          <Dropdown
            pages={props.pages}
            setPage={props.setPage}
            showDropdown={showDropdown}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Dropdown(props) {
  const [pages, setPages] = useState(props.pages);

  const filter = (e) => {
    setPages(
      props.pages.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <OnOutsideClick onOutsideClick={() => props.showDropdown(false)}>
      <motion.div
        className="absolute top-[7.25rem] z-10 flex w-full flex-col items-start justify-start space-y-1 rounded-lg border-2 border-olive-920 bg-olive-940 py-4"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex w-full flex-col items-start justify-start space-y-3 px-4">
          <div className="flex w-full flex-row items-center justify-start space-x-3 rounded bg-black bg-opacity-20 px-3 py-1.5">
            <i className="far fa-search text-lg text-white text-opacity-80" />
            <input
              className="focus:outline-none w-full bg-transparent text-lg text-white text-opacity-80 placeholder:text-black"
              placeholder="Search for a spot"
              onChange={filter}
            />
          </div>
          <div className="h-0.5 w-full  bg-white bg-opacity-10" />
        </div>
        <div className="flex max-h-[250px] w-full flex-col items-start justify-start overflow-y-auto py-2">
          {pages.map((page, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer select-none flex-row items-center justify-between px-4 py-1 transition duration-300 hover:bg-black hover:bg-opacity-20"
              onClick={() => {
                props.setPage(page);
                props.showDropdown(false);
              }}
            >
              <p className="text-lg text-white text-opacity-80">{page.name}</p>
              <div className="flex items-center justify-center space-x-1 rounded bg-olive-920 px-2 py-1">
                <i className="far fa-eye text-sm text-white text-opacity-80" />
                <p className="text-sm text-white text-opacity-80">
                  {SimplifyNumber(page.views, { decimal: 1 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </OnOutsideClick>
  );
}
