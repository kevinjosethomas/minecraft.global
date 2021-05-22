import StandardLayout from "../../../layouts/Standard";

function NewServer(props) {
  return (
    <StandardLayout footer={false}>
      <div className="flex flex-col items-center justify-center w-full px-10 lg:px-20 2xl:px-56 py-40 bg-dark-80">
        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-5xl text-gray-300">Server Details</h1>
          </div>
          <div className="flex flex-row items-start justify-start">
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="flex flex-row items-center justify-center w-10 h-10 bg-olive-70 rounded-full">
                <span className="font-semibold text-lg text-gray-300">1</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-2 h-2 rounded-full bg-dark-60" />
                <div className="w-2 h-2 rounded-full bg-dark-60" />
                <div className="w-2 h-2 rounded-full bg-dark-60" />
              </div>
              <div className="flex flex-row items-center justify-center w-10 h-10 bg-dark-60 rounded-full">
                <span className="font-semibold text-lg text-gray-500">2</span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-2 h-2 rounded-full bg-dark-60" />
                <div className="w-2 h-2 rounded-full bg-dark-60" />
                <div className="w-2 h-2 rounded-full bg-dark-60" />
              </div>
              <div className="flex flex-row items-center justify-center w-10 h-10 bg-dark-60 rounded-full">
                <span className="font-semibold text-lg text-gray-500">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export default NewServer;
