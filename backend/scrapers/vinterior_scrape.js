import puppeteer from "puppeteer";

export async function vinteriorScrape(userQuery) {
  //remove extra spaces and replace spaces between words with + sign
  userQuery = userQuery.trim().replace(/\s+/g, "%20");

  const browser = await puppeteer.launch({
    slowMo: 50,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  const url = `https://www.vinterior.co/search?q=${userQuery}`;

  await page.goto(url, { waitUntil: "networkidle2" });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    await page.waitForSelector(
      "div.vsd-listings__grid.mt-24.vjs-hits-container.vjs-listings-source",
      {
        timeout: 15000,
      }
    );
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.warn("No results found or selector changed on Vinterior.");
      await browser.close();
      return [];
    }
    throw err;
  }

  //function to create an array with listing's data: title, img src, link, price
  const listings = await page.evaluate(() => {
    const baseUrl = "https://www.vinterior.co";
    const container = document.querySelector(
      'div[data-listings-source="results"]'
    );
    if (!container) return [];

    const listingElements = container.querySelectorAll(
      "div.vsd-listing__container"
    );

    //return array with each listings data
    return Array.from(listingElements).map((listing) => {
      //get listing's title
      const title =
        listing.querySelector("div.vsd-listing__title")?.textContent.trim() ||
        "No title";

      //get listing's img src or return 'No image' instead
      const imgSrc =
        listing.querySelector("a.vsd-listing__image-container img")?.src ||
        "No image";

      //get listing's link
      const linkRelative =
        listing
          .querySelector("a.vsd-listing__click-area")
          ?.getAttribute("href") || "";
      const link = linkRelative ? baseUrl + linkRelative : "No link";

      //get listing's price
      const price =
        listing.querySelector("div.vsd-listing__price")?.textContent.trim() ||
        "No price";

      const service = "Vinterior";
      //return data as array
      return { title, imgSrc, link, price, service };
    });
  });

  await browser.close();
  return listings;
}
