import Comment from "../components/Comment";

export default function Comments(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      {props.comments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
}
