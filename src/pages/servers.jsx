import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import getAuth from "../api/auth";
import StandardLayout from "../layouts/Standard";
import ServerList from "../components/servers/Servers";
import Refine from "../components/servers/refine/Refine";

function Servers(props) {
  const router = useRouter();

  const [page, setPage] = useState(parseInt(router.query.page || 1));
  const [params, setParams] = useState({
    amount: 12,
    offset: page * 12 - 12,
    query: "",
    sort: "upvotes",
    online: false,
    premium: false,
    whitelisted: false,
    bedrock_edition: false,
    cross_platform: false,
  });

  useEffect(() => {
    const newPage = parseInt(router.query.page || 1);
    setPage(newPage);
    setParams({ ...params, offset: newPage * 12 - 12 });
  }, [router.query.page]);

  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-row items-start justify-center w-full py-32 space-x-32 bg-dark-80">
        <Refine />
        <ServerList page={page} params={params} />
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
