import puppeteer from "puppeteer";

export async function gumtreeScrape(userQuery) {
  //remove extra spaces and replace spaces between words with + sign
  userQuery = userQuery.trim().replace(/\s+/g, "+");

  const browser = await puppeteer.launch({
    slowMo: 50,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  const url = `https://www.gumtree.com/search?search_category=all&search_location=london&q=${userQuery}&page=1&sort=relevance`;

  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await page.waitForSelector("article[data-q='search-result']", {
      timeout: 15000,
    });
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.warn("No results found or selector changed on Gumtree.");
      await browser.close();
      return [];
    }
    throw err;
  }

  //function to create an array with listing's data: title, img src, link, price
  const listings = await page.evaluate(() => {
    //get all of the listings
    const listingElements = document.querySelectorAll(
      "article[data-q='search-result']"
    );

    //return array with each listings data
    return Array.from(listingElements).map((listing) => {
      //get listing's title
      const title =
        listing.querySelector('div[data-q="tile-title"]')?.textContent ||
        "No title";

      const img = listing.querySelector("figure img");
      //get listing's img src or return 'No image' instead
      const imgSrc =
        img?.getAttribute("src") || img?.getAttribute("data-src") || "No image";

      //get listing's link
      const link =
        "https://www.gumtree.com" +
        listing.querySelector("a").getAttribute("href");

      //get listing's price
      const price = listing.querySelector(
        'div[data-testid="price"'
      ).textContent;

      const service = "Gumtree";

      //return data as array
      return { title, imgSrc, link, price, service };
    });
  });

  await browser.close();
  return listings;
}
