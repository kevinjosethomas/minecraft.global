import axios from "axios";

async function GetServer(id: string) {
  try {
    const server = await axios.get(process.env.NEXT_PUBLIC_API + "/server/" + id);
    return [server.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

export { GetServer };
