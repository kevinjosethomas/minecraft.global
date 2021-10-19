import { GetServerSidePropsContext } from "next";

import { GetRandomServer } from "api/server";

function Random(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark-800">
      <img src="/images/loading.gif" alt="Loading" className="w-24" />
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const [server_id, error] = await GetRandomServer();

  if (error) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/server/${server_id}`,
        permanent: true,
      },
    };
  }
}

export default Random;
