import axios from "axios";

async function LoginWithDiscord(code: string) {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API + `/login/discord?code=${code}`);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default LoginWithDiscord;
