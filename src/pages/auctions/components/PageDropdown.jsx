import { useState } from "react";
import SimplifyNumber from "simplify-number";

export default function PageDropdown(props) {
  const [dropdown, showDropdown] = useState(false);

  return (
    <div className="relative flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-col items-start justify-start w-full">
        <p className="text-2xl text-white leading-tight">Choose a page for your advertisement</p>
        <p className="text-lg text-white text-opacity-80">Select a spot that you want to bid for</p>
      </div>
      <div
        className="flex items-center justify-between w-full px-4 py-2 bg-olive-940 select-none rounded-lg"
        onClick={() => showDropdown(!dropdown)}
      >
        <p className="text-xl text-white text-opacity-80">{props.page?.name}</p>
        <i className="far fa-chevron-down text-white text-opacity-80" />
      </div>
      {dropdown && <Dropdown pages={props.pages} setPages={props.setPages} />}
    </div>
  );
}

function Dropdown(props) {
  const [pages, setPages] = useState(props.pages);

  const filter = (e) => {
    setPages(
      props.pages.filter((p) => p.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  return (
    <div className="absolute z-10 flex flex-col items-start justify-start top-28 w-full py-4 space-y-1 bg-olive-940 border-2 border-olive-920 rounded-lg">
      <div className="flex flex-col items-start justify-start w-full px-4 space-y-3">
        <div className="flex flex-row items-center justify-start w-full px-3 py-1.5 space-x-3 bg-black bg-opacity-20 rounded">
          <i className="far fa-search text-lg text-white text-opacity-80" />
          <input
            className="w-full bg-transparent text-lg text-white text-opacity-80 placeholder:text-black focus:outline-none"
            placeholder="Search for location"
            onChange={filter}
          />
        </div>
        <div className="w-full h-0.5  bg-white bg-opacity-10" />
      </div>
      <div className="flex flex-col items-start justify-start w-full max-h-[250px] py-2 overflow-y-scroll">
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between w-full px-4 py-1 select-none cursor-pointer hover:bg-black hover:bg-opacity-20 transition duration-300"
          >
            <p className="text-lg text-white text-opacity-80">{page.name}</p>
            <div className="flex items-center justify-center px-2 py-1 space-x-1 bg-olive-920 rounded">
              <i className="far fa-eye text-sm text-white text-opacity-80" />
              <p className="text-sm text-white text-opacity-80">
                {SimplifyNumber(page.views, { decimal: 1 })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
