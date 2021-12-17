const versions = [
  { id: 40, name: "1.18", checked: false },
  { id: 39, name: "1.17", checked: false },
  { id: 38, name: "1.16", checked: false },
  { id: 37, name: "1.15", checked: false },
  { id: 36, name: "1.14", checked: false },
  { id: 35, name: "1.13", checked: false },
  { id: 34, name: "1.12", checked: false },
  { id: 33, name: "1.11", checked: false },
  { id: 32, name: "1.10", checked: false },
  { id: 31, name: "1.9", checked: false },
  { id: 30, name: "1.8", checked: false },
  { id: 29, name: "1.7", checked: false },
];

const minigames = [
  { id: 1, name: "Parkour", checked: false },
  { id: 2, name: "Skywars", checked: false },
  { id: 3, name: "Bedwars", checked: false },
  { id: 4, name: "Spleef", checked: false },
  { id: 5, name: "Party Games", checked: false },
  { id: 7, name: "Build Battle", checked: false },
];

const features = [
  { id: 7, name: "Anti-Grief", checked: false },
  { id: 8, name: "Vanilla", checked: false },
  { id: 9, name: "Creative", checked: false },
  { id: 10, name: "Survival", checked: false },
  { id: 12, name: "Plots", checked: false },
  { id: 13, name: "Towny", checked: false },
  { id: 14, name: "Pixelmon", checked: false },
  { id: 15, name: "Tekkit", checked: false },
  { id: 16, name: "Roleplay", checked: false },
  { id: 17, name: "MCMMO", checked: false },
  { id: 18, name: "Economy", checked: false },
  { id: 19, name: "SkyBlock", checked: false },
  { id: 20, name: "PvP", checked: false },
  { id: 21, name: "Factions", checked: false },
  { id: 43, name: "HCF", checked: false },
  { id: 44, name: "Practice", checked: false },
];

const languages = [
  { id: 23, name: "English", checked: false },
  { id: 24, name: "Española", checked: false },
  { id: 25, name: "Türk", checked: false },
  { id: 26, name: "bahasa Indonesia", checked: false },
  { id: 27, name: "Ngôn ngữ tiếng Việt", checked: false },
  { id: 28, name: "Tagalog", checked: false },
];

const categories = [
  {
    label: "Versions",
    checked: false,
    tags: versions,
  },
  {
    label: "Minigames",
    checked: false,
    tags: minigames,
  },
  {
    label: "Features",
    checked: false,
    tags: features,
  },
  {
    label: "Languages",
    checked: false,
    tags: languages,
  },
];

export default categories;
