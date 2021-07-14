import axios from "axios";

async function GetHomeResults() {
  const popular = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=3");
  const small = axios.get(process.env.NEXT_PUBLIC_API + "/search?amount=3");

  try {
    const data = await Promise.all([popular, small]);
    return [
      {
        popular: data[0].data.payload,
        small: data[1].data.payload,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
}

export default GetHomeResults;
