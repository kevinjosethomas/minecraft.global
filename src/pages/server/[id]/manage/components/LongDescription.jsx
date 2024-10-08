export default function LongDescription(props) {
  return (
    <div className="flex w-full flex-col items-start justify-between space-y-2">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">
          Long Description
          <span className="ml-1 select-none text-xl text-red-800">*</span>
        </p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          Provide a detailed description about your server (explain features,
          gamemodes, etc.)
        </p>
      </div>
      <textarea
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none min-h-[500px] w-full resize-none rounded-md border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-3 text-lg text-white text-opacity-80"
      />
    </div>
  );
}
