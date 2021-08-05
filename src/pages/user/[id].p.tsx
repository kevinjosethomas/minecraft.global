import { useQuery } from "react-query";
import { GetServerSidePropsContext } from "next";

import GetUser from "api/user";
import GetLoggedInUser from "api/auth";
import Header from "./components/Header";
import Default from "ui/layouts/Default";
import Servers from "./components/Servers";

type User = {
  id: string;
  user?: Record<string, any>;
};

function User(props: User): JSX.Element {
  const { isLoading, data } = useQuery(["User", props.id], async () => GetUser(props.id));

  let user: any = data;
  let avatar: string = "";
  if (!isLoading) {
    user = (data as any)[0];
    avatar = user.minecraft_uuid
      ? `https://crafatar.com/avatars/${user.minecraft_uuid}?size=128`
      : "/images/steve.png";
  }

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-center justify-center w-full space-y-12">
        <Header isLoading={isLoading} user={user} avatar={avatar} />
        <Servers isLoading={isLoading} user={user} />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id;
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {
        id: id,
      },
    };
  } else {
    return {
      props: {
        user: user.payload,
        id: id,
      },
    };
  }
}

export default User;
