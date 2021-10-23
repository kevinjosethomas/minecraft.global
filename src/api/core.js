import axios from "axios";
import { GetLoggedInUser } from "./login";

const GetDefaultData = async (ctx) => {
  try {
    const user = GetLoggedInUser(ctx);
    const popular = axios.get(`${process.env.API_URL}/search?sort=upvotes&amount=9`);

    const responses = await Promise.all([user, popular]);

    return [
      {
        user: responses[0],
        popular: responses[1].data.payload.entries,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
};

export { GetDefaultData };
