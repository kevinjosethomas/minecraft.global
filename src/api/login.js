import axios from "axios";
import Cookies from "cookies";

const GetLoggedInUser = async (ctx, full) => {
  try {
    const cookies = new Cookies(ctx.req, ctx.res);
    let token = cookies.get("token");

    if (!token && ctx.query?.token) {
      token = ctx.query.token;
    } else if (!token) {
      return [null, 1];
    }

    const response = await axios.get(`${process.env.API_URL}/auth?full=${full || false}`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data.payload, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

const LoginWithDiscord = async (code) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/login/discord?code=${code}&dev=${process.env.NEXT_PUBLIC_DEV}`
    );

    return [response.data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

const LoginWithGoogle = async (token) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/login/google`, {
      headers: {
        Authorization: token,
      },
    });

    return [response.data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export { GetLoggedInUser, LoginWithGoogle, LoginWithDiscord };
