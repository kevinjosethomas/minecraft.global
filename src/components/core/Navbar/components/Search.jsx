import { useRouter } from "next/router";

function Search(props) {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-start px-4 py-2 space-x-2 bg-dark-60 rounded-md">
      <i className="far fa-search text-xs lg:text-md xl:text-lg text-gray-400" />
      <input
        className="w-32 lg:w-40 xl:w-56 text-xs lg:text-sm xl:text-md text-gray-400 placeholder-gray-400 bg-transparent focus:outline-none"
        placeholder="Search for servers..."
        onKeyPress={(e) =>
          e.key == "Enter" && e.target.value
            ? router.push("/servers?q=" + e.target.value)
            : void 0
        }
      />
    </div>
  );
}

export default Search;
