import { homeMarkup } from "../src/components/home-markup.ts";

const start = homeMarkup.indexOf('id="tcar"');
const end = homeMarkup.indexOf("tcar-nav");
console.log(homeMarkup.slice(start, end));
