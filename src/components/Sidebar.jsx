import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Sidebar = () => {
  const { displayName, cart, userEmail, logoutUser } = useUser();
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(!close);
  };

  const handleLogoutFully = () => {
    logoutUser();
  };
  return (
    <section className={`sidebar ${close ? "closed" : ""}`}>
      <div>
        <IoMdClose className="clr-three" onClick={handleClose} />
      </div>
      <div className="hide-main">
        <div>
          {displayName ? <h3>Hello {displayName.split(" ")[0]}</h3> : ""}
        </div>
        <div>
          <Link className="cat-link" to="/Category">
            Category
          </Link>
        </div>
        <div>
          {userEmail ? (
            <Link
              className="userSpotlight fl-position"
              to="/"
              onClick={handleLogoutFully}
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
      </div>
    </section>
  );
};

export default Sidebar;
