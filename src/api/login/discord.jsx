import axios from "axios";

async function getLoginDiscord(code) {
  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/login/discord?code=${code}`,
    { withCredentials: true }
  );

  return data.token;
}

export default getLoginDiscord;
