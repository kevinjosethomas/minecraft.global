type Feature = {
  label: string;
};

function Feature(props: Feature): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center px-3 py-0.5 bg-dark-900 rounded-full">
      <span className="text-sm font-medium text-gray-400 select-none whitespace-nowrap">
        {props.label}
      </span>
    </div>
  );
}

export default Feature;
