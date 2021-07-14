import ServerCard from "ui/components/ServerCard/ServerCard";

type Listing = {
  title: string;
  subtitle: string;
  icon: string;
  data: object[];
};

function Listing(props: Listing): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center w-full space-y-4">
      <div className="flex flex-row items-center justify-start space-x-4">
        <i className={`${props.icon} text-6xl text-olive-400`} />
        <div className="flex flex-col items-start justify-center">
          <span className="font-bold text-4xl text-gray-300">{props.title}</span>
          <span className="font-medium text-xl text-gray-400">{props.subtitle}</span>
        </div>
      </div>
      {props.data ? (
        <div className="grid grid-cols-3 w-full">
          {props.data.map((server: any) => (
            <ServerCard key={server.server_id} {...server} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Listing;
