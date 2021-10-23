import axios from "axios";
import { GetLoggedInUser } from "./login";

const GetUserResults = async (ctx, id) => {
  try {
    const user = GetLoggedInUser(ctx);
    const userinfo = axios.get(`${process.env.API_URL}/user/${id}`);

    const responses = await Promise.all([user, userinfo]);

    return [
      {
        user: responses[0],
        userinfo: responses[1].data.payload,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
};

export { GetUserResults };
