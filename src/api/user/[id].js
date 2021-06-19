import axios from "axios";

async function getUser(id) {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/user/${id}`
  );

  return data;
}

export default getUser;
