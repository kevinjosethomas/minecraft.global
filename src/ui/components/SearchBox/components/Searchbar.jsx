export default function Searchbar(props) {
  return (
    <div className="flex flex-row items-center justify-start w-full space-x-[16px]">
      <input
        className="flex flex-row items-center justify-start w-full h-[75px] px-6 text-[24px] text-white text-opacity-60 placeholder-white placeholder-opacity-60 bg-white bg-opacity-[0.06] rounded-[12px] focus:outline-none"
        placeholder="Search for Minecraft servers..."
      />
      <SearchButton />
    </div>
  );
}

function SearchButton() {
  return (
    <div className="flex flex-row items-center justify-center min-w-[75px] min-h-[75px] bg-olive-700 hover:bg-olive-800 rounded-[12px] transition duration-300 cursor-pointer">
      <i className="far fa-search text-[24px] text-white text-opacity-90" />
    </div>
  );
}
