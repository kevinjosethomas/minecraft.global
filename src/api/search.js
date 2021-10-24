import axios from "axios";

const SearchByQuery = async (query, amount) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}&sort=upvotes&amount=${amount}`
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

const SearchByTag = async (tag, amount) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?tags=${tag}&amount=${amount}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { SearchByQuery, SearchByTag };
