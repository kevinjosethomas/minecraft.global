type TextAreaProps = {
  label: string;
};

function TextArea(props: TextAreaProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-medium text-2xl text-gray-400">{props.label}</span>
      <textarea className="w-96 h-40 px-2 py-2 text-gray-400 bg-dark-500 focus:outline-none rounded resize-none" />
    </div>
  );
}

export default TextArea;
