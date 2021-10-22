export default function Element(props) {
  return (
    <div className="flex flex-row items-center justify-start space-x-2">
      <i className={`${props.icon} text-[24px] text-white text-opacity-80`} />
      <span className="text-[24px] text-white text-opacity-80">{props.label}</span>
    </div>
  );
}
