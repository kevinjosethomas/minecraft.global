export default function LongDescription(props) {
  return (
    <div className="flex flex-col items-start justify-between w-full space-y-2">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          Long Description<span className="ml-1 text-xl text-red-800 select-none">*</span>
        </p>
        <p className="text-lg text-white text-opacity-60 leading-tight">
          Provide a detailed description about your server (explain features, gamemodes, etc.)
        </p>
      </div>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="w-full min-h-[500px] p-3 text-lg text-white text-opacity-80 resize-none bg-white bg-opacity-5 border-2 border-white border-opacity-10 focus:outline-none rounded-md"
      />
    </div>
  );
}
