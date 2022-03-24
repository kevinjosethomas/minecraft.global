import toast from "react-hot-toast";

export default function Tag(props) {
  const selected = props.tags.includes(props.name);

  const select = () => {
    if (props.tags.length >= props.limit) {
      toast.error(
        `You can only select ${props.limit} tag${props.limit !== 1 && "s"}!`
      );
      return;
    }

    props.setTags((d) => ({ ...d, tags: [...d.tags, props.name] }));
  };

  const deselect = () => {
    props.setTags((d) => ({
      ...d,
      tags: d.tags.filter((t) => t !== props.name),
    }));
  };

  return (
    <div
      className={`mr-2 mb-2 flex items-center justify-center px-5 py-1.5 ${
        selected
          ? "bg-olive-500 hover:bg-olive-600"
          : "bg-white bg-opacity-10 hover:bg-opacity-20"
      } cursor-pointer rounded-full transition duration-300`}
      onClick={selected ? deselect : select}
    >
      <p className="select-none text-xl text-white text-opacity-80">
        {props.name}
      </p>
    </div>
  );
}
