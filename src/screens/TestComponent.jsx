// import React, { useState, useEffect } from "react";
// import "../utils/index.js";
// // import { collection, getDocs } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore/lite";
// import { appDB } from "../utils/firestore.js";
// import { Link } from "react-router-dom";
// import Rating from "../components/Rating.component.jsx";

// const fetchFromFireStoreDB = async () => {
//   const snapShotforCapture = await getDocs(collection(appDB, "Products"));
//   const data = [];
//   snapShotforCapture.forEach((doc) => {
//     data.push({ id: doc.id, ...doc.data() });
//   });
//   return data;
// };

// // const fetchFromFireStoreDB = async () => {
// //   const snapShotforCapture = collection(appDB, "Products");
// //   const dataDB = await getDocs(snapShotforCapture);
// //   console.log(dataDB);
// // };

// const TestComponent = () => {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const mainData = await fetchFromFireStoreDB();
//       setCards(mainData);
//     }
//     fetchData();
//   }, []);

//   return (
//     <section className="test-main">
//       <div>
//         {cards.map((card) => (
//           <div key={card.id}>
//             <p>{card.name}</p>
//             <img src={card.image} alt="" />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TestComponent;
