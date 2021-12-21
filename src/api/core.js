import axios from "axios";

const GetDefaultData = async (ctx) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/servers/search?sort=upvotes&amount=6&track_tags=false`
    );

    return [response.data.payload.entries, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetDefaultData };
