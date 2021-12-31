import { FetchRandomServerID } from "api/server";

function Random() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-dark-800"></div>
  );
}

export async function getServerSideProps() {
  const [response, error] = await FetchRandomServerID();

  if (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    redirect: {
      destination: `/server/${response.payload}`,
      permanent: true,
    },
  };
}

export default Random;
