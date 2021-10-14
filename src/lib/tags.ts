const versions = [
  { id: 77, name: "1.17", checked: false },
  { id: 1, name: "1.16.5", checked: false },
  { id: 2, name: "1.16.4", checked: false },
  { id: 3, name: "1.16.3", checked: false },
  { id: 4, name: "1.16.1", checked: false },
  { id: 5, name: "1.16", checked: false },
  { id: 6, name: "1.15.2", checked: false },
  { id: 7, name: "1.15.1", checked: false },
  { id: 8, name: "1.15", checked: false },
  { id: 9, name: "1.14.4", checked: false },
  { id: 10, name: "1.14", checked: false },
  { id: 11, name: "1.13.2", checked: false },
  { id: 12, name: "1.13", checked: false },
  { id: 13, name: "1.12.2", checked: false },
  { id: 14, name: "1.12", checked: false },
  { id: 15, name: "1.11.2", checked: false },
  { id: 16, name: "1.11", checked: false },
  { id: 17, name: "1.10.2", checked: false },
  { id: 18, name: "1.10", checked: false },
  { id: 19, name: "1.9.4", checked: false },
  { id: 20, name: "1.9", checked: false },
  { id: 21, name: "1.8.9", checked: false },
  { id: 22, name: "1.8", checked: false },
];

const gamemodes = [
  { id: 26, name: "Pixelmon", checked: false },
  { id: 28, name: "Prison", checked: false },
  { id: 35, name: "Skyblock", checked: false },
  { id: 36, name: "Roleplay", checked: false },
  { id: 37, name: "Creative", checked: false },
  { id: 38, name: "Redstone", checked: false },
  { id: 39, name: "Anarchy", checked: false },
  { id: 41, name: "Survival", checked: false },
  { id: 42, name: "Adventure", checked: false },
  { id: 43, name: "SMP", checked: false },
  { id: 44, name: "FTB", checked: false },
  { id: 45, name: "Tekkit", checked: false },
  { id: 46, name: "Hardcore", checked: false },
  { id: 47, name: "Towny", checked: false },
  { id: 48, name: "Vanilla", checked: false },
  { id: 49, name: "Modded", checked: false },
  { id: 66, name: "RPG", checked: false },
  { id: 67, name: "Pokemon", checked: false },
];

const minigames = [
  { id: 70, name: "Arena", checked: false },
  { id: 24, name: "Parkour", checked: false },
  { id: 31, name: "KitPvP", checked: false },
  { id: 32, name: "Skywars", checked: false },
  { id: 33, name: "Bedwars", checked: false },
  { id: 34, name: "Spleef", checked: false },
  { id: 61, name: "Minigames", checked: false },
  { id: 62, name: "Hunger Games", checked: false },
  { id: 68, name: "Zombies", checked: false },
  { id: 79, name: "Guns", checked: false },
  { id: 80, name: "Magic", checked: false },
  { id: 81, name: "Medieval", checked: false },
];

const features = [
  { id: 23, name: "Puzzle", checked: false },
  { id: 25, name: "MCMMO", checked: false },
  { id: 27, name: "Economy", checked: false },
  { id: 40, name: "Plots", checked: false },
  { id: 29, name: "PvP", checked: false },
  { id: 30, name: "PvE", checked: false },
  { id: 69, name: "Anti-Grief", checked: false },
  { id: 71, name: "Fantasy", checked: false },
];

const languages = [
  { id: 72, name: "English", checked: false },
  { id: 57, name: "Italiana", checked: false },
  { id: 58, name: "Española", checked: false },
  { id: 59, name: "Français", checked: false },
  { id: 60, name: "Polskie", checked: false },
  { id: 73, name: "Türk", checked: false },
  { id: 74, name: "Pусский", checked: false },
  { id: 75, name: "Deutsche", checked: false },
  { id: 76, name: "中国人", checked: false },
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
    name: "gamemodes",
    label: "Gamemodes",
    checked: false,
    tags: gamemodes,
  },
  {
    id: 4,
    name: "features",
    label: "Features",
    checked: false,
    tags: features,
  },
  {
    id: 5,
    name: "languages",
    label: "Languages",
    checked: false,
    tags: languages,
  },
];

export default categories;
