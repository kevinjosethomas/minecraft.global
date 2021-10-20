import axios from "axios";

async function GetHomeResults() {
  // const auctions = axios.get(process.env.NEXT_PUBLIC_API + "/auctions/winners");
  // const growing = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=growth");
  const sponsored = axios.get(
    process.env.NEXT_PUBLIC_API + "/server/random/premium"
  );
  const popular = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=upvotes");
  const newly = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=4&sort=new");

  try {
    setTimeout(async () => {
      const data = await Promise.all([sponsored, popular, newly]);
      return [
        {
          sponsored: data[0].data.payload,
          popular: data[1].data.payload,
          newly: data[2].data.payload,
        },
        null,
      ];
    }, 100000);
  } catch (e) {
    return [null, e];
  }
}

export default GetHomeResults;
