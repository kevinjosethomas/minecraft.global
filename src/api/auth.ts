import axios from "axios";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

async function GetLoggedInUser(ctx: GetServerSidePropsContext) {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    let token = cookies.get("token");

    if (!token && ctx.query?.token) {
      token = ctx.query.token as string;
    } else if (!token) {
      return [null, 1];
    }

    const { data } = await axios.get(process.env.NEXT_PUBLIC_API + "/auth", {
      headers: {
        Authorization: token,
      },
    });

    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default GetLoggedInUser;
