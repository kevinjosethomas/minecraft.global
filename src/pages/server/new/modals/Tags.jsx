import Tag from "../components/Tag";
import categories from "../../../../assets/data/tags";

function Tags(props) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center w-screen h-screen top-0 left-0 z-50 bg-black bg-opacity-50"
      onClick={() => props.setTagsModal(false)}
    >
      <div
        className="flex flex-col items-start justify-start bg-dark-70 px-20 py-10 space-y-5 max-h-[40rem] overflow-y-scroll rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {categories.map((category) => (
          <div className="flex flex-col items-start justify-center space-y-2">
            <h1 className="font-bold text-3xl text-gray-300">
              {category.label}
            </h1>
            <div className="flex flex-row items-center justify-start flex-wrap max-w-2xl">
              {category.tags.map((tag) => (
                <Tag {...tag} selected={false} className="mr-2 mb-2" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
