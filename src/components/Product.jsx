import { Link } from "react-router-dom";
import Rating from "./Rating.component";
import { useUser } from "../context/UserContext";

const Product = ({ card }) => {
  console.log(card);
  const { cards, addToCart } = useUser();
  return (
    <div className="card-body">
      <section className="card">
        <Link to={`/product/${card.itemId}`}>
          <img src={card.image} alt="" className="img-size" />
        </Link>
        <div className="card-body">
          <Link to={`/product/${card.itemId}`}>
            <div className="card-title flex justify-center items-center">
              <strong>{card.name}</strong>
            </div>
          </Link>
          {/* <br /> */}
          <div className="flex justify-center items-center">
            <Rating value={card.rating} text={`${card.totalReviews} reviews`} />
          </div>
          {/* <br /> */}
          <div className="card-text flex justify-center items-center">
            ₹ {card.price}
          </div>
          <button
            className="btn-add-cart new-btn"
            disabled={card.countInStock == 0}
            onClick={() => addToCart(card)}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  );
};

export default Product;
