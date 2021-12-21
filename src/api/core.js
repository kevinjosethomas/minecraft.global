import GetSearchResults from "./search";

const GetDefaultData = async (ctx) => {
  const response = await GetSearchResults({
    amount: 6,
    sort: "upvotes",

    track_tahgs: false,
  });

  if (response[1]) {
    return response;
  } else {
    return [response[0].data.payload.entries, null];
  }
};

export { GetDefaultData };
