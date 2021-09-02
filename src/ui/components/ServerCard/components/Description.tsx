type DescriptionProps = {
  description: string;
};

function Description(props: DescriptionProps): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-start">
      <span className="font-medium text-sm 2xl:text-base text-gray-400">{props.description}</span>
    </div>
  );
}

export default Description;
