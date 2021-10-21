import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type BlogProps = {
  user?: Record<string, any>;
};

function Blog(props: BlogProps): JSX.Element {
  return <Default background="bg-dark-700" user={props.user}></Default>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: "https://minecraft.global/blog/how-to-setup-votifier",
      permanent: true,
    },
  };

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

export default Blog;
