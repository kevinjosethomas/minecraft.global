import { FetchUser } from "api/user";
import Header from "./components/Header";
import Default from "ui/layouts/Default";
import { GetDefaultData } from "api/core";
import Servers from "./components/Servers";
import { GetLoggedInUser } from "api/login";

export default function User(props) {
  const avatar = props.userinfo.minecraft_uuid
    ? `https://crafatar.com/avatars/${props.userinfo.minecraft_uuid}?size=128&overlay`
    : "/images/steve.png";

  return (
    <Default
      user={props.user}
      defaultResults={props.defaultResults}
      title={`${props.userinfo.name} - Minecraft Server List`}
      search
    >
      <div className="flex w-full flex-col items-center justify-center space-y-8">
        <Header avatar={avatar} {...props.userinfo} user={props.user} />
        <Servers
          {...props.userinfo}
          user={props.user}
          name={props.userinfo.name}
          created_at={props.userinfo.created_at}
          minecraft_uuid={props.userinfo.minecraft_uuid}
          servers={props.userinfo.servers}
        />
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const id = ctx.params.id;

    const [user, page, data] = await Promise.all([
      GetLoggedInUser(ctx),
      FetchUser(id),
      GetDefaultData(),
    ]);

    if (data[1]) {
      return {
        props: {
          error: data[1].response?.status || 500,
        },
      };
    }

    if (page[1]) {
      return {
        props: {
          error: page[1].response?.status || 500,
        },
      };
    }

    if (user[1]) {
      return {
        props: {
          userinfo: page[0],
          defaultResults: data[0],
        },
      };
    } else {
      return {
        props: {
          user: user[0],
          userinfo: page[0],
          defaultResults: data[0],
        },
      };
    }
  } catch (e) {
    return {
      props: {
        error: 500,
      },
    };
  }
}
