export default function Description(props) {
  return (
    <div className="flex flex-row items-center justify-start w-full">
      <p className="text-[18px] text-white text-opacity-70">{props.description}</p>
    </div>
  );
}
