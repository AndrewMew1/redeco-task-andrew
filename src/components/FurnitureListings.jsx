import React from "react";
import FurnitureListing from "./FurnitureListing";

const FurnitureListings = ({ results }) => {
  //check if results exist
  if (!results || results.length === 0) {
    return (
      <section className="bg-redecogrey px-4 py-4">
        <div className="container-xl lg:container m-auto">
          <p className="text-center text-gray-600">
            No results found. Try searching for something!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-redecogrey px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-redecogreyish mb-6 text-center">
          Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {results.map((listing) => (
            <FurnitureListing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FurnitureListings;
