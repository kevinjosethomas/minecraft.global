import Radio from "./Radio";

type SortProps = {
  parameters: Record<string, any>;
  setParameters: CallableFunction;
};

function Sort(props: SortProps): JSX.Element {
  const sort = [
    {
      id: 1,
      label: "Players",
      selected: props.parameters.sort == "players",
      onClick: () => props.setParameters({ ...props.parameters, sort: "players" }),
    },
    {
      id: 2,
      label: "Upvotes",
      selected: props.parameters.sort == "upvotes",
      onClick: () => props.setParameters({ ...props.parameters, sort: "upvotes" }),
    },
    {
      id: 3,
      label: "Growth",
      selected: props.parameters.sort == "growth",
      onClick: () => props.setParameters({ ...props.parameters, sort: "growth" }),
    },
  ];

  return (
    <div className="flex flex-col items-start justify-center">
      <span className="font-bold text-4xl text-gray-300">Sort</span>
      <div className="flex flex-col items-start justify-center space-y-2">
        {sort.map((radio) => (
          <Radio
            key={radio.id}
            label={radio.label}
            selected={radio.selected}
            onClick={radio.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Sort;
