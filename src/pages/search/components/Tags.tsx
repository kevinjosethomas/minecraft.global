type TagsProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
  showTagsModal: CallableFunction;
};

function Tags(props: TagsProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-2">
      <span className="font-bold text-4xl text-gray-300">Tags</span>
      <div className="flex flex-col items-start justify-center space-y-2">
        <div
          className="flex flex-row items-center justify-center px-6 py-2 cursor-pointer select-none bg-olive-900 hover:bg-olive-800 rounded-full transition duration-300"
          onClick={() => props.showTagsModal(true)}
        >
          <span className="font-bold text-lg text-gray-300">Choose Tags</span>
        </div>
        <div className="flex flex-row items-center justify-start flex-wrap">
          {props.parameters.tags.map((tag: string, index: number) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center px-2 py-1 space-x-2 mr-2 mb-2 bg-dark-500 hover:bg-dark-200 select-none cursor-pointer rounded transition duration-300"
              onClick={() => {
                props.setParameters({
                  ...props.parameters,
                  tags: props.parameters.tags.filter((t: string) => t !== tag),
                });
              }}
            >
              <span className="text-sm font-medium text-gray-400 select-none whitespace-nowrap">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
