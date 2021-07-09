import { useRef } from "react";

const Search = (): JSX.Element => {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      className="flex flex-row items-center justify-center h-10 pl-6 pr-16 space-x-4 bg-dark-600 rounded"
      onClick={() => input.current?.focus()}
    >
      <i className="far fa-search text-md text-gray-400" />
      <input
        ref={input}
        className="h-full text-gray-400 placeholder-gray-400 focus:outline-none bg-transparent"
        placeholder="Search for servers..."
      />
    </div>
  );
};

export default Search;
