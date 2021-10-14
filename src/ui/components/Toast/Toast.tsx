type ToastProps = {
  icon: string;
  title: string;
  subtitle: string;
};

function Toast(props: ToastProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center py-3 px-4 space-x-2 bg-dark-800 border-2 border-gray-800 rounded">
      <i className={`${props.icon} text-4xl`} />
      <div className="flex flex-col items-start justify-center">
        <span className="font-bold text-gray-400">{props.title}</span>
        <span className="font-medium text-sm text-gray-500">{props.subtitle}</span>
      </div>
    </div>
  );
}

export default Toast;
