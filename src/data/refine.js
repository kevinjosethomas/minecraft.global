const refineOptions = {
  sort: [
    {
      id: 1,
      name: "upvotes",
      label: "Upvotes",
      checked: true,
    },
    {
      id: 2,
      name: "online_players",
      label: "Online Players",
      checked: false,
    },
  ],
  filter: [
    {
      id: 1,
      name: "online",
      label: "Online",
      checked: false,
    },
    {
      id: 2,
      name: "premium",
      label: "Premium",
      checked: true,
    },
    {
      id: 3,
      name: "whitelisted",
      label: "Whitelisted",
      checked: false,
    },
    {
      id: 4,
      name: "bedrock",
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
