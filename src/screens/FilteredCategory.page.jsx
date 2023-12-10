import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Product from "../components/Product";
import Rating from "../components/Rating.component";
import { useUser } from "../context/UserContext";

const FilteredCategory = () => {
  const { addToCart, cards } = useUser();
  const { category } = useParams();
  console.log("Category:", category);
  const [filteredCategory, setFilteredCategory] = useState([]);

  useEffect(() => {
    // Filter products based on the selected category
    const categoryProducts = cards.filter((card) => card.category === category);
    setFilteredCategory(categoryProducts);
  }, [category]);

  const navigate = useNavigate();
  const handlePreviousPage = () => {
    navigate(-2);
  };

  return (
    <section className="filter-page">
      <h1>{category} Products</h1>
      <div className="filtered-category-page">
        {filteredCategory.map((filteredProduct) => (
          <div key={filteredProduct.itemId}>
            <Link
              className="filtered-box"
              to={`/product/${filteredProduct.itemId}`}
            >
              <div
              // key={product.itemId}
              >
                <img src={filteredProduct.image} alt={filteredProduct.name} />
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

export default FilteredCategory;
