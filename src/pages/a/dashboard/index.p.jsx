import Link from "next/link";
import Cookies from "cookies";

import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";
import Advertisements from "./components/Advertisements";
import { FetchUserAdvertisements } from "api/advertisements";

export default function Dashboard(props) {
  return (
    <Default
      user={props.user}
      title="Advertising Dashboard - Minecraft Server List"
    >
      <div className="flex w-full flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Link href="/a">
            <a className="group flex cursor-pointer space-x-2 rounded-lg bg-olive-700 px-5 py-2 transition duration-300 hover:bg-olive-800">
              <i className="far fa-arrow-left transform text-xl text-white duration-300 group-hover:-translate-x-0.5" />
              <p className="select-none text-xl text-white">Go Back</p>
            </a>
          </Link>
          <Link href="/a/banner?screen=products">
            <a className="flex cursor-pointer space-x-2 rounded-lg bg-olive-700 px-5 py-2 transition duration-300 hover:bg-olive-800">
              <i className="far fa-pencil-paintbrush transform text-xl text-white" />
              <p className="select-none text-xl text-white">Manage Products</p>
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-medium tracking-tight text-white md:text-5xl">
            Advertising Dashboard
          </h1>
          <p className="text-2xl text-white text-opacity-80">
            Watch all your advertisements and monitor their analytics
          </p>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <h2 className="text-4xl font-medium text-white">
            Upcoming Advertisements
          </h2>
          {props.slots.length ? (
            <Advertisements slots={props.slots} />
          ) : (
            <div className="flex w-full flex-row items-center justify-center space-x-8 space-y-1 rounded-lg border-2 border-olive-940 bg-olive-950 py-10">
              <img
                alt="Creeper"
                src="/images/creeper.png"
                className="w-64 saturate-100"
                draggable="false"
              />
              <p className="max-w-sm text-center text-3xl font-medium text-white">
                You have no ongoing or upcoming advertisements.{" "}
                <Link href="/a/banner">
                  <a className="cursor-pointer text-olive-300 underline">
                    Check availabilty
                  </a>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    const token = cookies.get("token");

    const [user, slots] = await Promise.all([
      GetLoggedInUser(ctx),
      FetchUserAdvertisements(token),
    ]);

    if (slots[1]) {
      return {
        props: {
          error: slots[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          slots: slots[0].payload,
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
