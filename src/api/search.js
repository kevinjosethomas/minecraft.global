import axios from "axios";

const GetSearchResults = async (parameters) => {
  try {
    const params = new URLSearchParams(parameters);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/servers/search?${params.toString()}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { GetSearchResults };
