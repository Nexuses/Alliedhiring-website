import { homeMarkup } from "../src/components/home-markup.ts";

const start = homeMarkup.indexOf('id="talent"');
const end = homeMarkup.indexOf('id="results"');
console.log(homeMarkup.slice(start, end > start ? end : start + 15000));
