import axios from "axios";
import cookie from "js-cookie";

async function editUser(id, name, description) {
  try {
    const { data } = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + `/user/${id}/edit`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          Authorization: cookie.get("token"),
        },
      }
    );
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default editUser;
