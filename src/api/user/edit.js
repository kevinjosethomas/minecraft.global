import axios from "axios";

async function editUser(id, name, description, token) {
  try {
    const { data } = await axios.put(
      process.env.NEXT_PUBLIC_API_URL + `/user/${id}/edit`,
      {
        name: name,
        description: description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default editUser;
