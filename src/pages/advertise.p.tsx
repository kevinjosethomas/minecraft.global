import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type AdvertiseProps = {
  user?: Record<string, any>;
};

function Advertise(props: AdvertiseProps): JSX.Element {
  return <Default background="bg-dark-700" user={props.user}></Default>;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    redirect: {
      destination: "https://discord.minecraft.global/",
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

export default Advertise;
