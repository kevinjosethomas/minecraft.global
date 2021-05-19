const versions = [
  { id: 0, name: "1.17", label: "1.17", checked: false },
  { id: 1, name: "1.16.5", label: "1.16.5", checked: false },
  { id: 2, name: "1.16.4", label: "1.16.4", checked: false },
  { id: 3, name: "1.16.3", label: "1.16.3", checked: false },
  { id: 4, name: "1.16.1", label: "1.16.1", checked: false },
  { id: 5, name: "1.16", label: "1.16", checked: false },
  { id: 6, name: "1.15.2", label: "1.15.2", checked: false },
  { id: 7, name: "1.15.1", label: "1.15.1", checked: false },
  { id: 8, name: "1.15", label: "1.15", checked: false },
  { id: 9, name: "1.14.4", label: "1.14.4", checked: false },
  { id: 10, name: "1.14", label: "1.14", checked: false },
  { id: 11, name: "1.13.2", label: "1.13.2", checked: false },
  { id: 12, name: "1.13", label: "1.13", checked: false },
  { id: 13, name: "1.12.2", label: "1.12.2", checked: false },
  { id: 14, name: "1.12", label: "1.12", checked: false },
  { id: 15, name: "1.11.2", label: "1.11.2", checked: false },
  { id: 16, name: "1.11", label: "1.11", checked: false },
  { id: 17, name: "1.10.2", label: "1.10.2", checked: false },
  { id: 18, name: "1.10", label: "1.10", checked: false },
  { id: 19, name: "1.9.4", label: "1.9.4", checked: false },
  { id: 20, name: "1.9", label: "1.9", checked: false },
  { id: 21, name: "1.8.9", label: "1.8.9", checked: false },
  { id: 22, name: "1.8", label: "1.8", checked: false },
];

const gamemodes = [
  { id: 26, name: "pixelmon", label: "Pixelmon", checked: false },
  { id: 28, name: "prison", label: "Prison", checked: false },
  { id: 35, name: "skyblock", label: "Skyblock", checked: false },
  { id: 36, name: "roleplay", label: "Roleplay", checked: false },
  { id: 37, name: "creative", label: "Creative", checked: false },
  { id: 38, name: "redstone", label: "Redstone", checked: false },
  { id: 39, name: "anarchy", label: "Anarchy", checked: false },
  { id: 41, name: "survival", label: "Survival", checked: false },
  { id: 42, name: "adventure", label: "Adventure", checked: false },
  { id: 43, name: "smp", label: "SMP", checked: false },
  { id: 44, name: "ftb", label: "FTB", checked: false },
  { id: 45, name: "tekkit", label: "Tekkit", checked: false },
  { id: 46, name: "hardcore", label: "Hardcore", checked: false },
  { id: 47, name: "towny", label: "Towny", checked: false },
  { id: 48, name: "vanilla", label: "Vanilla", checked: false },
  { id: 49, name: "modded", label: "Modded", checked: false },
  { id: 66, name: "rpg", label: "RPG", checked: false },
  { id: 67, name: "pokemon", label: "Pokemon", checked: false },
];

const minigames = [
  { id: 70, name: "arena", label: "Arena", checked: false },
  { id: 24, name: "parkour", label: "Parkour", checked: false },
  { id: 31, name: "kitPvP", label: "KitPvP", checked: false },
  { id: 32, name: "skywars", label: "Skywars", checked: false },
  { id: 33, name: "bedwars", label: "Bedwars", checked: false },
  { id: 34, name: "spleef", label: "Spleef", checked: false },
  { id: 61, name: "minigames", label: "Minigames", checked: false },
  { id: 62, name: "hunger_games", label: "Hunger Games", checked: false },
  { id: 68, name: "zombies", label: "Zombies", checked: false },
];

const features = [
  { id: 23, name: "puzzle", label: "Puzzle", checked: false },
  { id: 25, name: "mcmmo", label: "MCMMO", checked: false },
  { id: 27, name: "economy", label: "Economy", checked: false },
  { id: 40, name: "plots", label: "Plots", checked: false },
  { id: 29, name: "pvp", label: "PvP", checked: false },
  { id: 30, name: "pve", label: "PvE", checked: false },
  { id: 69, name: "anti_grief", label: "Anti-Grief", checked: false },
  { id: 71, name: "fantasy", label: "Fantasy", checked: false },
];

const languages = [
  { id: 72, name: "english", label: "English", checked: false },
  { id: 57, name: "italiana", label: "Italiana", checked: false },
  { id: 58, name: "española", label: "Española", checked: false },
  { id: 59, name: "français", label: "Français", checked: false },
  { id: 60, name: "polskie", label: "Polskie", checked: false },
  { id: 73, name: "türk", label: "Türk", checked: false },
  { id: 74, name: "pусский", label: "Pусский", checked: false },
  { id: 75, name: "deutsche", label: "Deutsche", checked: false },
  { id: 76, name: "中国人", label: "中国人", checked: false },
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
