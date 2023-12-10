import {
  Navigate,
  useNavigate,
  useParams,
  ScrollRestoration,
} from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.component";
import { useUser } from "../context/UserContext";
import { GoDotFill } from "react-icons/go";
import { useEffect } from "react";
const DetailProductPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    searchTerm,
    filteredProducts,
    cards,
  } = useUser();
  const { itemId: productId } = useParams();
  const card = cards.find((p) => p.itemId === productId);

  const handleAddToCart = () => {
    addToCart(card);
  };

  //handleGoBack
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
    //for force rerendering of homescreen because fixing the slider disappearance
  };

  return (
    <section className="details">
      <div className="mainRow">
        <div className="versatile-magnifier">
          {/* <h4>Versatile Magnifier</h4> */}
          <h4>VM</h4>
          <h4>Discount</h4>
          <h4 className="bold-txt">{card.discount}</h4>
        </div>
        <div className="columnFirst">
          <Link
            to="/"
            className="header-heading btn-gen"
            onClick={handleGoBack}
          >
            Go Back
          </Link>
          <img src={card.image} alt={card.name} />
          {console.log(card.image)}
        </div>
        <div className="columnSecond">
          <article>
            <h3>{card.name}</h3>
            <Rating value={card.rating} text={`${card.totalReviews} reviews`} />
            <span>Brand : {card.brand}</span>
            <span>Price : ₹ {card.price}</span>
            <p>Description: {card.description}</p>
          </article>
        </div>
        <div className="columnThird">
          <div className="box-div">
            <div className="price-cart">
              <span>Price : </span>
              <span>₹ {card.price}</span>
            </div>
            <hr />
            <div className="available">
              <span>Availability :</span>
              <span className="top-nl">
                {/* {product.countInStock > 0 ? "In Stock" : "Out of Stock"} */}
                {card.countInStock > 0 ? (
                  <GoDotFill className="green-cart" />
                ) : (
                  <GoDotFill className="red-cart" />
                )}
              </span>
            </div>
            <hr />
            <div>
              <button
                className="btn-add-cart"
                type="button"
                disabled={card.countInStock == 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              {/* { ? (
                <button
                  className="btn-add-cart"
                  type="button"
                  disabled={product.countInStock == 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  className="btn-add-cart"
                  type="button"
                  disabled
                  onClick={handleAddToCart}
                >
                  In Cart
                </button>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </section>
  );
};

export default DetailProductPage;
