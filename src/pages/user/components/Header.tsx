import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

import { Server } from "lib/types";

type HeaderProps = {
  isLoading: boolean;
  avatar: string;
  user: Record<string, any>;
};

function Header(props: HeaderProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full p-6 md:p-10 bg-dark-800 border-2 border-gray-800 rounded overflow-hidden">
      <ReactTooltip
        effect="solid"
        className="!bg-dark-600 !border-2 !border-gray-800 !text-gray-300 !font-medium"
      />
      <div className="flex flex-row items-start justify-start space-x-4">
        {props.isLoading ? null : (
          <img src={props.avatar} alt={props.user.name} draggable={false} />
        )}
        <div className="flex flex-col items-start justify-center">
          {props.isLoading ? null : (
            <div className="flex flex-row items-center justify-start space-x-2">
              <span className="font-bold text-4xl text-gray-300">{props.user.name}</span>
              {props.user.permissions >= 8 && (
                <i
                  className="fad fa-tools fa-opacity-60 text-2xl text-yellow-600"
                  data-tip="Staff"
                />
              )}
              {props.user.permissions >= 6 && (
                <i className="fad fa-badge-check text-2xl text-blue-500" data-tip="Partner" />
              )}
              {props.user.servers.some((server: Server) => server.premium) && (
                <i className="fad fa-diamond text-2xl text-olive-500" data-tip="Premium" />
              )}
            </div>
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
