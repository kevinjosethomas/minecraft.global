import Sort from "../components/Sort";
import Tags from "../components/Tags";
import Filter from "../components/Filter";

type RefineModalProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
  showRefineModal: CallableFunction;
  showTagsModal: CallableFunction;
};

function RefineModal(props: RefineModalProps): JSX.Element {
  return (
    <div
      className="fixed flex xl:hidden flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-40 overflow-y-hidden"
      onClick={() => props.showRefineModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-5 xl:space-y-10 max-w-xs md:max-w-3xl xl:max-w-6xl max-h-[40rem] md:max-h-[30rem] bg-dark-800 border-2 border-gray-800 rounded overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="sticky font-bold text-5xl text-gray-300">Refine</span>
        <div className="flex flex-col items-start justify-center space-y-8 md:pr-96">
          <Sort parameters={props.parameters} setParameters={props.setParameters} />
          <Filter parameters={props.parameters} setParameters={props.setParameters} />
          <Tags
            parameters={props.parameters}
            setParameters={props.setParameters}
            showTagsModal={props.showTagsModal}
          />
        </div>
      </div>
    </div>
  );
}

export default RefineModal;
