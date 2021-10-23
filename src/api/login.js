import axios from "axios";

const LoginWithDiscord = async (code) => {
  try {
    const response = await axios.get(
      `${process.env.LOCAL_API}/login/discord?code=${code}&dev=${process.env.DEV}`
    );
    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { LoginWithDiscord };
