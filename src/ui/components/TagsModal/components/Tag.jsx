export default function Tag(props) {
  const selected = props.tags.includes(props.name);

  const select = () => {
    props.setTags((d) => ({ ...d, tags: [...d.tags, props.name] }));
  };

  const deselect = () => {
    props.setTags((d) => ({ ...d, tags: d.tags.filter((t) => t !== props.name) }));
  };

  return (
    <div
      className={`flex flex-row items-center justify-center px-5 py-1.5 mr-2 mb-2 ${
        selected
          ? "bg-olive-800 hover:bg-olive-700"
          : "bg-white bg-opacity-10 hover:bg-opacity-[0.15]"
      } rounded-full cursor-pointer transition duration-300`}
      onClick={selected ? deselect : select}
    >
      <p className="text-xl text-white text-opacity-80 select-none">{props.name}</p>
    </div>
  );
}
