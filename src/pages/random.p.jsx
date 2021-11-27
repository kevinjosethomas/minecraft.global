import { GetRandomServerID } from "api/server";

function Random() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark-800"></div>
  );
}

export async function getServerSideProps(ctx) {
  const [server_id, error] = await GetRandomServerID();

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
