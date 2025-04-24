import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home";
import AddProduct from "./Pages/Add-product";
import AddStock from "./Pages/Add-stock";
import ProductList from "./Pages/Stock";

const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
        <Route path="/register" element={<Register />} /> {/* Trang đăng ký */}
        <Route path="/" element={<Layout />}> {/* Trang chính */}
          <Route index element={<Home />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-stock" element={<AddStock />} />
          <Route path="products" element={<ProductList />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
