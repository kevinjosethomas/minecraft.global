import axios from "axios";

const GetDefaultData = async (ctx) => {
  try {
    const popular = await axios.get(`${process.env.API_URL}/search?sort=upvotes&amount=9`);

    return [popular.data.payload.entries, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetDefaultData };
