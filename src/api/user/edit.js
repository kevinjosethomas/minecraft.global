import axios from "axios";
import cookie from "js-cookie";

async function editUser(id, name, description) {
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

  return data;
}

export default editUser;
