import axios from "axios";
import cookie from "js-cookie";

async function newServer(data) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/server/new", data, {
      headers: {
        Authorization: cookie.get("token"),
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export default newServer;
