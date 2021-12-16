import cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

import { PostComment } from "api/server";

export default function PostServerComment(props) {
  const [content, setContent] = useState("");

  const submit = async () => {
    if (content.length < 15) {
      toast.error("Your comment must be at least 15 characters!");
      return;
    }
    if (content.length > 500) {
      toast.error("Your comment must not be over 500 characters!");
      return;
    }

    const token = cookies.get("token");
    const [response, error] = await PostComment(props.id, content, token);

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
    <div className="flex flex-col items-start justify-start w-full space-y-2">
      <div className="flex flex-row items-center justify-start space-x-2">
        <i className="fas fa-comment-edit text-3xl text-white" />
        <p className="text-3xl text-white">Write a Comment</p>
      </div>
      <textarea
        className="w-full h-[150px] p-2 text-xl text-white text-opacity-80 bg-olive-940 resize-none border-2 border-olive-920 rounded focus:outline-none"
        value={content}
        onChange={onContentChange}
      />
      <div className="flex flex-row items-center justify-end w-full">
        <div
          className="flex flex-row items-center justify-center px-6 py-2 bg-olive-800 rounded cursor-pointer hover:bg-olive-900 transition duration-300"
          onClick={submit}
        >
          <p className="text-xl text-white">Post</p>
        </div>
      </div>
    </div>
  );
}
