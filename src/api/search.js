import axios from "axios";

const SearchByTag = async (tag, parameters) => {
  try {
    const params = new URLSearchParams({
      ...parameters,
      tags: encodeURIComponent(tag),
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?${params.toString()}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

const GetSearchResults = async (parameters) => {
  try {
    const params = new URLSearchParams(parameters);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/search?${params.toString()}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
};

export { SearchByTag, GetSearchResults };
