import Navbar from "ui/components/Navbar/Navbar";

type Default = {
  children: React.ReactNode;
};

const Default = (props: Default): JSX.Element => {
  return (
    <div className="flex flex-col items-start justify-start w-full h-full overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col items-start justify-start w-full h-full p-20 bg-dark-700">
        {props.children}
      </div>
    </div>
  );
};

export default Default;
