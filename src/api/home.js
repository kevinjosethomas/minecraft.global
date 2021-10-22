import axios from "axios";

const GetHomeResults = async () => {
  try {
    const popular = axios.get(`${process.env.API_URL}/search?sort=upvotes&amount=9`);
    const active = axios.get(`${process.env.API_URL}/search?sort=players&amount=9`);

    const responses = await Promise.all([popular, active]);

    return [
      {
        popular: responses[0].data.payload.entries,
        active: responses[1].data.payload.entries,
      },
      null,
    ];
  } catch (e) {
    return [null, e];
  }
};

export { GetHomeResults };
