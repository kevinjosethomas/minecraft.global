import Sort from "./Sort";
import Filter from "./Filter";

function Modal(props) {
  return (
    <div className="fixed flex 2xl:hidden flex-col items-center justify-evenly w-screen h-screen top-0 left-0 z-40 px-16 bg-dark-80">
      <div className="flex flex-col items-start justify-center w-full space-y-5">
        <span className="font-bold text-4xl text-gray-300">Refine</span>
        <div className="flex flex-col items-start justify-center space-y-4">
          <Sort options={props.options} setOptions={props.setOptions} />
          <Filter options={props.options} setOptions={props.setOptions} />
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full py-2 bg-olive-60 hover:bg-olive-70 rounded cursor-pointer"
        onClick={props.closeModal}
      >
        <span className="font-bold text-lg text-gray-300">Close Menu</span>
      </div>
    </div>
  );
}

export default Modal;
