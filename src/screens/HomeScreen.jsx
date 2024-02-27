import Product from "../components/Product";
import Slider from "../slider/Slider";
import { useState, useEffect } from "react";
import React from "react";
import { useUser } from "../context/UserContext";
import { ScrollRestoration, Link, NavLink } from "react-router-dom";
const HomeScreen = () => {
  const {
    searchTerm,
    filteredProducts,
    setFilteredProducts,
    isHomeRoute,
    forceRerender,
    cards,
  } = useUser();

  useEffect(() => {
    if (searchTerm) {
      const filtered = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(cards);
    }
  }, [searchTerm]);
  console.log(filteredProducts);

  return (
    <>
      <div>
        {/* Here, key={forceRerender} update every time when i click go back from detailproduct page so it will force reRendering it will fix  */}
        <div className="banner-container">
          <img
            className="banner-img"
            src="/assets/background/back.png"
            alt=""
          />
          {/* <Link to="/Category" className="banner-btn">
            Shop Now
          </Link> */}
          <Link
            to="/Category"
            className="px-4 py-2 text-white rounded-lg shadow-md banner-btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Shop Now
          </Link>
        </div>

        {isHomeRoute && !searchTerm && (
          <Slider key={forceRerender} cards={cards} />
        )}
        {!searchTerm ? (
          <h1 className="text-4xl font-bold">Recently Added Products</h1>
        ) : (
          <h1>Search Results</h1>
        )}

        <section className="row">
          {/* {filteredProducts.slice(0, 10).map((card) =>
            card.sliderValue === "false" ? (
              <div className="column" key={card.itemId}>
                <Product card={card} />
              </div>
            ) : null
          )} */}
          {filteredProducts.slice(0, 14).map((card) =>
            card.itemId ? (
              card.sliderValue === "false" ? (
                <div className="column" key={card.itemId}>
                  <Product card={card} />
                </div>
              ) : null
            ) : null
          )}
        </section>
        <ScrollRestoration />
        <div className="flex items-center justify-center">
          <Link
            to={`/allProducts`}
            className="p-3 font-bold transition-all ease-in-out transform bg-gray-500 rounded-xl hover:bg-gray-700 hover:scale-105 hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
