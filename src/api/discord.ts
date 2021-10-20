import axios from "axios";

async function LoginWithDiscord(code: string) {
  try {
    const { data } = await axios.get(
      process.env.LOCAL_API + `/login/discord?code=${code}&v1=${process.env.DEV}`
    );
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default LoginWithDiscord;
