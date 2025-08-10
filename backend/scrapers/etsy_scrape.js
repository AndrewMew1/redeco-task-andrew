import puppeteer from "puppeteer";

export async function etsyScrape(userQuery) {
  //remove extra spaces and replace spaces between words with + sign
  userQuery = userQuery.trim().replace(/\s+/g, "+");

  const browser = await puppeteer.launch({
    slowMo: 50,
    headless: false,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  const url = `https://www.etsy.com/uk/search?q=${userQuery}&ref=search_bar`;

  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await page.waitForSelector("ul[data-results-grid-container]", {
      timeout: 15000,
    });
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.warn("No results found or selector changed on Etsy.");
      await browser.close();
      return [];
    }
    throw err;
  }

  //function to create an array with listing's data: title, img src, link, price
  const listings = await page.evaluate(() => {
    //get all of the listings
    const listingElements = document.querySelectorAll(
      "div[data-behat-search-results-lg] ul[data-results-grid-container] li.wt-list-unstyled"
    );

    //return array with each listings data
    return Array.from(listingElements).map((listing) => {
      //get listing's title
      const titleElement = listing.querySelector("h3");
      const title =
        titleElement?.getAttribute("title")?.trim() ||
        titleElement?.textContent.trim() ||
        "No title";

      //get img link
      const img = listing.querySelector("img");
      const imgSrc = img?.src || img?.getAttribute("data-src") || "No image";

      //get listing's link
      const link = listing.querySelector("a.listing-link")?.href || "No link";

      //get listing's price
      const price =
        listing.querySelector("span.currency-value")?.textContent?.trim() ||
        "No price";

      const service = "Etsy";

      //return data as array
      return { title, imgSrc, link, price, service };
    });
  });

  await browser.close();
  return listings;
}
