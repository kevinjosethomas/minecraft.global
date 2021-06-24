import axios from "axios";

async function editServer(id, data, token) {
  try {
    const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/server/${id}/edit`, data, {
      headers: {
        Authorization: token,
      },
    });
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}

export default editServer;
