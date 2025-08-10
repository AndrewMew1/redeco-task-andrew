import { gumtreeScrape } from "./scrapers/gum_scrape.js";
import { facebookScrape } from "./scrapers/fb_scrape.js";
import { vinteriorScrape } from "./scrapers/vinterior_scrape.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    // run all 3 scrapers in parallel
    const [gumResults, fbResults, vinteriorResults] = await Promise.all([
      gumtreeScrape(query),
      facebookScrape(query),
      vinteriorScrape(query),
    ]);

    // combine all results into one array
    const allResults = [...gumResults, ...fbResults, ...vinteriorResults].map(
      (item, index) => ({
        id: String(index + 1),
        ...item,
      })
    );

    res.json(allResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
