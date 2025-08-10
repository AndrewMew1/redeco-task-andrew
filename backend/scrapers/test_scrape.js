import { vinteriorScrape } from "./vinterior_scrape.js";

async function test() {
  const results = await vinteriorScrape("black sofa");
  console.log("Scrape results:", results);
}

test().catch(console.error);
