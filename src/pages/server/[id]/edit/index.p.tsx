import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type EditServerProps = {
  user?: Record<string, any>;
};

function EditServer(props: EditServerProps): JSX.Element {
  return <Default background="bg-dark-700" user={props.user}></Default>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [user, error] = await GetLoggedInUser(ctx);

  if (error) {
    return {
      props: {},
    };
  } else {
    return {
      props: {
        user: user.payload,
      },
    };
  }
}

export default EditServer;
