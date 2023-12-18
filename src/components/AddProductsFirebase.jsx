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
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
     
      updateProfile(JSON.parse(storedProfile));
    }
  }, []);
  return (
    
  );
};

export default Shipping;
