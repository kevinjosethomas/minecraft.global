export default function Input(props) {
  return (
    <div className="flex w-full flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-x-8 md:space-y-0">
      <div className="flex flex-col items-start justify-start">
        <p className="text-xl text-white text-opacity-80 md:text-2xl">
          {props.label}
        </p>
        <p className="leading-tight text-white text-opacity-60 md:text-lg">
          {props.description}
        </p>
      </div>
      <input
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none min-h-[32px] min-w-[300px] rounded-md border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-3 text-lg text-white text-opacity-80 md:min-h-[50px] md:min-w-[400px]"
      />
    </div>
  );
}
