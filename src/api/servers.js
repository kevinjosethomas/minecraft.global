import axios from "axios";
import qs from "querystring";

async function getServers(params) {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/search?${qs.stringify(params)}`,
    { withCredentials: true }
  );

  return data;
}

export default getServers;
