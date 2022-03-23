import Default from "ui/layouts/Default";
import Servers from "./components/Servers";
import Players from "./components/Players";
import { GetLoggedInUser } from "api/login";

export default function Why(props) {
  return (
    <Default user={props.user} search>
      <div className="grid w-full grid-rows-2 items-start justify-center gap-y-5 md:grid-cols-2 md:grid-rows-none md:gap-y-0 md:gap-x-10">
        <Players />
        <Servers />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const [response, error] = await GetLoggedInUser(ctx);

    if (error) {
      return {
        props: {},
      };
    } else {
      return {
        props: {
          user: response,
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
