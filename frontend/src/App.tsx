import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Login from "./Pages/Login/Login";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import AddProduct from "./Pages/Add-product";
import AddStock from "./Pages/Add-stock";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<Login />} /> {/* Trang mặc định là Login */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-stock" element={<AddStock />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
