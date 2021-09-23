import categories from "lib/tags";
import Tag from "../components/Tag";

type TagsProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
  showTagsModal: CallableFunction;
};

function Tags(props: TagsProps): JSX.Element {
  return (
    <div
      className="fixed flex flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-40 overflow-y-hidden"
      onClick={() => props.showTagsModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-10 max-w-6xl max-h-[40rem] bg-dark-800 border-2 border-gray-800 rounded overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start justify-start space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-start justify-start space-y-2">
              <span className="font-bold text-4xl text-gray-400">{category.label}</span>
              <div className="flex flex-row items-center justify-start flex-wrap">
                {category.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    tag={tag}
                    parameters={props.parameters}
                    setParameters={props.setParameters}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;
