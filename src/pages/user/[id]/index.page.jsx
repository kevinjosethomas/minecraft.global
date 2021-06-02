import { useQuery } from "react-query";
import { useRouter } from "next/router";

import getAuth from "../../../api/auth";
import getUser from "../../../api/user/[id]";
import StandardLayout from "../../../layouts/Standard";

function User(props) {
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(["User", id], () => getUser(id));

  if (error) {
    return "sus";
  }

  if (isLoading) {
    return "loading";
  }

  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-col items-center justify-start w-full h-full py-32 px-10 lg:px-20 2xl:px-56 bg-dark-80">
        <div className="flex flex-row items-center justify-start w-full space-x-6">
          <div className="flex flex-col items-center justify-center">
            <img
              src={
                data.payload.minecraft_uuid
                  ? `https://crafatar.com/avatars/${data.payload.minecraft_uuid}`
                  : "/images/default_user.png"
              }
              className="w-32"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h1 className="font-bold text-4xl text-gray-300">
              {data.payload.name}
            </h1>
            <p className="max-w-xs overflow-hidden text-xl text-gray-400">
              {data.payload.description}
            </p>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);
  return {
    props: {
      user: user.payload,
    },
  };
}

export default User;
