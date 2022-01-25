import { FetchRandomServerID } from "api/server";

function Random() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-dark-800"></div>
  );
}

export async function getServerSideProps() {
  const [response, error] = await FetchRandomServerID();

  if (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/server/${response.payload}`,
      permanent: false,
    },
  };
}

export default Random;
