import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import { PostServerComment } from "api/comment";

export default function PosComment(props) {
  const [content, setContent] = useState("");

  const submit = async () => {
    if (content.length < 5) {
      toast.error("Your comment must be at least 5 characters!");
      return;
    }
    if (content.length > 500) {
      toast.error("Your comment must not be over 500 characters!");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await PostServerComment(props.id, content, token);

    if (error) {
      if (error.response?.status === 401) {
        toast.error("Please login and try again!");
      } else if (error.response?.status === 409) {
        toast.error("You have already commented on this server!");
      } else {
        toast.error("An unknown error occurred!");
      }
      return;
    }

    toast.success("Successfully posted your comment!");
  };

  const onContentChange = (e) => {
    setContent(e.target.value.substring(0, 500));
  };

  return (
    <div className="flex w-full flex-col items-start justify-start space-y-2">
      <div className="flex items-center justify-start space-x-2">
        <i className="fas fa-comment-edit text-3xl text-white" />
        <p className="text-3xl text-white">Write a Comment</p>
      </div>
      <textarea
        className="focus:outline-none h-[150px] w-full resize-none rounded border-2 border-olive-920 bg-olive-940 p-2 text-xl text-white text-opacity-80"
        value={content}
        onChange={onContentChange}
      />
      <div className="flex w-full items-center justify-end">
        <div
          className="flex cursor-pointer items-center justify-center rounded bg-olive-800 px-6 py-2 transition duration-300 hover:bg-olive-900"
          onClick={submit}
        >
          <p className="text-xl text-white">Post</p>
        </div>
      </div>
    </div>
  );
}
