function Progress(props) {
  const firstFields = [
    Boolean(props.details.name),
    Boolean(props.details.address),
    Boolean(props.details.description),
  ];
  const firstCount = firstFields.filter((el) => el == true).length;

  const second = props.activeScreen.id >= 2;

  const third = props.activeScreen.id >= 3;

  return (
    <div className="flex flex-col items-center justify-center space-y-5 select-none">
      <div className="flex flex-row items-center justify-center w-10 h-10 bg-olive-70 rounded-full">
        <span className="font-semibold text-lg text-gray-300">1</span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div
          className={`w-2 h-2 rounded-full ${
            firstCount >= 1 || props.activeScreen.id > 1
              ? "bg-olive-70"
              : "bg-dark-60"
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full ${
            firstCount >= 2 || props.activeScreen.id > 1
              ? "bg-olive-70"
              : "bg-dark-60"
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full ${
            firstCount >= 3 || props.activeScreen.id > 1
              ? "bg-olive-70"
              : "bg-dark-60"
          }`}
        />
      </div>
      <div
        className={`flex flex-row items-center justify-center w-10 h-10 ${
          second ? "bg-olive-70" : "bg-dark-60"
        } rounded-full`}
      >
        <span
          className={`font-semibold text-lg ${
            second ? "text-gray-300" : "text-gray-500"
          }`}
        >
          2
        </span>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className={`w-2 h-2 rounded-full ${false ? "" : "bg-dark-60"}`} />
        <div className={`w-2 h-2 rounded-full ${false ? "" : "bg-dark-60"}`} />
        <div className={`w-2 h-2 rounded-full ${false ? "" : "bg-dark-60"}`} />
      </div>
      <div
        className={`flex flex-row items-center justify-center w-10 h-10 ${
          third ? "bg-olive-70" : "bg-dark-60"
        } rounded-full`}
      >
        <span
          className={`font-semibold text-lg ${
            third ? "text-gray-300" : "text-gray-500"
          }`}
        >
          3
        </span>
      </div>
    </div>
  );
}

export default Progress;
