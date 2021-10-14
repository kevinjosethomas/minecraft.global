type TagProps = {
  tag: string;
  icon?: string;
};

function Tag(props: TagProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center px-2 py-1 space-x-2 bg-dark-700 rounded">
      {props.icon && <i className={`${props.icon} text-sm text-gray-400`} />}
      <span className="text-sm font-medium text-gray-400 select-none whitespace-nowrap">
        {props.tag}
      </span>
    </div>
  );
}

export default Tag;
