import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import ServerCard from "ui/components/ServerCard/ServerCard";

export default function Home(props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return (
    <Default user={props.user} defaultResults={props.defaultResults} search header>
      <div className="flex flex-col items-start justify-start w-full space-y-8">
        <div className="flex flex-row items-start justify-center w-full space-x-8">
          <div className="flex flex-col items-start justify-start w-full space-y-0.5 rounded-[12px] overflow-hidden">
            {props.defaultResults.slice(0, 4).map((server, index) => (
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
  try {
    const user = GetLoggedInUser(ctx);
    const data = GetDefaultData(ctx);

    const responses = await Promise.all([user, data]);

    const userdata = responses[0];
    const defaultdata = responses[1];

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
          defaultResults: defaultdata[0],
        },
      };
    }
  } catch (e) {
    console.log(e);
    return {
      props: {
        error: 500,
      },
    };
  }
}
