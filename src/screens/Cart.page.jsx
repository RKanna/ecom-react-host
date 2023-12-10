import React from "react";
import { Link, useNavigate, ScrollRestoration } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useUser } from "../context/UserContext.jsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    productId,
    userEmail,
    updateCart,
  } = useUser();
  const removeHandler = (productId) => {
    removeFromCart(productId);
  };

  // const changeHandler = () => {
  //   return;
  // };

  const incrementQuantity = (productId) => {
    // finding id
    const cartItem = cart.find((item) => item.itemId === productId);
    if (cartItem) {
      // for increment
      const updatedQuantity = cartItem.quantity + 1;
      updateCart(productId, updatedQuantity);
    }
  };

  const decrementQuantity = (productId) => {
    const cartItem = cart.find((item) => item.itemId === productId);
    if (cartItem && cartItem.quantity > 1) {
      const updatedQuantity = cartItem.quantity - 1;
      updateCart(productId, updatedQuantity);
    } else {
      removeHandler(productId);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return cart.length;
  };

  return (
    <div className="cart-main">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-msg">Your Cart is Empty</div>
      ) : (
        <main className="for-cart-row">
          <section className="cart-row">
            {cart.map((cartItem) => (
              <div key={cartItem.itemId} className="row-cart">
                <div>
                  <div className="cart-img">
                    <img src={cartItem.image} alt={cartItem.name} />
                  </div>
                </div>
                <div className="cent-row">
                  <div className="product-details">
                    <div className="product-title">{cartItem.name}</div>
                    <div className="product-price">₹{cartItem.price}</div>
                  </div>
                  <div className="product-quantity">
                    <button onClick={() => decrementQuantity(cartItem.itemId)}>
                      <IoIosArrowBack />
                    </button>
                    <input
                      type="text"
                      value={cartItem.quantity}
                      min="1"
                      readOnly
                    />
                    <button onClick={() => incrementQuantity(cartItem.itemId)}>
                      <IoIosArrowForward />
                    </button>
                  </div>
                  <div className="product-total">
                    ₹{cartItem.price * cartItem.quantity}
                  </div>
                  <div>
                    <FaTrash
                      className="trash"
                      onClick={() => removeHandler(cartItem.itemId)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
          <div className="box-cart-value">
            <h2>Subtotal</h2>
            <h2>{calculateTotalItems()} Items</h2>
            <h2>Total Value : ₹ {calculateSubtotal()}</h2>
            {userEmail ? (
              <Link to="/Shipping" className="proceed">
                Proceed
              </Link>
            ) : (
              <Link to="/login" className="proceed">
                Login to Countinue
              </Link>
            )}
          </div>
        </main>
      )}
      <ScrollRestoration />
    </div>
  );
};

export default Cart;
