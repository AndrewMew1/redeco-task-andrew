import React from "react";
import logo from "../assets/images/redeco_logo.png";

const navbar = () => {
  return (
    <nav className="bg-redeco1 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <a
              className="flex flex-shrink-0 items-center mr-4"
              href="/index.html"
            >
              <img className="h-10 w-auto" src={logo} alt="Redeco & Andrew" />
              <span className="hidden md:block text-black text-2xl font-medium ml-2">
                & Andrew ;)
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
