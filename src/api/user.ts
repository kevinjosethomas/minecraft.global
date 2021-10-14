import axios from "axios";

async function GetUser(id: string) {
  try {
    const user = await axios.get(process.env.NEXT_PUBLIC_API + "/user/" + id);
    return [user.data.payload, null];
  } catch (e) {
    return [null, e];
  }
}

export default GetUser;
