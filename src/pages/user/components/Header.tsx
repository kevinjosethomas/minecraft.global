type HeaderProps = {
  isLoading: boolean;
  avatar: string;
  user: Record<string, any>;
};

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full p-6 md:p-10 bg-dark-800 border-2 border-gray-800 rounded overflow-hidden">
      <div className="flex flex-row items-start justify-start space-x-4">
        {props.isLoading ? null : (
          <img src={props.avatar} alt={props.user.name} draggable={false} />
        )}
        <div className="flex flex-col items-start justify-center">
          {props.isLoading ? null : (
            <span className="font-bold text-4xl text-gray-300">{props.user.name}</span>
          )}
          {props.isLoading ? null : (
            <span className="max-w-xl font-medium text-xl text-gray-400">
              {props.user.description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
