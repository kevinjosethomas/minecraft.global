export default function Description(props) {
  return (
    <div className="flex w-full items-center justify-start">
      <p className="text-sm text-white text-opacity-70 md:text-base">
        {props.description}
      </p>
    </div>
  );
}
