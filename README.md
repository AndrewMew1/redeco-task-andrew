# Furniture Search Agent 🛋️

A functional Furniture Search web app built with React, Node.js, Express.js, Puppeteer, and Tailwind CSS.
It allows users to input search queries for second-hand or design furniture and returns curated results from multiple external websites (Gumtree, Facebook Marketplace, Vinterior).

## What’s currently hard-coded vs dynamic

### Hard-Coded:

- Target websites (Gumtree, Facebook Marketplace, Vinterior) are fixed in the backend scrapers.
- Scraper selectors are fixed based on current website structures.
- Results are fixed to be sorted by relevance and location fixed to London.

### Dynamic:

- User search query is passed dynamically to scrapers.
- Results are combined dynamically and returned to the frontend.
- Frontend state updates dynamically based on user input and search results.

## How I handled websites with no public API

- Used Puppeteer (a headless browser) to scrape data by navigating to the search results page, waiting for key selectors and extracting relevant listing details.
- Implemented user agent spoofing and delays (slowMo) to mimic human browsing behavior and reduce chances of blocking.
- Added timeout and error handling to manage cases when selectors are not found within expected time.

## How I’d improve reliability, avoid scraping limits & integrate into a platform production

### Reliability:

- Add error handling and timeouts to detect when websites change their layout or no results are found.
- Monitor scraping success and alert on failures.

### Scraping limits:

- Implement proxy or IP rotation to reduce risk of IP bans and rate limiting.
- Add caching of common queries to reduce repeated scraping and improve response times.

### Product Platform Integration:

- The backend and frontend are separated which allows easy deployment of each part independently.
- Docker or serverless deployment could help scale the scraping functions on demand.
- Adding logging and monitoring would improve maintainability.

## Heuristics used to improve result quality

- Removed duplicate listings by checking listing URLs to avoid repeated entries.
- Filtered out empty or placeholder listings, especially on Facebook Marketplace, by ignoring results with missing titles or images.
- Set missing fields (title, price, image) to placeholders to keep data consistent for frontend display.

# How to install and use

## Installation

### Requirements:

- Node.js
- npm or yarn

### 1. Clone the repository

### 2. Open project folder & install Frontend dependencies

```bash
npm install
```

### 3. Install Backend dependencies

```bash
cd backend
npm install
```

## Running the app

### 1. Start the Frontend development server

```bash
npm run dev
```

### 2. Start the Backend server

```bash
cd backend
npm run dev
```

### 3. Open browser and go to [http://localhost:3000](http://localhost:3000)
