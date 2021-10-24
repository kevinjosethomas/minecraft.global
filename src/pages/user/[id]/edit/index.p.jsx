import Default from "ui/layouts/Default";
import { GetLoggedInUser } from "api/login";

export default function EditUser(props) {
  return <Default user={props.user}></Default>;
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
