type TagProps = {
  tag: Record<string, any>;
  parameters: Record<string, any>;
  setParameters: CallableFunction;
};

function Tag(props: TagProps): JSX.Element {
  const selected = props.parameters.tags.includes(props.tag.name);

  const selectTag = () => {
    props.setParameters({
      ...props.parameters,
      tags: [...props.parameters.tags, props.tag.name],
    });
  };

  const deselectTag = () => {
    props.setParameters({
      ...props.parameters,
      tags: props.parameters.tags.filter((t: string) => t !== props.tag.name),
    });
  };

  return (
    <div
      key={props.tag.id}
      className={`flex flex-row items-center justify-center px-5 py-1.5 mr-2 mb-2 select-none ${
        selected ? "bg-olive-800 hover:bg-olive-700" : "bg-dark-500 hover:bg-dark-200"
      } rounded-full transition cursor-pointer duration-300`}
      onClick={() => (selected ? deselectTag() : selectTag())}
    >
      <span className={`font-medium text-xl ${selected ? "text-gray-300" : "text-gray-400"}`}>
        {props.tag.name}
      </span>
    </div>
  );
}

export default Tag;
