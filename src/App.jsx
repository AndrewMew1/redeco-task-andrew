import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Search from "./components/Search";
import FurnitureListings from "./components/FurnitureListings";

const App = () => {
  // state to hold search results
  const [results, setResults] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Search setResults={setResults} />
      <FurnitureListings results={results} />
    </div>
  );
};

export default App;
