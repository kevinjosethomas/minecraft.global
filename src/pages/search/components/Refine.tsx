import Sort from "./Sort";

type RefineProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
};

function Refine(props: RefineProps): JSX.Element {
  return (
    <div className="sticky top-10 flex flex-col items-start justify-center w-80 p-8 space-y-5 bg-dark-800 rounded">
      <span className="sticky font-bold text-5xl text-gray-300">Refine</span>
      <Sort parameters={props.parameters} setParameters={props.setParameters} />
    </div>
  );
}

export default Refine;
