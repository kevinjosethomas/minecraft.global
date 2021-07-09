import { useRef } from "react";

const Search = (): JSX.Element => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-row items-center justify-center px-6 py-2 space-x-2 bg-dark-600 rounded-full"
      onClick={() => input.current?.focus()}
    >
      <i className="far fa-search text-lg text-gray-400" />
      <input
        ref={input}
        className="w-64 h-full text-lg text-gray-400 placeholder-gray-400 focus:outline-none bg-transparent"
        placeholder="Search for a server..."
      />
    </div>
  );
};

export default Search;
