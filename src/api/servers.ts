import axios from "axios";

async function GetServers() {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API + `/servers`);
    return [data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

export default GetServers;
