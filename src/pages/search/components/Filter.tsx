import Checkbox from "./Checkbox";

type FilterProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
};

function Filter(props: FilterProps): JSX.Element {
  const filter = [
    {
      id: 1,
      label: "Online",
      selected: props.parameters.online,
      onClick: () => props.setParameters({ ...props.parameters, online: !props.parameters.online }),
    },
    {
      id: 2,
      label: "Premium",
      selected: props.parameters.premium,
      onClick: () =>
        props.setParameters({ ...props.parameters, premium: !props.parameters.premium }),
    },
    {
      id: 3,
      label: "Whitelisted",
      selected: props.parameters.whitelisted,
      onClick: () =>
        props.setParameters({ ...props.parameters, whitelisted: !props.parameters.whitelisted }),
    },
    {
      id: 4,
      label: "Bedrock",
      selected: props.parameters.bedrock,
      onClick: () =>
        props.setParameters({ ...props.parameters, bedrock: !props.parameters.bedrock }),
    },
    {
      id: 5,
      label: "Cracked",
      selected: props.parameters.cracked,
      onClick: () =>
        props.setParameters({ ...props.parameters, cracked: !props.parameters.cracked }),
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-bold text-4xl text-gray-300">Filter</span>
      <div className="flex flex-col items-start justify-center space-y-2">
        {filter.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            label={checkbox.label}
            selected={checkbox.selected}
            onClick={checkbox.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Filter;
