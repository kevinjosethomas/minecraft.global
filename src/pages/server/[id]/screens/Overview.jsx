import ReactMarkdown from "react-markdown";

export default function Overview(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <ReactMarkdown className="long-description format-links w-full text-[20px] text-white text-opacity-80 whitespace-pre-wrap overflow-x-hidden">
        {props.long_description}
      </ReactMarkdown>
    </div>
  );
}
