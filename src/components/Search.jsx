import React, { useState } from "react";

const Search = ({ setResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Searching for:", query);

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Results from backend:", data);

      setResults(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto my-6 px-6">
      <h1 className="text-4xl font-bold text-black mb-6 text-center">
        Find Furniture
      </h1>

      <div className="w-full max-w-sm min-w-[500px] mx-auto">
        <form className="relative flex items-center" onSubmit={handleSubmit}>
          <input
            className="w-full bg-white placeholder:text-gray-400 text-gray-700 text-base border border-gray-200 rounded-full pl-10 pr-4 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow-md"
            placeholder="Sofa, chair, lamp..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <button
            className="rounded-full bg-redecoorange py-2 px-5 border border-transparent text-white text-sm font-medium transition-all shadow-sm hover:shadow-md hover:bg-redecoorange2 focus:bg-redecoorange2 active:bg-redecoorange2 ml-2 flex items-center gap-1"
            type="submit"
            disabled={loading}
          >
            <span>{loading ? "Searching..." : "Search"}</span>
          </button>
        </form>

        {loading && (
          <p className="w-full text-center mt-5 text-redecoorange font-semibold">
            Loading results...
          </p>
        )}
      </div>
    </section>
  );
};

export default Search;
