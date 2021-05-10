import Navbar from "../components/core/Navbar";

function Standard(props) {
  return (
    <div className="flex flex-col items-center justify-start h-full overflow-x-hidden">
      <Navbar />
      {props.children}
    </div>
  );
}

export default Standard;
