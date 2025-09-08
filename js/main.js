

import { darkmode, bottom } from "./geraldine.js";
import { listData, createLittleCarSection } from "./luis.js";

await listData();
createLittleCarSection();


bottom.addEventListener("click", function () {
  darkmode.classList.toggle("dark");
});

