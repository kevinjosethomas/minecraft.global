type TagsButtonProps = {
  tagsModal: boolean;
  showTagsModal: CallableFunction;
  parameters: Record<string, any>;
  setParameters: CallableFunction;
};

function TagsButton(props: TagsButtonProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <span className="font-medium text-3xl text-gray-400">Server Tags</span>
      <div
        className="flex flex-row items-center justify-center px-6 py-2 bg-olive-800 hover:bg-olive-700 rounded-full cursor-pointer select-none transition duration-300"
        onClick={() => props.showTagsModal(true)}
      >
        <span className="font-medium text-xl text-gray-300">Choose Tags</span>
      </div>
      <div className="flex flex-row items-center justify-start space-x-2">
        {props.parameters.tags.map((tag: string, index: number) => (
          <div
            key={index}
            className="px-2 py-0.5 bg-dark-400 hover:bg-dark-200 rounded select-none cursor-pointer transition duration-300"
            onClick={() => {
              props.setParameters({
                ...props.parameters,
                tags: props.parameters.tags.filter((t: string) => t !== tag),
              });
            }}
          >
            <span className="text-gray-400">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsButton;
