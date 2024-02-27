import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import DetailProductPage from "./screens/DetailProduct.page.jsx";
import Login from "./screens/Login.page.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Category from "./screens/Category.page.jsx";
import Registration from "./screens/Registration.page.jsx";
import Cart from "./screens/Cart.page.jsx";
import PrivateRoute from "./components/Private.route.jsx";
import Shipping from "./screens/Shipping.page.jsx";
import Protected from "./components/Protected.route.jsx";
import Payment from "./screens/Payment.page.jsx";
import FilteredCategory from "./screens/FilteredCategory.page.jsx";
import CustomPageNotFound from "./components/CustomPageNotFound.jsx";
import Admin from "./screens/Admin.page.jsx";
import PrivateAdmin from "./components/PrivateAdmin.jsx";
import AdminInventory from "./screens/AdminInventory.jsx";
import Profile from "./screens/Profile.page.jsx";
import AllProducts from "./screens/AllProducts.page.jsx";
// import TestComponent from "./screens/TestComponent.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />

      <Route path="/product/:itemId" element={<DetailProductPage />} />
      <Route path="/allProducts" element={<AllProducts />} />

      <Route path="/Category" element={<Category />} />
      <Route path="/category/:category" element={<FilteredCategory />} />

      <Route path="/Cart" element={<Cart />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        {/* <Route path="/profile/:uid" element={<Profile />} /> */}
      </Route>
      {/* <Route path="" element={<AdminProtection />}>
      </Route> */}
      <Route path="" element={<PrivateAdmin />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminInventory" element={<AdminInventory />} />
      </Route>

      {/* <Route path="/test" element={<TestComponent />} /> */}

      <Route path="" element={<Protected />}>
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile/:uid" element={<Profile />} />
      </Route>
      <Route path="*" element={<CustomPageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* User Provider wrapped for preventing error when useUser context used */}
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
