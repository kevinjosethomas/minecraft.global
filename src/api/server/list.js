import axios from "axios";

async function getServerList(amount, offset) {
  amount = amount != null ? amount : 10;
  offset = offset != null ? offset : 0;

  console.log(amount, offset);

  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      `/servers?amount=${amount}&offset=${offset}`
  );

  return data;
}

export default getServerList;
