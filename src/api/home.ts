import axios from "axios";

async function GetHomeResults() {
  // const auctions = axios.get(process.env.NEXT_PUBLIC_API + "/auctions/winners");
  const popular = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=players");
  const growing = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=growth");
  const newly = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=new");

  try {
    const data = await Promise.all([popular, growing, newly]);
    return [
      {
        popular: data[0].data.payload,
        growing: data[1].data.payload,
        newly: data[2].data.payload,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
}

export default GetHomeResults;
