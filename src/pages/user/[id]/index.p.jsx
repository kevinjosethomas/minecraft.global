import Header from "./components/Header";
import Default from "ui/layouts/Default";
import { GetUserResults } from "api/user";

export default function User(props) {
  const avatar = props.userinfo.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.userinfo.minecraft_uuid}?size=128`
    : "/images/steve.png";

  return (
    <Default user={props.user}>
      <div className="flex flex-col items-center justify-center w-full">
        <Header avatar={avatar} {...props.userinfo} user={props.user} />
      </div>
    </Default>
  );
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
