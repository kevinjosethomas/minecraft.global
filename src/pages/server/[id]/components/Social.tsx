type Social = {
  icon: string;
  href: string;
};

function Social(props: Social): JSX.Element {
  return (
    <a
      className="flex flex-col items-center justify-center w-8 h-8 bg-dark-400 rounded border-2 border-gray-800"
      href={props.href}
      rel="nofolow noreferrer"
      target="_blank"
    >
      <i className={`${props.icon} text-gray-400`} />
    </a>
  );
}

export default Social;
