const versions = [
  { id: 0, name: "1.17", checked: false },
  { id: 0, name: "1.16", checked: false },
  { id: 0, name: "1.15", checked: false },
  { id: 0, name: "1.14", checked: false },
  { id: 0, name: "1.13", checked: false },
  { id: 0, name: "1.12", checked: false },
  { id: 0, name: "1.11", checked: false },
  { id: 0, name: "1.10", checked: false },
  { id: 0, name: "1.9", checked: false },
  { id: 0, name: "1.8", checked: false },
  { id: 0, name: "1.7", checked: false },
];

const minigames = [
  { id: 0, name: "Parkour", checked: false },
  { id: 0, name: "Skywars", checked: false },
  { id: 0, name: "Bedwars", checked: false },
  { id: 0, name: "Spleef", checked: false },
  { id: 0, name: "Party Games", checked: false },
  { id: 0, name: "Build Battle", checked: false },
];

const features = [
  { id: 0, name: "Anti-Grief", checked: false },
  { id: 0, name: "Vanilla", checked: false },
  { id: 0, name: "Creative", checked: false },
  { id: 0, name: "Plots", checked: false },
  { id: 0, name: "Towny", checked: false },
  { id: 0, name: "Pixelmon", checked: false },
  { id: 0, name: "Tekkit", checked: false },
  { id: 0, name: "Roleplay", checked: false },
  { id: 0, name: "MCMMO", checked: false },
  { id: 0, name: "Economy", checked: false },
  { id: 0, name: "Skyblock", checked: false },
  { id: 0, name: "PvP", checked: false },
  { id: 0, name: "Factions", checked: false },
];

const languages = [
  { id: 0, name: "English", checked: false },
  { id: 0, name: "Española", checked: false },
  { id: 0, name: "Türk", checked: false },
  { id: 0, name: "bahasa Indonesia", checked: false },
  { id: 0, name: "Vietnamese", checked: false },
  { id: 0, name: "Tagalog", checked: false },
];

const categories = [
  {
    id: 1,
    name: "versions",
    label: "Versions",
    checked: false,
    tags: versions,
  },
  {
    id: 2,
    name: "minigames",
    label: "Minigames",
    checked: false,
    tags: minigames,
  },
  {
    id: 3,
    name: "features",
    label: "Features",
    checked: false,
    tags: features,
  },
  {
    id: 4,
    name: "languages",
    label: "Languages",
    checked: false,
    tags: languages,
  },
];

export default categories;
