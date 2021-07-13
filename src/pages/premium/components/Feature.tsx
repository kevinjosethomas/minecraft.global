type Feature = {
  icon: string;
  name: string;
  color: string;
};

function Feature(props: Feature): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <i className={`${props.icon} premium-icon text-lg ${props.color} text-center`} />
      <span className="font-medium text-lg text-gray-400">{props.name}</span>
    </div>
  );
}

export default Feature;
