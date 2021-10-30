export default function Modal(props) {
  return (
    <div
      className="z-50 fixed top-0 left-0 flex flex-row items-center justify-center w-screen h-screen bg-black bg-opacity-80"
      onClick={() => props.showModal(false)}
    >
      {props.children}
    </div>
  );
}
