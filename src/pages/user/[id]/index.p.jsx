import { GetUserByID } from "api/user";
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
      <div className="flex flex-col items-center justify-center w-full space-y-8">
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
    const id = ctx.query.id;

    if (!id) {
      return {
        props: {
          error: 404,
        },
      };
    }

    const user = GetLoggedInUser(ctx);
    const page = GetUserByID(id);
    const data = GetDefaultData(ctx);

    const responses = await Promise.all([user, page, data]);

    const userdata = responses[0];
    const pagedata = responses[1];
    const defaultdata = responses[2];

    if (pagedata[1]) {
      return {
        props: {
          error: pagedata[1].response?.status || 500,
        },
      };
    }

    if (defaultdata[1]) {
      return {
        props: {
          error: defaultdata[1].response?.status || 500,
        },
      };
    }

    if (userdata[1]) {
      return {
        props: {
          userinfo: pagedata[0],
          defaultResults: defaultdata[0],
        },
      };
    } else {
      return {
        props: {
          user: userdata[0],
          userinfo: pagedata[0],
          defaultResults: defaultdata[0],
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
