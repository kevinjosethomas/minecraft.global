import axios from "axios";

async function newServer(data, token) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/server/new", data, {
      headers: {
        Authorization: token,
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export default newServer;
