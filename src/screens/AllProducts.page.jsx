import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import Rating from "../components/Rating.component";
import { useUser } from "../context/UserContext";

const AllProducts = () => {
  const { addToCart, cards } = useUser();
  const [filteredCategory, setFilteredCategory] = useState([]);
  console.log(cards);
  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate(-1);
  };

  return (
    <section className="filter-page">
      <h1 className="text-4xl font-bold">All Products</h1>
      <div className="filtered-category-page">
        {cards.map((filteredProduct) => (
          <div key={filteredProduct.itemId}>
            <Link
              className="filtered-box w-96 h-96"
              to={`/product/${filteredProduct.itemId}`}
            >
              <div
              // key={product.itemId}
              >
                <img
                  src={filteredProduct.image}
                  alt={filteredProduct.name}
                  className="max-w-96 max-h-22"
                />
              </div>
              <h3>{filteredProduct.name}</h3>
              <Rating
                value={filteredProduct.rating}
                text={`${filteredProduct.totalReviews} reviews`}
              />
              <div className="card-text">₹ {filteredProduct.price}</div>
            </Link>
            <div className="filter-btn-container">
              <button
                className="btn-add-cart"
                disabled={filteredProduct.countInStock === 0}
                onClick={() => addToCart(filteredProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <button className="btn-add-cart filter-back" onClick={handlePreviousPage}>
        Go Back
      </button>
    </section>
  );
};

export default AllProducts;
