import getAuth from "../../../api/auth";
import StandardLayout from "../../../layouts/Standard";

function Vote(props) {
  return <StandardLayout></StandardLayout>;
}

export async function getServerSideProps(ctx) {
  const user = await getAuth(ctx.req, ctx.res);
  return {
    props: {
      user: user.payload,
    },
  };
}

export default Vote;
