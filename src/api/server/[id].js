import axios from "axios";

async function getServer(id) {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/server/${id}`
  );

  return data;
}

export default getServer;
