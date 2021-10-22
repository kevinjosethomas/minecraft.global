import axios from "axios";

const SearchByQuery = async (query, limit) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}&limit=${limit}`
    );

    return [response.data.payload, null];
  } catch (e) {
    return [null, e];
  }
};

export { SearchByQuery };
