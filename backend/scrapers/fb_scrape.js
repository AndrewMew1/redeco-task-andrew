import puppeteer from "puppeteer";

export async function facebookScrape(userQuery) {
  //remove extra spaces and replace spaces between words with %20 sign
  userQuery = userQuery.trim().replace(/\s+/g, "%20");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.facebook.com/marketplace/london/search/?query=${userQuery}`;

  await page.goto(url);

  const listings = await page.evaluate(() => {
    //get all of the listings
    const listingElements = document.querySelectorAll(
      ".x9f619.x78zum5.xdt5ytf"
    );

    //return array with each listings data
    const results = Array.from(listingElements)
      .map((listing) => {
        //select img data for title and img src
        const img = listing.querySelector("img");
        const alt = img?.getAttribute("alt") || "";

        // skip non-listings or placeholders
        if (!alt || alt.toLowerCase().includes("loading")) {
          return null;
        }

        //get title
        const title = alt.split(" in ")[0]?.trim() || "No title";
        //get image source
        const imgSrc = img?.getAttribute("src") || "";
        //get link
        const link =
          "https://www.facebook.com" +
          (listing.querySelector("a")?.getAttribute("href") || "");
        //get price
        const price =
          Array.from(listing.querySelectorAll("span[dir='auto']"))
            .map((el) => el.textContent.trim())
            .find((text) => /^£?\d|^\$?\d/.test(text)) || "No price";

        const service = "Facebook Marketplace";

        return { title, imgSrc, link, price, service };
      })
      .filter(Boolean); // remove nulls

    // remove duplicates by link:
    const unique = [];
    const seenLinks = new Set();

    for (const item of results) {
      if (!seenLinks.has(item.link)) {
        seenLinks.add(item.link);
        unique.push(item);
      }
    }

    return unique;
  });

  await browser.close();
  return listings;
}
