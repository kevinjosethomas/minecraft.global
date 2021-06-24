import axios from "axios";
import Cookies from "cookies";

async function getAuth(req, res) {
  try {
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + `/auth`,
      {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      }
    );

    return [data, token];

    return data;
  } catch (e) {
    return { payload: null };
  }
}

export default getAuth;
