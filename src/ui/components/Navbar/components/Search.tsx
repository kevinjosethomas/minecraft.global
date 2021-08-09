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
      className="flex flex-row items-center justify-center h-10 px-4 space-x-4 bg-dark-600 rounded"
      onClick={() => input.current?.focus()}
    >
      <i className="far fa-search text-md text-gray-400" />
      <input
        ref={input}
        className="h-full text-gray-400 placeholder-gray-400 focus:outline-none bg-transparent"
        placeholder="Search for a server..."
        onKeyPress={onEnter}
      />
    </div>
  );
};

export default Search;
