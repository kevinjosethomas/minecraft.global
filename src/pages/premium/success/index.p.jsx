import Link from "next/link";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function PremiumSuccess(props) {
  return (
    <Default user={props.user} search>
      <div className="relative flex w-full flex-col">
        <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center space-y-4">
          <p className="max-w-2xl select-none text-center text-6xl font-bold text-white">
            Thanks for purchasing premium!{" "}
            <img
              alt="Heart"
              src="/images/heart.png"
              className="inline w-10"
              draggable="false"
            />
          </p>
          <Link href={`/server/${props.id}/manage`}>
            <a className="flex select-none items-center justify-center rounded-lg bg-olive-700  px-6 py-3 transition duration-300 hover:bg-olive-800">
              <p className="text-2xl font-medium text-white">Manage Server</p>
            </a>
          </Link>
        </div>
        <img
          alt="Mobs"
          className="opacity-20"
          src="/images/illustrations/mobs.png"
        />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { server_id } = ctx.query;

    if (!server_id) {
      return {
        redirect: {
          destination: "/premium",
          permanent: false,
        },
      };
    }

    const [response, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {
          id: server_id,
        },
      };
    } else {
      return {
        props: {
          user: response,
          id: server_id,
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
