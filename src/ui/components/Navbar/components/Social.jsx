export default function Social(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      <i
        className={`${props.icon} text-[20px] text-white text-opacity-80 hover:text-opacity-90 transition duration-300`}
      />
    </a>
  );
}
