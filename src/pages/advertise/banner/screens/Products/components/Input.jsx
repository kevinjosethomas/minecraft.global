export default function Input(props) {
  return (
    <div className="flex w-full items-center justify-between space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">{props.label}</p>
        <p className="text-lg leading-tight text-white text-opacity-60">
          {props.description}
        </p>
      </div>
      <input
        value={props.value}
        onChange={props.onChange}
        className="focus:outline-none min-h-[50px] min-w-[400px] rounded-md border-2 border-white border-opacity-10 bg-white bg-opacity-5 p-3 text-lg text-white text-opacity-80"
      />
    </div>
  );
}
