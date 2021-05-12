import axios from "axios";

async function getServers(amount, offset) {
  amount = amount != null ? amount : 10;
  offset = offset != null ? offset : 0;

  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      `/servers?amount=${amount}&offset=${offset}`,
    { withCredentials: true }
  );

  return data;
}

export default getServers;
