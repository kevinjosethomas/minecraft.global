import { GetSearchResults } from "./search";

const GetDefaultData = async () => {
  const response = await GetSearchResults({
    amount: 6,
    sort: "upvotes",
    track_tags: false,
  });

  if (response[1]) {
    return response;
  } else {
    return [response[0].payload.entries, null];
  }
};

export { GetDefaultData };
