import ServerCard from "ui/components/ServerCard/ServerCard";

type ServersProps = {
  isLoading: boolean;
  user: Record<string, any>;
};

function Servers(props: ServersProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full md:p-10 md:bg-dark-800 md:border-2 md:border-gray-800 md:rounded overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-10 xl:gap-y-16 2xl:gap-y-0 justify-items-center w-full">
        {!props.isLoading &&
          props.user.servers.map((server: any) => (
            <ServerCard key={server.server_id} {...server} user={props.user} />
          ))}
      </div>
    </div>
  );
}

export default Servers;
