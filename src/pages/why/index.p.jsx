import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import Players from "./components/Players";
import { GetLoggedInUser } from "api/login";
import Servers from "./components/Servers";

export default function Why(props) {
  return (
    <Default user={props.user} defaultResults={props.defaultResults} search>
      <div className="grid w-full grid-rows-2 items-start justify-center gap-y-5 md:grid-cols-2 md:grid-rows-none md:gap-y-0 md:gap-x-10">
        <Players />
        <Servers />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          defaultResults: data[0],
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
