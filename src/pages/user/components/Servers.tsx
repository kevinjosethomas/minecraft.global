import ServerCard from "ui/components/ServerCard/ServerCard";

type ServersProps = {
  isLoading: boolean;
  user: Record<string, any>;
};

function Servers(props: ServersProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-start w-full p-6 md:p-10 bg-dark-800 border-2 border-gray-800 rounded overflow-hidden">
      <div className="grid grid-cols-3 w-full gap-x-5">
        {!props.isLoading &&
          props.user.servers.map((server: any) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
      </div>
    </div>
  );
}

export default Servers;
