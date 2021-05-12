import Navbar from "../components/core/Navbar";
import Footer from "../components/core/Footer";

function Standard(props) {
  return (
    <div className="flex flex-col items-center justify-start h-full overflow-x-hidden">
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}

export default Standard;
