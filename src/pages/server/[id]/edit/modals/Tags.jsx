import { useToasts } from "react-toast-notifications";

import Tag from "../components/Tag";
import categories from "../../../../../assets/data/tags";

function Tags(props) {
  const { addToast } = useToasts();

  const addTag = (tag) => {
    if (props.details.tags.length >= 5) {
      addToast("You cannot select more than 5 tags!", { appearance: "error" });
      return;
    }
    props.setDetails({
      ...props.details,
      tags: [...props.details.tags, tag],
    });
  };
  const removeTag = (tag) => {
    props.setDetails({
      ...props.details,
      tags: props.details.tags.filter((el) => el.name !== tag.name),
    });
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50"
      onClick={() => props.setTagsModal(false)}
    >
      <div
        className="flex flex-col items-start justify-start bg-dark-70 px-5 lg:px-20 py-5 lg:py-10 space-y-5 max-h-[40rem] overflow-y-scroll rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {categories.map((category) => (
          <div className="flex flex-col items-start justify-center space-y-2">
            <span className="font-bold text-2xl md:text-3xl text-gray-300">{category.label}s</span>
            <div className="flex flex-row items-center justify-start flex-wrap max-w-[15rem] md:max-w-2xl">
              {category.tags.map((tag) => (
                <Tag
                  {...tag}
                  selected={props.details.tags.includes(tag)}
                  select={() => addTag(tag)}
                  deselect={() => removeTag(tag)}
                  className="mr-2 mb-2"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
