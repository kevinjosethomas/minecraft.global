export default function Input(props) {
  return (
    <div className="flex flex-row items-start justify-between w-full space-x-8">
      <div className="flex flex-col items-start justify-start">
        <p className="text-2xl text-white text-opacity-80">{props.label}</p>
        <p className="text-lg text-white text-opacity-60 leading-tight">{props.description}</p>
      </div>
      <input className="min-w-[450px] min-h-[50px] p-3 text-lg text-white text-opacity-80 bg-white bg-opacity-5 border-2 border-white border-opacity-10 focus:outline-none rounded-md"></input>
    </div>
  );
}
