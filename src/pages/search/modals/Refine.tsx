type RefineModalProps = {
  showRefineModal: CallableFunction;
};

function RefineModal(props: RefineModalProps): JSX.Element {
  return (
    <div
      className="fixed flex flex-col items-center justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75 z-40 overflow-y-hidden"
      onClick={() => props.showRefineModal(false)}
    >
      <div
        className="flex flex-col items-start justify-between p-10 space-y-10 max-w-6xl max-h-[40rem] bg-dark-800 border-2 border-gray-800 rounded overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
}

export default RefineModal;
