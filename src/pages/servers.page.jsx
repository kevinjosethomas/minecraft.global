import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import getAuth from "../api/auth";
import categoriesData from "../assets/data/tags";
import StandardLayout from "../layouts/Standard";
import Tags from "../components/servers/tags/Tags";
import ServerList from "../components/servers/Servers";
import Refine from "../components/servers/refine/Refine";

function Servers(props) {
  const router = useRouter();

  const [page, setPage] = useState(parseInt(router.query.page || 1));
  const [params, setParams] = useState({
    amount: 12,
    offset: page * 12 - 12,
    query: "",
    sort: "players",
    online: true,
    premium: false,
    whitelisted: false,
    is_bedrock: false,
    tags: "",
  });

  const [categories, setCategories] = useState(categoriesData);

  useEffect(() => {
    const newPage = parseInt(router.query.page || 1);
    setPage(newPage);
    setParams({ ...params, offset: newPage * 12 - 12, query: router.query.q });
  }, [router.query.page, router.query.q]);

  useEffect(() => {
    const tags = [];
    categories
      .filter((category) => category.checked)
      .forEach((category) => {
        category.tags
          .filter((tag) => tag.checked)
          .forEach((tag) => tags.push(tag.name));
      });
    setParams({ ...params, tags: tags.join("+") });
  }, [categories]);

  return (
    <StandardLayout user={props.user}>
      <div className="flex flex-col items-center justify-center w-full py-16 bg-dark-80">
        <div className="flex flex-col items-start justify-start bg-dark-80 space-y-16">
          <Tags categories={categories} setCategories={setCategories} />
          <div className="flex flex-row items-start justify-center w-full 2xl:space-x-32">
            <Refine params={params} setParams={setParams} />
            <ServerList page={page} params={params} />
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

export default Servers;
