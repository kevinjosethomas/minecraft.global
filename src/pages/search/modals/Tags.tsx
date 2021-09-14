type TagsProps = {
  showTagsModal: CallableFunction;
};

function Tags(props: TagsProps): JSX.Element {
  return (
    <div
      className="fixed grid grid-flow-col content-center gap-x-10 justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-10 overflox-y-hidden"
      onClick={() => props.showTagsModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-10 bg-dark-800 border-2 border-gray-800 rounded"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default Tags;
