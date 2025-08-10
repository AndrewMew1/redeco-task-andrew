# Furniture Search Agent 🔎 🛋️ Home Task for Redeco

<img width="1624" height="971" alt="Screenshot 2025-08-10 at 21 58 29" src="https://github.com/user-attachments/assets/46b92c43-ab41-4386-beda-1cd243b2004c" />

A lightweight yet extensible search agent that helps users discover second-hand or design furniture across multiple online marketplaces.
Built with **React**, **Node.js**, **Express.js**, **Puppeteer**, and **Tailwind CSS**, it currently supports **Gumtree**, **Facebook Marketplace** and **Vinterior** but its modular architecture allows easy adding of new sources.


Users can type a search query (e.g., “_green vintage armchair_”) and quickly receive curated results including title, image, price, and link.



### How an AI assistant would use this


An AI assistant could build on this agent to handle conversational requests (e.g., “Find me a Pixar-style lamp for under £100”) by dynamically adjusting search parameters, applying natural-language filters, and continuously monitoring for new listings.
I have prior project experience applying AI and semantic search tools to process user requests and translate them into optimised search queries.

## What’s currently hard-coded vs dynamic

### Hard-Coded:
* Target websites (Gumtree, Facebook Marketplace, Vinterior) are fixed in the backend scrapers.
* Scraper selectors are fixed based on current website structures.
* Results are fixed to be sorted by relevance and location fixed to London.
### Dynamic:
* User search query is passed dynamically to scrapers.
* Results are combined dynamically and returned to the frontend.
* Frontend state updates dynamically based on user input and search results.

## How I handled websites with no public API
* Used Puppeteer (a headless browser) to scrape data by navigating to the search results page, waiting for key selectors and extracting relevant listing details.
* Implemented user agent spoofing and delays (slowMo) to mimic human browsing behavior and reduce chances of blocking.
* Added timeout and error handling to manage cases when selectors are not found within expected time.
## How I’d improve reliability, avoid scraping limits & integrate into a platform production
### Reliability:
* Add error handling and timeouts to detect when websites change their layout or no results are found.
* Monitor scraping success and alert on failures.
### Scraping limits:
* Implement proxy or IP rotation to reduce risk of IP bans and rate limiting.
* Add caching of cache results for frequently searched queries to reduce repeated scraping and improve response times.
### Product Platform Integration:
* The backend and frontend are separated which allows easy deployment of each part independently.  
* Docker or serverless deployment could help scale the scraping functions on demand.
* Adding logging and monitoring would improve maintainability.
## Heuristics used to improve result quality
* Removed duplicate listings by checking listing URLs to avoid repeated entries.
* Filtered out empty or placeholder listings, especially on Facebook Marketplace, by ignoring results with missing titles or images.  
* Set missing fields (title, price, image) to placeholders to keep data consistent for frontend display.

# How to install and use
## Installation
### Requirements:
* Node.js
* npm or yarn
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
