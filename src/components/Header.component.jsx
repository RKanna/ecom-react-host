import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "./../context/UserContext";
import { FaSignOutAlt, FaSearch } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { VscThreeBars } from "react-icons/vsc";
const Header = () => {
  const {
    userEmail,
    logoutUser,
    cart,
    displayName,
    searchTerm,
    updateSearchTerm,
  } = useUser();

  const handleLogout = () => {
    logoutUser();
  };

  const handleSearch = () => {};

  //for Sidebar

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <nav>
        <div className="brand-container">
          <Link to="/" className="header-heading">
            <img src="/assets/logo/gadget.png" alt="logo" />
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search product here"
            value={searchTerm}
            // onChange={}
            onChange={(e) => updateSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="cart-container">
          <div className="hide">
            <Link className="cat-link" to="/Category">
              Category
            </Link>
          </div>
          <div className="hide">
            {displayName ? <h3>Hello {displayName.split(" ")[0]}</h3> : ""}
          </div>
          <div className="hide">
            {/* <Link to="/Login" className="fl-position">
              <FaUser className="point" />
              <h3>Sign In</h3>
            </Link> */}
            {userEmail ? (
              <Link
                className="userSpotlight fl-position"
                to="/"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="point" />
                <h3>Logout</h3>
              </Link>
            ) : (
              <Link to="/Login" className="fl-position">
                <FaUser className="point" />
                <h3>Sign In</h3>
              </Link>
            )}
          </div>
          <div>
            <Link to="/Cart" className="fl-position">
              <FaShoppingCart className="point" />
              <h3>Cart</h3>
              {cart.length > 0 ? (
                <h3 className="header-cart">{cart.length}</h3>
              ) : (
                ""
              )}
            </Link>
            {/* {userEmail ? (
              <Link to="/Cart" className="fl-position">
                <FaShoppingCart className="point" />
                <h3>Cart</h3>
              </Link>
            ) : (
              <Link to="/Login" className="fl-position">
                <FaShoppingCart className="point" />
                <h3>Cart</h3>
              </Link>
            )} */}
          </div>
          <div>
            <VscThreeBars className="clr-three" onClick={toggleSidebar} />
            {isSidebarVisible && <Sidebar />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
