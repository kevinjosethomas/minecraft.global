import Comment from "./Comment";

export default function Comments(props) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-0.5">
      {props.comments.map((comment, index) => (
        <Comment
          key={index}
          first={index === 0}
          server_id={props.server_id}
          last={index === props.comments.length - 1}
          user={props.user}
          {...comment}
        />
      ))}
    </div>
  );
}
