import { GetUserResults } from "api/user";
import Default from "ui/layouts/Default";

export default function User(props) {
  return <Default user={props.user}></Default>;
}

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;

  if (!id) {
    return {
      props: {
        error: 404,
      },
    };
  }

  const [response, error] = await GetUserResults(ctx, id);

  if (error) {
    console.log(error);
    return {
      props: {
        error: error?.response.status || 500,
      },
    };
  }

  if (response[1]) {
    console.log(response[1]);
    return {
      props: {
        error: response[1]?.response.status || 500,
      },
    };
  }

  if (response.user[1]) {
    return {
      props: {
        userinfo: response[0].userinfo,
      },
    };
  }

  return {
    props: {
      user: response.user[0].payload,
      userinfo: response.userinfo,
    },
  };
}
