import axios from "axios";
import cookie from "js-cookie";

async function editServer(id, data) {
  try {
    const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/server/${id}/edit`, data, {
      headers: {
        Authorization: cookie.get("token"),
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export default editServer;
