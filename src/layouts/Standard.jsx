import Navbar from "../components/core/Navbar";

function Standard(props) {
  return (
    <div className="flex flex-col items-center justify-start h-full overflow-x-hidden bg-dark-90 bg-opacity-95">
      <Navbar />
      {props.children}
    </div>
  );
}

export default Standard;
