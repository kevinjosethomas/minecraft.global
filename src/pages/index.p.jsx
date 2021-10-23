import Link from "next/link";

import Default from "ui/layouts/Default";
import { GetHomeResults } from "api/home";
import SearchBox from "ui/components/SearchBox/SearchBox";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Home(props) {
  return (
    <Default user={props.user}>
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <SearchBox defaultResults={props.popular} />
        <div className="flex flex-row items-start justify-center w-full space-x-8">
          <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
            {props.popular.slice(0, 4).map((server, index) => (
              <ServerCard key={server.server_id} index={index} {...server} animate />
            ))}
          </div>
          <div className="flex flex-col items-start justify-start min-w-[400px] max-w-[400px]">
            <div className="flex flex-col items-start justify-start w-full p-5 space-y-4 bg-white bg-opacity-[0.06] rounded-[12px]">
              <h3 className="text-[24px] text-white text-opacity-80 leading-tight">
                Get thousands of page views everyday by renting an ad spot on the front page!
              </h3>
              <Link href="/advertise">
                <a className="flex flex-row items-center justify-center w-full py-2 bg-olive-800 bg-opacity-50 hover:bg-opacity-70 transition duration-300 rounded">
                  <span className="text-[24px] text-white text-opacity-90 leading-tight">
                    See Options
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  const results = await GetHomeResults(ctx);

  if (results[1]) {
    console.log(results[1]);
    return {
      props: {
        error: results[1].response.status || 500,
      },
    };
  }

  if (results[0].user[1]) {
    return {
      props: {
        popular: results[0].popular,
        active: results[0].active,
      },
    };
  }

  return {
    props: {
      user: results[0].user[0].payload,
      popular: results[0].popular,
      active: results[0].active,
    },
  };
}
