import Default from "ui/layouts/Default";
import { GetHomeResults } from "api/home";
import SearchBox from "ui/components/SearchBox/SearchBox";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Home(props) {
  return (
    <Default>
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <SearchBox defaultResults={props.popular} />
        <div className="flex flex-row items-start justify-center w-full space-x-8">
          <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
            {props.popular.map((server) => (
              <ServerCard key={server.server_id} {...server} />
            ))}
          </div>
          <div className="flex flex-col items-start justify-start min-w-[300px] h-96 bg-white bg-opacity-[0.06] rounded-[12px]"></div>
        </div>
      </div>
    </Default>
  );
}

export const getServerSideProps = async () => {
  const results = await GetHomeResults();

  if (results[1]) {
    console.log(results[1]);
    return {
      props: {
        error: results[1].response.status,
      },
    };
  }

  return {
    props: { ...results[0] },
  };
};
