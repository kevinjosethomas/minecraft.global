import { useQuery } from "react-query";
import { GetServerSidePropsContext } from "next";

import GetHomeResults from "api/home";
import GetLoggedInUser from "api/auth";
import Default from "ui/layouts/Default";
import Listing from "./home/components/Listing";
import Searchbox from "ui/components/Searchbox/Searchbox";

type Home = {
  user?: object;
};

function Home(props: Home): JSX.Element {
  const { isLoading, error, data } = useQuery(["HomeResults"], GetHomeResults);

  return (
    <Default background="bg-dark-700" user={props.user}>
      <div className="flex flex-col items-center justify-center w-full space-y-12 md:space-y-20">
        <Searchbox />
        <div className="flex flex-col items-center justify-center w-full space-y-12">
          <Listing
            title="Popular Servers"
            subtitle="The most active servers right now!"
            icon="far fa-stars"
            data={isLoading ? null : (data as any[])[0].popular.entries}
          />
          <Listing
            title="Growing Servers"
            subtitle="New and growing Minecraft servers!"
            icon="far fa-seedling"
            data={isLoading ? null : (data as any[])[0].small.entries}
          />
        </div>
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

export default Home;
