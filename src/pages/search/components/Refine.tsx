import Sort from "./Sort";
import Tags from "./Tags";
import Filter from "./Filter";

type RefineProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
  showTagsModal: CallableFunction;
};

function Refine(props: RefineProps): JSX.Element {
  return (
    <div className="sticky top-10 flex flex-col items-start justify-center w-80 p-8 space-y-6 bg-dark-800 rounded">
      <span className="sticky font-bold text-5xl text-gray-300">Refine</span>
      <div className="flex flex-col items-start justify-center space-y-8">
        <Sort parameters={props.parameters} setParameters={props.setParameters} />
        <Filter parameters={props.parameters} setParameters={props.setParameters} />
        <Tags
          parameters={props.parameters}
          setParameters={props.setParameters}
          showTagsModal={props.showTagsModal}
        />
      </div>
    </div>
  );
}

export default Refine;
