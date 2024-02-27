import { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../ReactToast";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import { setDoc } from "firebase/firestore";
import { imageDb } from "../utils/index.js";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

//Getting FireStore DB data
import "../utils/index.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
// import { doc, getDoc } from "firebase/firestore";
import { appDB } from "../utils/firestore.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [uidOfUser, setUID] = useState();

  //for cart context
  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState([]);

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
  const [avatar, setAvatar] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

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

  const setUser = (email, name, uid) => {
    setUserEmail(email);
    setDisplayName(name);
    setUID(uid);
    localStorage.setItem("UID", uid);
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

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // const buyNow = (product) => {
  //   addToCart(product);
  // };

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
      if (updatedCart.length === 0) {
        window.location.href = "./";
      }
    }
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
    localStorage.removeItem("UID");
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

  //getting displayName based on UID from firestoreDB

  const getDisplayName = async (uid) => {
    const userNameRef = doc(appDB, "users", uid);
    const userSnapshot = await getDoc(userNameRef);
    if (userSnapshot.exists()) {
      console.log(userSnapshot.data().displayName);
      return userSnapshot.data().displayName;
    } else {
      console.log(`User data not found for ID ${uid}`);
      return null;
    }
  };
  const uidDetail = localStorage.getItem("UID");
  getDisplayName(uidDetail);

  useEffect(() => {
    const fetchDisplayName = async () => {
      try {
        const name = await getDisplayName(uidDetail);
        setDisplayName(name);
      } catch (error) {
        console.error("Error fetching display name:", error);
      }
    };

    if (uidDetail) {
      fetchDisplayName();
    }
  }, [uidDetail, getDisplayName]);

  //For getting Profile inofrmation fully
  const [displayNameNew, setDisplayNameNew] = useState("");
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [applyAvatar, setApplyAvatar] = useState(null);
  const getUserProfileInfoFromFirestore = async (uid) => {
    try {
      const userDocRef = doc(appDB, "users", uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const {
          displayName,
          email,
          address,
          city,
          state,
          phoneNumber,
          pinCode,
          avatar,
        } = userDocSnapshot.data();
        console.log(displayName);
        console.log(email);
        console.log(address);
        console.log(city);
        console.log(state);
        console.log(phoneNumber);
        setDisplayNameNew(displayName);
        setAddress(address);
        setCity(city);
        setState(state);
        setPhoneNumber(phoneNumber);
        setEmail(email);
        setPinCode(pinCode);
        setApplyAvatar(avatar);
        localStorage.setItem("displayNameNew", displayName);
      } else {
        console.log("user document is not found in fs");
      }
    } catch (error) {
      console.error("firestore fetching error", error.message);
    }
  };

  //for updating profile
  const updateProfileDocument = async (userId, data) => {
    try {
      const userRef = doc(appDB, "users", userId);
      await setDoc(userRef, data, { merge: true });
      const updatedProfile = await getDoc(userRef);
      return updatedProfile.data();
    } catch (error) {
      console.error("Error updating profile document:", error.message);
      throw error;
    }
  };

  //profile displayImage update

  const uploadAvatar = async (file, userId) => {
    try {
      const path = "userId" + ".jpg";
      const storageRef = ref(imageDb, `images/${path}`);
      await uploadBytes(storageRef, file);
      const avatarUrl = await getDownloadURL(storageRef);
      return avatarUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error.message);
      throw error;
    }
  };

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
        getDisplayName,
        // buyNow,
        avatarUrl,
        setAvatarUrl,
        avatar,
        setAvatar,
        getUserProfileInfoFromFirestore,
        displayNameNew,
        address,
        city,
        state,
        phoneNumber,
        pinCode,
        email,
        applyAvatar,
        updateProfileDocument,
        uploadAvatar,
        setCart,
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
