type DescriptionProps = {
  params: Record<string, any>;
  setParams: CallableFunction;
};

function Description(props: DescriptionProps): JSX.Element {
  const onLongDescriptionChange = (e: any) => {
    if (e.target.value.length >= 5000) {
      return;
    }
    props.setParams({ ...props.params, long_description: e.target.value });
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-2">
      <span className="font-medium text-2xl text-gray-400">
        Long Description (supports{" "}
        <a
          href="https://commonmark.org/help/"
          target="_blank"
          rel="noreferrer"
          className="format-links"
        >
          markdown
        </a>
        )
      </span>
      <div className="flex flex-col items-center justify-center p-4 w-full bg-dark-800 rounded border-2 border-gray-800">
        <textarea
          className="w-full min-h-[25rem] text-gray-400 bg-transparent focus:outline-none rounded resize-none"
          value={props.params.long_description}
          onChange={onLongDescriptionChange}
        />
      </div>
    </div>
  );
}

export default Description;
