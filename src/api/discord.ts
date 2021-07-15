import axios from "axios";

async function LoginWithDiscord(code: string) {
  try {
    // TODO TOMORROW: should send v1 query parameter so backend can change redirect URL
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API + `/login/discord?code=${code}&v1=true`
    );
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

export default LoginWithDiscord;
