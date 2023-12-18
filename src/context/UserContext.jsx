import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../ReactToast";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//Getting FireStore DB data
import "../utils/index.js";
import { collection, getDocs, getDoc } from "firebase/firestore/lite";
import { appDB } from "../utils/firestore.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  //for cart context
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [paymentPortal, setPaymentPortal] = useState("Stripe");

  //DetailProduct Page

  //db getting from firestore

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFromFireStoreDB = async () => {
    const snapShotforCapture = await getDocs(collection(appDB, "Products"));
    const data = [];
    snapShotforCapture.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const mainData = await fetchFromFireStoreDB();
        setCards(mainData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  //For Searching

  const [searchTerm, setSearchTerm] = useState("");

  //Fix Slider visibility in HomeScreen

  const [forceRerender, setForceRerender] = useState(false);

  const triggerRerender = () => {
    setForceRerender((prev) => !prev);
  };

  //for filtering product in home screen
  const isHomeRoute = window.location.pathname === "/";
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(cards);

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  //Registration Context

  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //For Shipping Context

  const [profile, setProfile] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    country: "",
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
  };

  //for local storage

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedDisplayName = localStorage.getItem("displayName");
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedAddress = JSON.parse(localStorage.getItem("shipping")) || [];

    if (storedUserEmail && storedDisplayName) {
      setUserEmail(storedUserEmail);
      setDisplayName(storedDisplayName);
    }
    setCart(storedCart);
    setShipping(storedAddress);
  }, []);

  //end of use Effect local storage function

  const setUser = (email, name) => {
    setUserEmail(email);
    setDisplayName(name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("displayName", name);
    showToast(`User Login done`, "success");
  };

  //cart functionality

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.itemId === product.itemId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      showToast(`${product.name} Quantity Increased`, "success");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      showToast(`${product.name} added to cart!`, "success");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const updateCart = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.itemId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.itemId === productId
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(existingItemIndex, 1);

      setCart(updatedCart);
      showToast(`Product Removed`, "error");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  //end of cart function

  const logoutUser = () => {
    // setUserEmail(null);
    // setDisplayName(null);
    setUserEmail("");
    setDisplayName("");

    localStorage.removeItem("userEmail");
    localStorage.removeItem("displayName");
    localStorage.removeItem("shipping");
    localStorage.removeItem("profile");
    showToast(`User Logout done`, "error");
  };

  //Admin-panel

  const [generateUUID, setGenerateUUID] = useState("");

  const generateUniqueID = async (e) => {
    const newUUID = uuidv4();
    setGenerateUUID(newUUID);
    return newUUID;
  };

  const [InventoryList, setInventoryList] = useState({
    itemId: "",
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    rating: "",
    totalReviews: "",
    sliderValue: "",
    discount: "",
  });

  const updateInventoryList = (newInventoryList) => {
    setInventoryList(newInventoryList);
  };

  //From Firestore DB to getting Products data

  //getting name from db

  return (
    <UserContext.Provider
      value={{
        userEmail,
        displayName,
        setUser,
        logoutUser,
        formFields,
        setFormFields,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCart,
        shipping,
        setShipping,
        searchTerm,
        updateSearchTerm,
        profile,
        updateProfile,
        filteredProducts,
        setFilteredProducts,
        isHomeRoute,
        forceRerender,
        triggerRerender,
        generateUUID,
        setGenerateUUID,
        generateUniqueID,
        InventoryList,
        updateInventoryList,
        cards,
        setCards,
        isLoading,
      }}
    >
      {isLoading ? <p className="loading-text">Loading...</p> : children}
      {/* {children} */}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
