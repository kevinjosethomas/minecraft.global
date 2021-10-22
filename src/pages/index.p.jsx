import Default from "ui/layouts/Default";
import { GetHomeResults } from "api/home";
import SearchBox from "ui/components/SearchBox/SearchBox";

export default function Home() {
  return (
    <Default>
      <SearchBox />
      <div className="flex flex-row items-center justify-center w-full space-x-24">
        <div className="flex flex-col items-start justify-start w-full"></div>
        <div className="flex flex-col items-start justify-start min-w-[400px]"></div>
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
