import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import { GetLoggedInUser } from "api/login";
import { GetSearchResults } from "api/search";

export default function Search(props) {
  return <Default user={props.user} defaultResults={props.defaultResults} search></Default>;
}

export async function getServerSideProps(ctx) {
  try {
    const [user, data, search] = await Promise.all([
      GetLoggedInUser(ctx),
      GetDefaultData(ctx),
      GetSearchResults({ query: ctx.params?.query || "", amount: 12 }),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (search[1]) {
      return {
        props: {
          error: search[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          search: search[0],
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          search: search[0],
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
