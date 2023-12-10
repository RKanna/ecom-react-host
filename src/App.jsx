import { useState } from "react";
import "./index.scss";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";
import Slider from "./slider/Slider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./screens/Payment.page";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className="py-3">
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
