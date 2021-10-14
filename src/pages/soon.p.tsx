import { GetServerSidePropsContext } from "next";

import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";

type ComingSoonProps = {
  user?: Record<string, any>;
};

function ComingSoon(props: ComingSoonProps): JSX.Element {
  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-center justify-center w-full space-y-10">
        <img
          src="/images/illustration1.png"
          alt="Steve, Alex and Wolf with Pickaxe and Sword"
          draggable="false"
        />
        <span className="font-bold text-4xl md:text-6xl text-gray-300">Coming Soon</span>
      </div>
    </Default>
  );
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

export default ComingSoon;
