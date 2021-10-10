import { GetServerSidePropsContext } from "next";

import { GetServer } from "api/server";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type ManageServerProps = {
  user?: Record<string, any>;
};

function ManageServer(props: ManageServerProps): JSX.Element {
  return <Default background="bg-dark-700" user={props.user}></Default>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = ctx.query.id;
  const [user, error] = await GetLoggedInUser(ctx);
  const [server, error2] = await GetServer(id as string);

  if (error2) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } else {
    if (error) {
      return {
        props: {
          id: id,
          server: server,
        },
      };
    } else {
      return {
        props: {
          user: user.payload,
          server: server,
          id: id,
        },
      };
    }
  }
}

export default ManageServer;
