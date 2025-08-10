import { gumtreeScrape } from "./gum_scrape.js";
import { facebookScrape } from "./fb_scrape.js";
import fs from "fs";

// hardcoded query
const query = "black ikea lamp";

//run scrapers
const [gumtreeResults, fbResults] = await Promise.all([
  gumtreeScrape(query),
  facebookScrape(query),
]);

// add IDs starting from 1
const addIds = (arr, startId) =>
  arr.map((item, index) => ({
    id: String(startId + index),
    title: item.title,
    imgSrc: item.imgSrc,
    link: item.link,
    price: item.price,
    service: item.service,
  }));

const gumtreeWithIds = addIds(gumtreeResults, 1);
const fbWithIds = addIds(fbResults, gumtreeWithIds.length + 1);

// combine listings results
const allListings = [...gumtreeWithIds, ...fbWithIds];

// Save to JSON file
fs.writeFileSync(
  "listings.json",
  JSON.stringify(allListings, null, 2),
  "utf-8"
);

console.log(`Saved ${allListings.length} listings to listings.json`);
