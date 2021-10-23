import fs from "fs";
import axios from "axios";

import categories from "./tags.mjs";

(async () => {
  try {
    let tags;
    const { data } = await axios.get("https://v2api.minecraft.global/tags");
    const servercount = data.payload;

    tags = [...categories];
    tags.forEach((category, index) => {
      category.tags.forEach((tag, index2) => {
        tags[index].tags[index2].count = servercount[tag.id];
      });
    });

    fs.writeFileSync("./tags.json", JSON.stringify(tags));

    console.log("UPDATED TAGS SERVER COUNT");
  } catch (e) {
    console.log(e);
  }
})();
