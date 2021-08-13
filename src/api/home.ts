import axios from "axios";

async function GetHomeResults() {
  const auctions = axios.get(process.env.NEXT_PUBLIC_API + "/auctions/winners");
  const popular = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=3");
  const small = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=3");

  try {
    const data = await Promise.all([auctions, popular, small]);
    return [
      {
        auctions: data[0].data.payload,
        popular: data[1].data.payload,
        small: data[2].data.payload,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
}

export default GetHomeResults;
