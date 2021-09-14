const versions = [
  { id: 77, label: "1.17", checked: false },
  { id: 1, label: "1.16.5", checked: false },
  { id: 2, label: "1.16.4", checked: false },
  { id: 3, label: "1.16.3", checked: false },
  { id: 4, label: "1.16.1", checked: false },
  { id: 5, label: "1.16", checked: false },
  { id: 6, label: "1.15.2", checked: false },
  { id: 7, label: "1.15.1", checked: false },
  { id: 8, label: "1.15", checked: false },
  { id: 9, label: "1.14.4", checked: false },
  { id: 10, label: "1.14", checked: false },
  { id: 11, label: "1.13.2", checked: false },
  { id: 12, label: "1.13", checked: false },
  { id: 13, label: "1.12.2", checked: false },
  { id: 14, label: "1.12", checked: false },
  { id: 15, label: "1.11.2", checked: false },
  { id: 16, label: "1.11", checked: false },
  { id: 17, label: "1.10.2", checked: false },
  { id: 18, label: "1.10", checked: false },
  { id: 19, label: "1.9.4", checked: false },
  { id: 20, label: "1.9", checked: false },
  { id: 21, label: "1.8.9", checked: false },
  { id: 22, label: "1.8", checked: false },
];

const gamemodes = [
  { id: 26, label: "Pixelmon", checked: false },
  { id: 28, label: "Prison", checked: false },
  { id: 35, label: "Skyblock", checked: false },
  { id: 36, label: "Roleplay", checked: false },
  { id: 37, label: "Creative", checked: false },
  { id: 38, label: "Redstone", checked: false },
  { id: 39, label: "Anarchy", checked: false },
  { id: 41, label: "Survival", checked: false },
  { id: 42, label: "Adventure", checked: false },
  { id: 43, label: "SMP", checked: false },
  { id: 44, label: "FTB", checked: false },
  { id: 45, label: "Tekkit", checked: false },
  { id: 46, label: "Hardcore", checked: false },
  { id: 47, label: "Towny", checked: false },
  { id: 48, label: "Vanilla", checked: false },
  { id: 49, label: "Modded", checked: false },
  { id: 66, label: "RPG", checked: false },
  { id: 67, label: "Pokemon", checked: false },
];

const minigames = [
  { id: 70, label: "Arena", checked: false },
  { id: 24, label: "Parkour", checked: false },
  { id: 31, label: "KitPvP", checked: false },
  { id: 32, label: "Skywars", checked: false },
  { id: 33, label: "Bedwars", checked: false },
  { id: 34, label: "Spleef", checked: false },
  { id: 61, label: "Minigames", checked: false },
  { id: 62, label: "Hunger Games", checked: false },
  { id: 68, label: "Zombies", checked: false },
  { id: 79, label: "Guns", checked: false },
  { id: 80, label: "Magic", checked: false },
  { id: 81, label: "Medieval", checked: false },
];

const features = [
  { id: 78, label: "Cracked", checked: false },
  { id: 23, label: "Puzzle", checked: false },
  { id: 25, label: "MCMMO", checked: false },
  { id: 27, label: "Economy", checked: false },
  { id: 40, label: "Plots", checked: false },
  { id: 29, label: "PvP", checked: false },
  { id: 30, label: "PvE", checked: false },
  { id: 69, label: "Anti-Grief", checked: false },
  { id: 71, label: "Fantasy", checked: false },
];

const languages = [
  { id: 72, label: "English", checked: false },
  { id: 57, label: "Italiana", checked: false },
  { id: 58, label: "Española", checked: false },
  { id: 59, label: "Français", checked: false },
  { id: 60, label: "Polskie", checked: false },
  { id: 73, label: "Türk", checked: false },
  { id: 74, label: "Pусский", checked: false },
  { id: 75, label: "Deutsche", checked: false },
  { id: 76, label: "中国人", checked: false },
];

const categories = [
  {
    id: 1,
    name: "version",
    label: "Version",
    checked: false,
    tags: versions,
  },
  {
    id: 2,
    name: "minigame",
    label: "Minigame",
    checked: false,
    tags: minigames,
  },
  {
    id: 3,
    name: "gamemode",
    label: "Gamemode",
    checked: false,
    tags: gamemodes,
  },
  {
    id: 4,
    name: "feature",
    label: "Feature",
    checked: false,
    tags: features,
  },
  {
    id: 5,
    name: "language",
    label: "Language",
    checked: false,
    tags: languages,
  },
];

export default categories;
