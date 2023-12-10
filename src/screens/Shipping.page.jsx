import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore/lite";
import { Link, useNavigate } from "react-router-dom";
import { appDB } from "../utils/firestore.js";
import { useUser } from "../context/UserContext.jsx";
const Shipping = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useUser();

  const handleChange = (e) => {
    updateProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const saveChange = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(appDB, "shipping-details"), {
        address: profile.address,
        city: profile.city,
        pincode: profile.pincode,
        country: profile.country,
      });
      localStorage.setItem("profile", JSON.stringify(profile));
      alert("Data is successfully saved");
      console.log(res);
      if (res) {
        navigate("/payment");
      }
    } catch (err) {
      alert("Data not exported to Firestore");
      console.log(err.code);
      console.error("Firestore error:", err);
    }
  };

  useEffect(() => {
    // Check if profile information is stored in localStorage
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      // Parse and set the stored profile information
      updateProfile(JSON.parse(storedProfile));
    }
  }, []);
  return (
    <section className="Shipping-page">
      <h1>Shipping Details</h1>
      <form className="shipping-form" onSubmit={saveChange}>
        <div className="form-sub">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-sub">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your Address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-sub">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter your City"
            value={profile.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-sub">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter your Zipcode"
            value={profile.pincode}
            onChange={handleChange}
          />
        </div>
        <div className="form-sub">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter your Country"
            value={profile.country}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Continue</button>
      </form>
    </section>
  );
};

export default Shipping;
