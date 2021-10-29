import axios from "axios";

const SearchByQuery = async (query, amount, sort) => {
  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/search?query=${query}&sort=upvotes&amount=${amount}&sort=${sort || "upvotes"}`
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const SearchByTag = async (tag, amount, offset) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?tags=${encodeURIComponent(
        tag
      )}&amount=${amount}&offset=${offset || 0}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { SearchByQuery, SearchByTag };
