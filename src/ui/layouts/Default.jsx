import Navbar from "ui/components/Navbar/Navbar";
import Footer from "ui/components/Footer/Footer";
import SearchBox from "ui/components/SearchBox/SearchBox";

const Default = (props) => {
  return (
    <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 bg-gradient w-full h-full" />
      <div className="z-[1] flex flex-col items-center justify-start w-full md:w-1200 h-full space-y-10 px-4 md:px-0 pb-20 overflow-x-hidden">
        <Navbar user={props.user} />
        {props.search && <SearchBox header={props.header} defaultResults={props.defaultResults} />}
        <div className="flex flex-col items-start justify-start w-full h-full overflow-x-hidden">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Default;
