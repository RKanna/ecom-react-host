import { useState, useEffect } from "react";
import { FaEye, FaRegEdit, FaEuroSign } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../context/UserContext";
import { IoIosSearch } from "react-icons/io";
import "./AdminInventory.css";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  deleteDoc,
  deleteField,
  updateDoc,
  where,
  FieldValue,
} from "firebase/firestore/lite";
import { appDB } from "../utils/firestore";
const AdminInventory = () => {
  const { cards, setCards } = useUser();
  const [openOverlayId, setOpenOverlayId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [updateProduct, setUpdateProduct] = useState({
    itemId: "",
    name: "",
    price: "",
    image: "",
    category: "",
    countInStock: "",
    discount: "",
  });

  const openOverlay = (itemId) => {
    setOpenOverlayId(itemId);
  };

  const closeOverlay = () => {
    setOpenOverlayId(null);
  };

  const filteredAndSortedCards = cards
    .filter((card) =>
      card.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const total = filteredAndSortedCards.filter((card) => card.itemId).length;
  const handleDeleteClick = async (itemId) => {
    const productsRef = collection(appDB, "Products");
    const productQuery = query(productsRef, where("itemId", "==", itemId));

    try {
      const querySnapshot = await getDocs(productQuery);
      if (querySnapshot.empty) {
        console.error("Product not found in Firestore. Cannot update.");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          itemId: "",
        });

        console.log("Product updated successfully!");

        //for updating states fo cards array for rerendering
        setCards((prevCards) =>
          prevCards.filter((card) => card.itemId !== itemId)
        );
      });
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  const [isUpdateOverlayOpen, setIsUpdateOverlayOpen] = useState(false);

  const openUpdateOverlay = () => {
    setIsUpdateOverlayOpen(true);
  };

  const closeUpdateOverlay = () => {
    setIsUpdateOverlayOpen(false);
  };

  //For Editing

  const handleEditClick = (itemId) => {
    const selectedCard = cards.find((card) => card.itemId === itemId);
    setUpdateProduct({
      itemId: selectedCard.itemId,
      name: selectedCard.name,
      price: selectedCard.price,
      image: selectedCard.image,
      category: selectedCard.category,
      countInStock: selectedCard.countInStock,
      discount: selectedCard.discount,
    });
    openUpdateOverlay();
  };

  const handleUpdateProductChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      if (!updateProduct.itemId) {
        console.error("itemId is undefined or null.");
        return;
      }

      const productsRef = collection(appDB, "Products");
      const productQuery = query(
        productsRef,
        where("itemId", "==", updateProduct.itemId)
      );

      const querySnapshot = await getDocs(productQuery);

      if (querySnapshot.size !== 1) {
        console.error(
          "Product not found in Firestore or multiple products found. Cannot update."
        );
        return;
      }

      const doc = querySnapshot.docs[0];

      // Update the product in Firestore
      await updateDoc(doc.ref, {
        itemId: updateProduct.itemId,
        name: updateProduct.name,
        price: updateProduct.price,
        image: updateProduct.image,
        category: updateProduct.category,
        countInStock: updateProduct.countInStock,
        discount: updateProduct.discount,
      });

      console.log("Product updated successfully!");
      setCards((prevCards) => [...prevCards]);

      closeUpdateOverlay();
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="AdminInventory">
      <h1>Store Inventory</h1>
      <h4>Total Products List: {total}</h4>

      <div className="search-main">
        <input
          className="searchBar"
          type="text"
          placeholder="Search for title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div>
          <Link to="/admin" className="add-prod">
            Add New Product
          </Link>
        </div>
      </div>

      <br />
      <hr />
      <ul>
        <li>#</li>
        <li className="title-pre">Title</li>
        <li>Category</li>
        <li>Price</li>
        <li>Image</li>
        <li>Check</li>
        <li>Update</li>
        <li>Delete</li>
      </ul>
      <hr />

      {filteredAndSortedCards.map((card) => (
        <div key={card.itemId}>
          {card.itemId && (
            <section>
              <div className="row-items-inventory">
                <div className="row-inventory">
                  <li className="title-pro">{card.name}</li>
                  <li className="category">{card.category}</li>
                  <li className="price-pro">{card.price} ₹</li>
                  <li>
                    <img className="api-img max-w-10" src={card.image} alt="" />
                  </li>
                  <li className="check-eye">
                    <FaEye
                      className="eyeBtn"
                      onClick={() => openOverlay(card.itemId)}
                    />
                  </li>
                  {openOverlayId === card.itemId && (
                    <div className="overlay">
                      <div className="overlay-content">
                        <h2 className="overlay-title">{card.name}</h2>
                        <br />
                        <hr />
                        <br />
                        <img className="overlay-img" src={card.image} alt="" />
                        <br />
                        <p className="desc">{card.description}</p>
                        <br />
                        <p>Category: {card.category}</p>
                        <br />
                        <p>Price: {card.price}</p>
                        <br />
                        <div className="stock-row">
                          <p>In Stock</p>
                          {card.countInStock > 0 ? (
                            <GoDotFill className="stock" />
                          ) : (
                            <GoDotFill className="out-stock" />
                          )}
                        </div>

                        <br />
                        <div className="btn-close-container">
                          <button className="close-btn" onClick={closeOverlay}>
                            Return
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <li className="update">
                    <FaRegEdit
                      className="editBtn"
                      onClick={() => handleEditClick(card.itemId)}
                    />
                  </li>
                  {isUpdateOverlayOpen && (
                    <div className="overlay">
                      <div className="overlay-content">
                        <div className="for-close-icon">
                          <IoMdClose
                            className="close-icon"
                            onClick={closeUpdateOverlay}
                          />
                        </div>

                        <br />
                        <br />
                        <input
                          type="text"
                          name="itemId"
                          value={updateProduct.itemId}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="name"
                          value={updateProduct.name}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="price"
                          value={updateProduct.price}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="image"
                          value={updateProduct.image}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="category"
                          value={updateProduct.category}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="countInStock"
                          value={updateProduct.countInStock}
                          onChange={handleUpdateProductChange}
                        />
                        <br />
                        <input
                          type="text"
                          name="discount"
                          value={updateProduct.discount}
                          onChange={handleUpdateProductChange}
                        />
                        <p className="desc"></p>
                        <br />

                        <br />

                        <br />

                        <br />
                        <div className=" for-update-overlay">
                          <button
                            className="update-btn close-btn"
                            onClick={handleUpdateClick}
                          >
                            Update Product
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <li className="delete-pro">
                    <RiDeleteBin5Fill
                      className="deleteBtn"
                      onClick={() => handleDeleteClick(card.itemId)}
                    />
                  </li>
                </div>

                <hr className="lineDiv" />
              </div>
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminInventory;
