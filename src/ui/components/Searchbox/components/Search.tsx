import { useRef } from "react";
import { useRouter } from "next/router";

const Search = (): JSX.Element => {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  const onEnter = (e: any) => {
    if (e.key === "Enter" && e.target.value) {
      router.push(`/search?q=${e.target.value}`);
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-center w-full md:w-auto px-5 md:px-6 py-2 space-x-2 bg-dark-600 rounded-full"
      onClick={() => input.current?.focus()}
    >
      <i className="far fa-search md:text-lg text-gray-400" />
      <input
        ref={input}
        className="w-full md:w-64 h-full md:text-lg text-gray-400 placeholder-gray-400 focus:outline-none bg-transparent"
        placeholder="Search for a server..."
        onKeyPress={onEnter}
      />
    </div>
  );
};

export default Search;
