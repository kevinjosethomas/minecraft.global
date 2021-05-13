import getAuth from "../api/auth";
import StandardLayout from "../layouts/Standard";
import ServerList from "../components/servers/Servers";
import Refine from "../components/servers/refine/Refine";

function Servers(props) {
  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-row items-start justify-center w-full py-32 space-x-32 bg-dark-80">
        <Refine />
        <ServerList />
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

export default Servers;
