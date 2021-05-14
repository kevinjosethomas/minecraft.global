const refineOptions = {
  sort: [
    {
      id: 1,
      name: "upvotes",
      label: "Upvotes",
      checked: false,
    },
    {
      id: 2,
      name: "players",
      label: "Online Players",
      checked: true,
    },
  ],
  filter: [
    {
      id: 1,
      name: "online",
      label: "Online",
      checked: true,
    },
    {
      id: 2,
      name: "premium",
      label: "Premium",
      checked: false,
    },
    {
      id: 3,
      name: "whitelisted",
      label: "Whitelisted",
      checked: false,
    },
    {
      id: 4,
      name: "bedrock_edition",
      label: "Bedrock Edition",
      checked: false,
    },
    {
      id: 5,
      name: "cross_platform",
      label: "Cross Platform",
      checked: false,
    },
  ],
};

export default refineOptions;
