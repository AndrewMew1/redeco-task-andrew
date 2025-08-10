import React from "react";
import FacebookIcon from "../assets/images/2021_Facebook_icon.svg";
import GumtreeIcon from "../assets/images/gumtree.webp";
import ExternalLinkIcon from "../assets/images/external-link.png";
import VinteriorIcon from "../assets/images/vinterior.jpg";

const FurnitureListing = ({ listing }) => {
  // Function to select service icon for listing
  const renderServiceIcon = () => {
    if (listing.service.toLowerCase().includes("facebook")) {
      return (
        <img
          src={FacebookIcon}
          alt="Facebook Icon"
          className="ml-1 w-5 h-5 rounded-full"
          aria-hidden="true"
        />
      );
    }
    if (listing.service.toLowerCase().includes("gumtree")) {
      return (
        <img
          src={GumtreeIcon}
          alt="Gumtree Icon"
          className="ml-1 w-5 h-5 rounded-full"
          aria-hidden="true"
        />
      );
    }
    if (listing.service.toLowerCase().includes("vinterior")) {
      return (
        <img
          src={VinteriorIcon}
          alt="Vinterior Icon"
          className="ml-1 w-5 h-5 rounded-full"
          aria-hidden="true"
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2 flex items-center">
            <span>{listing.service}</span>
            {renderServiceIcon()}
          </div>
          <h3 className="text-xl font-bold">{listing.title}</h3>
          <div className="border border-gray-100 mb-5"></div>
          <div className="mb-5">
            <div className="rounded-xl overflow-hidden h-48 flex items-center justify-center bg-gray-100">
              <img
                src={listing.imgSrc}
                alt={listing.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-redecoorange text-xl">{listing.price}</h3>
            <a
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-[36px] bg-redecoorange text-white hover:bg-white hover:text-redecoorange hover:border hover:border-redecoorange px-4 py-2 rounded-full text-sm font-medium transition"
            >
              <span>Link</span>
              <img
                src={ExternalLinkIcon}
                alt="External Link"
                className="w-4 h-4 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureListing;
