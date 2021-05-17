function Advertisement(props) {
  return (
    <div className="flex flex-col items-center justify-between w-80 md:w-124 lg:w-112 xl:w-124 2xl:w-112 3xl:w-124 h-72 bg-dark-70 overflow-hidden rounded-xl border-2 border-olive-60 transform hover:scale-[1.02] duration-500">
      <div className="flex flex-col items-start justify-start w-full h-23/30 p-8 space-y-4">
        <div className="flex flex-row items-center justify-start w-full space-x-4 select-none">
          <div className="relative flex flex-col items-center justify-center">
            <img
              src={props.icon_url || "/images/default_favicon.png"}
              className="w-12 md:w-24 min-w-[3rem] md:min-w-[6rem] rounded-full server-status-favicon"
              onError={(e) => (e.target.src = "/images/default_favicon.png")}
              draggable="false"
            />
          </div>
          <div className="flex flex-col items-start justify-center space-y-1">
            <div className="flex flex-col items-start justify-center">
              <h1 className="font-proxima font-bold md:text-xl text-gray-300">
                {props.name}
              </h1>
              <span className="font-proxima font-bold text-sm md:text-sm text-olive-60">
                SPONSORED
              </span>
            </div>
          </div>
        </div>
        <p className="font-medium text-xs md:text-sm text-gray-400">
          {props.description}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center w-full h-7/30 cursor-pointer select-none">
        <a href={props.url} target="_blank" className="flex flex-row items-center justify-center w-full h-full bg-white bg-opacity-[0.04]">
          <span className="font-proxima font-semibold text-lg md:text-xl text-gray-450">
            VIEW INFO
          </span>
        </a>
      </div>
    </div>
  );
}

export default Advertisement;
